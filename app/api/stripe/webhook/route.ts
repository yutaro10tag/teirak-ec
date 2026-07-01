import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { createServiceClient } from "@/lib/supabase"
import { Resend } from "resend"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const metadata = session.metadata ?? {}
  const items: Array<{ product_id: string; name: string; price: number; quantity: number }> =
    JSON.parse(metadata.items_json ?? "[]")

  const supabase = createServiceClient()

  // 在庫を減らす（ストアドプロシージャ使用で競合防止）
  for (const item of items) {
    await supabase.rpc("decrement_stock", {
      product_id: item.product_id,
      quantity: item.quantity,
    })
  }

  // 注文レコード作成
  await supabase.from("orders").insert({
    stripe_session_id: session.id,
    customer_name: metadata.customer_name ?? "",
    customer_email: session.customer_email ?? "",
    customer_address: metadata.customer_address ?? "",
    items,
    total: session.amount_total ?? 0,
    status: "paid",
  })

  // 注文確認メール送信
  if (session.customer_email && process.env.RESEND_API_KEY) {
    await getResend().emails.send({
      from: "Teirak <hello@teirak.jp>",
      to: session.customer_email,
      subject: "【Teirak】ご注文ありがとうございました",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3D4F3D;">ご注文ありがとうございました</h1>
          <p>${metadata.customer_name} 様</p>
          <p>この度はTeirakをご利用いただきありがとうございます。</p>
          <p>ご注文を受け付けました。発送準備が整い次第、改めてご連絡します。</p>
          <hr />
          <h2>ご注文内容</h2>
          ${items.map((item) => `
            <p>${item.name} × ${item.quantity}　¥${(item.price * item.quantity).toLocaleString()}</p>
          `).join("")}
          <p><strong>合計: ¥${(session.amount_total ?? 0).toLocaleString()}</strong></p>
          <hr />
          <p style="color: #8B7355; font-size: 12px;">© 2026 Teirak / PRENGO</p>
        </div>
      `,
    })
  }

  return NextResponse.json({ received: true })
}
