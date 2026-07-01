import Link from "next/link"
import siteCopy from "@/content/site-copy.json"

export function HeroSection() {
  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden bg-[#3D4F3D]">
      {/* 背景テクスチャ（実際の運用では草木染め布の写真に差し替え） */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />

      <div className="relative text-center px-6 max-w-2xl">
        <p className="text-xs tracking-[0.4em] text-[#F5F1E8]/70 mb-6 uppercase">
          Natural Dye / Handmade / One of a Kind
        </p>
        <h1 className="font-[family-name:var(--font-shippori)] text-5xl sm:text-7xl font-bold text-[#F5F1E8] mb-4 tracking-widest">
          Teirak
        </h1>
        <p className="text-lg sm:text-xl text-[#F5F1E8]/80 mb-2 tracking-wide">
          {siteCopy.hero.tagline}
        </p>
        <p className="text-sm text-[#F5F1E8]/60 mb-10 leading-relaxed max-w-md mx-auto">
          {siteCopy.hero.subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-block bg-[#F5F1E8] text-[#3D4F3D] font-bold px-8 py-3.5 rounded-[8px] hover:bg-white transition-colors tracking-wide"
          >
            {siteCopy.hero.cta}
          </Link>
          <Link
            href="/about"
            className="inline-block border border-[#F5F1E8]/50 text-[#F5F1E8] font-medium px-8 py-3.5 rounded-[8px] hover:border-[#F5F1E8] transition-colors tracking-wide"
          >
            {siteCopy.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#F5F1E8]/40 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
