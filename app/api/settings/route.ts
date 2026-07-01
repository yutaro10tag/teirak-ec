import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase"

export async function GET() {
  const supabase = createServiceClient()
  const { data, error } = await supabase.from("site_settings").select("*")
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const settings = Object.fromEntries(data.map((row) => [row.key, row.value]))
  return NextResponse.json({ settings })
}

export async function PUT(req: NextRequest) {
  const { key, value } = await req.json()
  const supabase = createServiceClient()

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
