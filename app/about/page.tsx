import type { Metadata } from "next"
import siteCopy from "@/content/site-copy.json"

export const metadata: Metadata = {
  title: "Teirakについて",
  description: "草木染めブランドTeirakのブランドストーリーと、PRENGOについて",
}

export default function AboutPage() {
  const { brand_story } = siteCopy

  return (
    <div className="max-w-[720px] mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.4em] text-[#8B7355] mb-4 uppercase">About</p>
      <h1 className="font-[family-name:var(--font-shippori)] text-4xl font-bold text-[#2B2820] mb-6 tracking-wide leading-tight">
        {brand_story.heading}
      </h1>

      <div className="prose prose-sm max-w-none text-[#6B6055] leading-relaxed mb-12">
        <p>{brand_story.body}</p>
      </div>

      <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-6 tracking-wide">
        {brand_story.process_heading}
      </h2>
      <div className="space-y-4 mb-12">
        {brand_story.values.map((v, i) => (
          <div key={v.label} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#3D4F3D] text-[#F5F1E8] flex items-center justify-center text-sm font-bold shrink-0">
              {i + 1}
            </div>
            <div>
              <p className="font-semibold text-[#2B2820] mb-1">{v.label}</p>
              <p className="text-sm text-[#6B6055] leading-relaxed">{v.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#EDE8DC] rounded-[12px] p-6">
        <p className="text-xs tracking-widest text-[#8B7355] uppercase mb-2">PRENGO</p>
        <p className="text-sm text-[#6B6055] leading-relaxed">
          PREGNOはAPU（立命館アジア太平洋大学）の学生団体です。別府の自然と文化を背景に、
          草木染めの技術を学びながらブランド「Teirak」を運営しています。
        </p>
      </div>
    </div>
  )
}
