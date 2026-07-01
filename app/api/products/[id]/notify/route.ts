import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase"

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = await params
  const { email } = await req.json()
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "メールアドレスが必要です" }, { status: 400 })
  }

  try {
    const supabase = createServiceClient()
    const { data: product } = await supabase
      .from("products")
      .select("notify_email_list")
      .eq("id", id)
      .single()

    const currentList: string[] = product?.notify_email_list ?? []
    if (currentList.includes(email)) {
      return NextResponse.json({ ok: true, message: "already_registered" })
    }

    await supabase
      .from("products")
      .update({ notify_email_list: [...currentList, email] })
      .eq("id", id)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 })
  }
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    const supabase = createServiceClient()
    const { data } = await supabase
      .from("products")
      .select("notify_email_list")
      .eq("id", id)
      .single()
    return NextResponse.json({ count: (data?.notify_email_list ?? []).length })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}
