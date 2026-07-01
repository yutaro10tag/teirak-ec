import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase"

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = createServiceClient()
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ product: data })
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params
  const body = await req.json()
  const supabase = createServiceClient()

  const updatePayload: Record<string, unknown> = {
    name: body.name,
    description: body.description,
    price: Number(body.price),
    stock: Number(body.stock),
    is_one_of_a_kind: body.is_one_of_a_kind,
    images: body.images,
    category: body.category,
    dye_material: body.dye_material,
    status: body.status,
  }
  // migration-001 フィールド（列が存在する場合のみ）
  if (body.is_sale !== undefined) updatePayload.is_sale = Boolean(body.is_sale)
  if (body.sale_price !== undefined) updatePayload.sale_price = body.sale_price ? Number(body.sale_price) : null
  if (body.sizes !== undefined) updatePayload.sizes = body.sizes

  const { data, error } = await supabase
    .from("products")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ product: data })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const supabase = createServiceClient()
  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
