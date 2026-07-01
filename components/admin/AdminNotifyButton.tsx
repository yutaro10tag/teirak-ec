"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  productId: string
  productName: string
}

export function AdminNotifyButton({ productId, productName }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSend() {
    if (!confirm(`「${productName}」の再入荷通知メールを送信しますか？\n送信後、通知リストはクリアされます。`)) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/notify/${productId}`, { method: "POST" })
      const data = await res.json()
      alert(`${data.sent}件のメールを送信しました。`)
      router.refresh()
    } catch {
      alert("送信に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSend}
      disabled={loading}
      className="text-xs text-blue-600 hover:underline disabled:opacity-50"
    >
      {loading ? "送信中..." : "通知を送る"}
    </button>
  )
}
