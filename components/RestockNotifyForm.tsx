"use client"

import { useState } from "react"

export function RestockNotifyForm({ productId }: { productId: string }) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/products/${productId}/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError("登録に失敗しました。再度お試しください。")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-sm text-[#3D4F3D] bg-[#EDF3ED] px-4 py-3 rounded-[8px]">
        ✓ 再入荷通知の登録が完了しました。お知らせをお待ちください。
      </div>
    )
  }

  return (
    <div className="bg-[#F5F1E8] rounded-[8px] px-5 py-4">
      <p className="text-sm font-semibold text-[#2B2820] mb-1">再入荷をお知らせ</p>
      <p className="text-xs text-[#8B7355] mb-3">
        この商品の再入荷時にメールでお知らせします。
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレスを入力"
          className="flex-1 border border-[#D9D0C0] rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D4F3D] bg-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#3D4F3D] text-white text-sm px-4 py-2 rounded-[8px] hover:bg-[#2e3d2e] transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? "..." : "通知を受ける"}
        </button>
      </form>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  )
}
