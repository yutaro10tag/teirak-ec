import Link from "next/link"
import siteCopy from "@/content/site-copy.json"

export function BrandStory() {
  const { brand_story } = siteCopy

  return (
    <section className="bg-[#3D4F3D] text-[#F5F1E8] py-20 px-4">
      <div className="max-w-[720px] mx-auto text-center">
        <p className="text-xs tracking-[0.4em] text-[#F5F1E8]/60 mb-4 uppercase">Our Story</p>
        <h2 className="font-[family-name:var(--font-shippori)] text-3xl font-bold mb-6 tracking-wide">
          {brand_story.heading}
        </h2>
        <p className="text-[#F5F1E8]/80 leading-relaxed mb-12">{brand_story.body}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {brand_story.values.map((v) => (
            <div key={v.label} className="bg-[#F5F1E8]/10 rounded-[8px] p-5">
              <p className="font-bold mb-2 tracking-wide">{v.label}</p>
              <p className="text-sm text-[#F5F1E8]/70 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="inline-block border border-[#F5F1E8]/50 text-[#F5F1E8] px-6 py-2.5 rounded-[8px] hover:border-[#F5F1E8] transition-colors text-sm"
        >
          詳しく読む →
        </Link>
      </div>
    </section>
  )
}
