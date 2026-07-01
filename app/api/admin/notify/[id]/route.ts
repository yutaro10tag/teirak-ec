import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = createServiceClient()

  const { data: product } = await supabase
    .from("products")
    .select("name, notify_email_list, price")
    .eq("id", id)
    .single()

  if (!product) return NextResponse.json({ error: "商品が見つかりません" }, { status: 404 })

  const emails: string[] = product.notify_email_list ?? []
  if (emails.length === 0) {
    return NextResponse.json({ ok: true, sent: 0 })
  }

  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${id}`

  const results = await Promise.allSettled(
    emails.map((email) =>
      resend.emails.send({
        from: "Teirak <noreply@teirak.jp>",
        to: email,
        subject: `【再入荷】${product.name}が入荷しました | Teirak`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;color:#2B2820">
            <h2 style="font-size:20px;margin-bottom:8px">再入荷のお知らせ</h2>
            <p style="color:#6B6055">お待たせしました。</p>
            <p><strong>${product.name}</strong> が再入荷しました。</p>
            <p style="color:#6B6055">¥${product.price.toLocaleString()}</p>
            <a href="${productUrl}"
               style="display:inline-block;margin-top:16px;background:#3D4F3D;color:#fff;
                      padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold">
              商品を見る
            </a>
            <p style="font-size:12px;color:#9ca3af;margin-top:24px">
              Teirak / PRENGO<br>
              このメールは再入荷通知にご登録いただいたアドレスに送信しています。
            </p>
          </div>
        `,
      })
    )
  )

  const sent = results.filter((r) => r.status === "fulfilled").length

  // 送信完了後にリストをクリア
  await supabase
    .from("products")
    .update({ notify_email_list: [] })
    .eq("id", id)

  return NextResponse.json({ ok: true, sent, total: emails.length })
}
