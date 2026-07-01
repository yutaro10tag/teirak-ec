import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import journalData from "@/data/journal.json"
import { generateArticleSchema } from "@/lib/schema"

interface PageProps {
  params: Promise<{ slug: string }>
}

function getArticle(slug: string) {
  return journalData.articles.find((a) => a.id === slug) ?? null
}

export function generateStaticParams() {
  return journalData.articles.map((a) => ({ slug: a.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.summary,
  }
}

function renderMarkdown(body: string) {
  return body
    .split("\n")
    .map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mt-10 mb-4"
          >
            {line.replace("## ", "")}
          </h2>
        )
      }
      if (line.trim() === "") return <div key={i} className="my-2" />
      return (
        <p key={i} className="text-[#6B6055] leading-relaxed">
          {line}
        </p>
      )
    })
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teirak.jp"
  const schema = generateArticleSchema({
    title: article.title,
    summary: article.summary,
    publishedAt: article.publishedAt,
    slug: article.id,
    siteUrl,
  })

  return (
    <div className="max-w-[720px] mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <nav className="text-xs text-[#8B7355] mb-8">
        <Link href="/journal" className="hover:text-[#3D4F3D]">ジャーナル</Link>
        <span className="mx-2">›</span>
        <span>{article.title}</span>
      </nav>

      <time className="text-xs text-[#8B7355]">{article.publishedAt}</time>
      <h1 className="font-[family-name:var(--font-shippori)] text-4xl font-bold text-[#2B2820] mt-2 mb-6 leading-tight tracking-wide">
        {article.title}
      </h1>

      {/* AIO用サマリー */}
      <p className="text-base text-[#3D4F3D] font-semibold leading-relaxed mb-10 border-l-4 border-[#3D4F3D] pl-4">
        {article.summary}
      </p>

      <div className="space-y-2">{renderMarkdown(article.body)}</div>

      <div className="mt-16 pt-8 border-t border-[#D9D0C0]">
        <Link href="/journal" className="text-sm text-[#6B6055] hover:text-[#3D4F3D]">
          ← ジャーナル一覧に戻る
        </Link>
      </div>
    </div>
  )
}
