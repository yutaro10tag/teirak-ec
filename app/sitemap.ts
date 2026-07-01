import type { MetadataRoute } from "next"
import journalData from "@/data/journal.json"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teirak.jp"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: siteUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${siteUrl}/products`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${siteUrl}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/about/dyeing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/about/thailand`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/about/ethical`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/about/prengo`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteUrl}/journal`, priority: 0.7, changeFrequency: "weekly" as const },
  ]

  const journalPages = journalData.articles.map((article) => ({
    url: `${siteUrl}/journal/${article.id}`,
    lastModified: new Date(article.publishedAt),
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }))

  return [...staticPages, ...journalPages]
}
