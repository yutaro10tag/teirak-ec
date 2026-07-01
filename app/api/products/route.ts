import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const all = req.nextUrl.searchParams.get("all") === "true"

  let query = supabase.from("products").select("*").order("created_at", { ascending: false })
  if (!all) query = query.eq("status", "published")

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ products: data })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from("products")
    .insert({
      name: body.name,
      description: body.description ?? "",
      price: Number(body.price),
      stock: Number(body.stock),
      is_one_of_a_kind: body.is_one_of_a_kind ?? false,
      images: body.images ?? [],
      category: body.category ?? "other",
      dye_material: body.dye_material ?? "",
      status: body.status ?? "draft",
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ product: data })
}
