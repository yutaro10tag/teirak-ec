import { config } from "@/lib/config"

// Phase 3でInstagram APIと連携予定
// 現状はプレースホルダーを表示
export function InstagramFeed() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-16 text-center">
      <p className="text-xs tracking-[0.4em] text-[#8B7355] mb-2 uppercase">Follow Us</p>
      <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-2 tracking-wide">
        Instagram
      </h2>
      <a
        href={`https://instagram.com/${config.instagramHandle.replace("@", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[#A85C32] hover:underline"
      >
        {config.instagramHandle}
      </a>

      {/* プレースホルダーグリッド（Phase 3でInstagram埋め込みに差し替え） */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-[#EDE8DC] rounded-[4px]" />
        ))}
      </div>
    </section>
  )
}
