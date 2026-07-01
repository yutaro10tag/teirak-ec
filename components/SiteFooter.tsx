import Link from "next/link"
import { config } from "@/lib/config"

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "#1A1814" }}>
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 text-center sm:text-left">
          {/* ロゴ */}
          <span className="font-[family-name:var(--font-shippori)] text-lg tracking-widest text-white/60">
            Teirak
          </span>

          {/* ナビ */}
          <nav className="flex flex-col sm:flex-row gap-5 sm:gap-8 text-xs text-white/60 tracking-wider">
            <Link href="/products" className="hover:text-white/90 transition-colors">
              商品一覧
            </Link>
            <Link href="/about" className="hover:text-white/90 transition-colors">
              ブランドについて
            </Link>
            <a
              href={`mailto:${config.contactEmail}`}
              className="hover:text-white/90 transition-colors"
            >
              お問い合わせ
            </a>
          </nav>

          {/* コピーライト */}
          <p className="text-xs text-white/60">© 2025 Teirak / PRENGO</p>
        </div>
      </div>
    </footer>
  )
}
