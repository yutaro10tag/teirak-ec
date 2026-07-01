import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase"

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(_req: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    const supabase = createServiceClient()
    await supabase.rpc("increment_view_count", { product_id: id })
  } catch {
    // view_count 列が存在しない場合は無視（migration 未実行）
  }
  return NextResponse.json({ ok: true })
}
