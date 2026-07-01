"use client"

import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" })
    router.push("/admin/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="text-xs text-white/60 hover:text-white/80 transition-colors"
    >
      ログアウト
    </button>
  )
}
