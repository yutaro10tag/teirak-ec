import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase"

interface Params {
  params: Promise<{ id: string }>
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params
  const { status } = await req.json()

  const validStatuses = ["pending", "paid", "shipped", "delivered"]
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "無効なステータスです" }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ order: data })
}
