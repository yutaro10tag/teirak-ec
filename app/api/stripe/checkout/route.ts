import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { createServiceClient } from "@/lib/supabase"
import { CartItem } from "@/lib/types"
import { config } from "@/lib/config"

export async function POST(req: NextRequest) {
  const { items, shippingFee, customer } = await req.json() as {
    items: CartItem[]
    shippingFee: number
    customer: { name: string; email: string; address: string }
  }

  if (!items?.length) {
    return NextResponse.json({ error: "カートが空です" }, { status: 400 })
  }

  const supabase = createServiceClient()

  // 在庫確認（楽観的ロック）
  for (const { product, quantity } of items) {
    const { data } = await supabase
      .from("products")
      .select("stock, status")
      .eq("id", product.id)
      .single()

    if (!data || data.stock < quantity || data.status === "sold_out") {
      return NextResponse.json(
        { error: `「${product.name}」の在庫が不足しています` },
        { status: 409 }
      )
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

  // Stripe Checkout セッション作成
  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: customer.email,
    line_items: [
      ...items.map(({ product, quantity }) => ({
        price_data: {
          currency: "jpy",
          product_data: {
            name: product.name,
            images: product.images.length > 0 ? [product.images[0]] : [],
          },
          unit_amount: product.price,
        },
        quantity,
      })),
      ...(shippingFee > 0
        ? [{
            price_data: {
              currency: "jpy",
              product_data: { name: "配送料" },
              unit_amount: shippingFee,
            },
            quantity: 1,
          }]
        : []),
    ],
    metadata: {
      customer_name: customer.name,
      customer_address: customer.address,
      items_json: JSON.stringify(
        items.map(({ product, quantity }) => ({
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.images[0] ?? "",
        }))
      ),
    },
    success_url: `${siteUrl}/order-complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cart`,
  })

  return NextResponse.json({ url: session.url })
}
