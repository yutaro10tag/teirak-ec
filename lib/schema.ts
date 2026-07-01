import { Product } from "./types"

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Teirak",
    description:
      "APU（立命館アジア太平洋大学）の学生団体PRENGOが運営する草木染めブランド。タイでの生産・仕入れを通じてアジア太平洋地域への経済的支援を行う。",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://teirak.jp",
    parentOrganization: {
      "@type": "Organization",
      name: "PRENGO",
      description:
        "2003年設立のAPU学生ボランティア団体。アジア太平洋地域の発展と相互協力への貢献をミッションに掲げ、タイでの教育支援・地域開発活動を行う。",
      foundingDate: "2003",
      memberOf: {
        "@type": "EducationalOrganization",
        name: "立命館アジア太平洋大学（APU）",
      },
    },
    knowsAbout: [
      "草木染め",
      "天然染料",
      "手染め",
      "タイ支援",
      "ソーシャルビジネス",
      "エコフレンドリーファッション",
    ],
    areaServed: ["JP", "TH"],
    foundingLocation: {
      "@type": "Place",
      name: "別府市、大分県、日本",
    },
  }
}

export function generateProductSchema(product: Product, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "JPY",
      availability:
        product.status === "published" && product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      url: `${siteUrl}/products/${product.id}`,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "染料素材",
        value: product.dye_material,
      },
      {
        "@type": "PropertyValue",
        name: "染色方法",
        value: "草木染め（天然染料による手染め）",
      },
      ...(product.is_one_of_a_kind
        ? [{ "@type": "PropertyValue", name: "製品の特性", value: "一点もの" }]
        : []),
    ],
    brand: {
      "@type": "Brand",
      name: "Teirak",
    },
  }
}

export function generateArticleSchema(article: {
  title: string
  summary: string
  publishedAt: string
  slug: string
  siteUrl: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    url: `${article.siteUrl}/journal/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Teirak / PRENGO",
    },
  }
}

export function generateWebSiteSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Teirak",
    description:
      "APU学生団体PRENGOが運営する草木染めブランド。タイで生産された天然染料の一点もの。",
    url: siteUrl,
    inLanguage: "ja",
  }
}
