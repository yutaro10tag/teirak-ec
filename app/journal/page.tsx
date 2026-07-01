import type { Metadata } from "next"
import Link from "next/link"
import journalData from "@/data/journal.json"

export const metadata: Metadata = {
  title: "ジャーナル",
  description:
    "草木染め・タイとのつながり・エコフレンドリーなものづくり——TeirakとPRENGOの活動を伝えるブランドジャーナル。",
}

const AXIS_LABELS: Record<string, string> = {
  craft: "工芸・素材",
  social: "社会的意義",
  ethical: "エコフレンドリー",
  community: "APU・PRENGO",
}

export default function JournalPage() {
  const { articles } = journalData

  return (
    <div className="max-w-[720px] mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.4em] text-[#8B7355] mb-4 uppercase">Journal</p>
      <h1 className="font-[family-name:var(--font-shippori)] text-4xl font-bold text-[#2B2820] mb-4 tracking-wide">
        ジャーナル
      </h1>
      <p className="text-[#6B6055] mb-12 leading-relaxed">
        草木染め・タイとのつながり・エコフレンドリーなものづくり——Teirakの考え方と活動を伝える記事。
      </p>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/journal/${article.id}`}
            className="block group bg-white rounded-[12px] p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-[#EDE8DC] text-[#8B7355] px-2 py-0.5 rounded-full">
                {AXIS_LABELS[article.axis] ?? article.axis}
              </span>
              <time className="text-xs text-[#8B7355]">{article.publishedAt}</time>
            </div>
            <h2 className="font-[family-name:var(--font-shippori)] text-xl font-bold text-[#2B2820] mb-2 leading-snug group-hover:text-[#3D4F3D] transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-[#6B6055] leading-relaxed">{article.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
