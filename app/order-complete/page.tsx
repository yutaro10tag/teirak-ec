import Link from "next/link"
import siteCopy from "@/content/site-copy.json"

export default function OrderCompletePage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-6">🌿</div>
      <h1 className="font-[family-name:var(--font-shippori)] text-3xl font-bold text-[#2B2820] mb-4 tracking-wide">
        {siteCopy.order_complete.heading}
      </h1>
      <p className="text-[#6B6055] leading-relaxed mb-10 max-w-md mx-auto">
        {siteCopy.order_complete.message}
      </p>
      <Link
        href="/products"
        className="inline-block bg-[#3D4F3D] text-[#F5F1E8] font-bold px-8 py-3.5 rounded-[8px] hover:bg-[#2e3d2e] transition-colors"
      >
        {siteCopy.order_complete.back_to_shop}
      </Link>
    </div>
  )
}
