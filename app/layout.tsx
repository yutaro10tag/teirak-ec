import type { Metadata } from "next"
import { Noto_Serif_JP, Shippori_Mincho, Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/SiteHeader"
import { SiteFooter } from "@/components/SiteFooter"
import { CartProvider } from "@/components/CartProvider"
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema"

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
})

export const metadata: Metadata = {
  title: {
    default: "Teirak（テイラック）｜草木染め×APU学生団体が届けるエシカルなものづくり",
    template: `%s | Teirak`,
  },
  description: "APU学生団体PRENGOが運営する草木染めブランド。タイで生産された天然染料の一点もの。購入がタイへの経済的支援につながります。",
  keywords: [
    "草木染め", "アースカラー", "自然由来 染料", "天然染料",
    "ソーシャルビジネス", "国際協力 ブランド", "タイ 支援",
    "エコフレンドリー ファッション", "エシカル消費",
    "NPO ブランド", "学生団体 ブランド", "APU 学生プロジェクト",
    "PRENGO", "別府 ハンドメイド", "一点もの 草木染め"
  ],
  openGraph: {
    title: "Teirak｜草木染め×タイ支援のAPU学生ブランド",
    description: "APU学生団体PRENGOが運営する草木染めブランド。タイで生産された天然染料の一点もの。購入がタイへの経済的支援につながります。",
    locale: "ja_JP",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${notoSerifJP.variable} ${shipporiMincho.variable} ${cormorantGaramond.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased font-[family-name:var(--font-noto-serif)]">
        <style>{`
          @keyframes kenburns {
            0%   { transform: scale(1.0); }
            100% { transform: scale(1.08); }
          }
          .animate-kenburns {
            animation: kenburns 20s linear infinite alternate;
            will-change: transform;
          }

          /* ── Scroll-aware transparent header ── */
          header {
            transition: background-color 0.3s ease, border-color 0.3s ease,
                        backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease;
          }
          header a, header button {
            transition: color 0.3s ease !important;
          }
          body[data-hero] header {
            background-color: transparent !important;
            border-color: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          body[data-hero] header a,
          body[data-hero] header button {
            color: white !important;
          }
        `}</style>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema(process.env.NEXT_PUBLIC_SITE_URL ?? "https://teirak.jp")) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
        />

        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  )
}
