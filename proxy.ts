import { NextRequest, NextResponse } from "next/server"

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ログインページ自体はパスさせる
  if (pathname === "/admin/login") return NextResponse.next()

  const token = req.cookies.get("admin-token")?.value
  if (token === process.env.ADMIN_PASSWORD) return NextResponse.next()

  const loginUrl = new URL("/admin/login", req.url)
  loginUrl.searchParams.set("from", pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ["/admin/:path*"],
}
