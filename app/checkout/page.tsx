"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/CartProvider"
import { config } from "@/lib/config"
import siteCopy from "@/content/site-copy.json"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const shippingFee = total >= config.freeShippingThreshold ? 0 : config.shippingFee
  const grandTotal = total + shippingFee

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        shippingFee,
        customer: {
          name: formData.get("name"),
          email: formData.get("email"),
          address: `〒${formData.get("postal_code")} ${formData.get("prefecture")}${formData.get("city")}${formData.get("address_detail")}`,
        },
      }),
    })

    const json = await res.json()
    if (!res.ok || !json.url) {
      setError(json.error || "エラーが発生しました。もう一度お試しください。")
      setLoading(false)
      return
    }

    clearCart()
    window.location.href = json.url
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[720px] mx-auto px-4 py-20 text-center">
        <p className="text-[#8B7355]">カートに商品がありません</p>
      </div>
    )
  }

  return (
    <div className="max-w-[720px] mx-auto px-4 py-10">
      <h1 className="font-[family-name:var(--font-shippori)] text-3xl font-bold text-[#2B2820] mb-8 tracking-wide">
        {siteCopy.checkout.heading}
      </h1>

      <form onSubmit={handleCheckout} className="space-y-6">
        <div className="bg-white rounded-[12px] p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-[#2B2820]">お届け先情報</h2>

          <div>
            <label className="block text-sm text-[#6B6055] mb-1">{siteCopy.checkout.name} <span className="text-red-500">*</span></label>
            <input name="name" required className="w-full border border-[#D9D0C0] rounded-[8px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D4F3D] bg-[#F5F1E8]" />
          </div>

          <div>
            <label className="block text-sm text-[#6B6055] mb-1">{siteCopy.checkout.email} <span className="text-red-500">*</span></label>
            <input name="email" type="email" required className="w-full border border-[#D9D0C0] rounded-[8px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D4F3D] bg-[#F5F1E8]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[#6B6055] mb-1">{siteCopy.checkout.postal_code} <span className="text-red-500">*</span></label>
              <input name="postal_code" required placeholder="123-4567" className="w-full border border-[#D9D0C0] rounded-[8px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D4F3D] bg-[#F5F1E8]" />
            </div>
            <div>
              <label className="block text-sm text-[#6B6055] mb-1">{siteCopy.checkout.prefecture} <span className="text-red-500">*</span></label>
              <input name="prefecture" required placeholder="大分県" className="w-full border border-[#D9D0C0] rounded-[8px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D4F3D] bg-[#F5F1E8]" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#6B6055] mb-1">{siteCopy.checkout.city} <span className="text-red-500">*</span></label>
            <input name="city" required className="w-full border border-[#D9D0C0] rounded-[8px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D4F3D] bg-[#F5F1E8]" />
          </div>

          <div>
            <label className="block text-sm text-[#6B6055] mb-1">{siteCopy.checkout.address_detail} <span className="text-red-500">*</span></label>
            <input name="address_detail" required className="w-full border border-[#D9D0C0] rounded-[8px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D4F3D] bg-[#F5F1E8]" />
          </div>
        </div>

        <div className="bg-white rounded-[12px] p-6 shadow-sm">
          <h2 className="font-semibold text-[#2B2820] mb-4">注文内容</h2>
          <div className="space-y-2 text-sm text-[#6B6055] mb-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between">
                <span>{product.name} × {quantity}</span>
                <span>¥{(product.price * quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between">
              <span>配送料</span>
              <span>{shippingFee === 0 ? "無料" : `¥${shippingFee.toLocaleString()}`}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-[#2B2820] text-lg border-t border-[#D9D0C0] pt-3">
            <span>合計</span>
            <span>¥{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-[8px]">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3D4F3D] text-[#F5F1E8] font-bold py-4 rounded-[8px] hover:bg-[#2e3d2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "処理中..." : siteCopy.checkout.pay}
        </button>
        <p className="text-xs text-center text-[#8B7355]">{siteCopy.checkout.secure_notice}</p>
      </form>
    </div>
  )
}
