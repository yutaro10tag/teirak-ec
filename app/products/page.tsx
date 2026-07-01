export const dynamic = "force-dynamic"

import type { Metadata } from "next"
import { Suspense } from "react"
import { createServiceClient } from "@/lib/supabase"
import { Product } from "@/lib/types"
import { ProductGrid } from "@/components/ProductGrid"
import { CategoryFilter } from "@/components/CategoryFilter"
import categories from "@/content/categories.json"

export const metadata: Metadata = {
  title: "商品一覧",
  description: "草木染めの一点ものを一覧でご覧いただけます",
}

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

async function getProducts(category?: string): Promise<Product[]> {
  try {
    const supabase = createServiceClient()
    let query = supabase
      .from("products")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    const { data } = await query
    return data ?? []
  } catch {
    return []
  }
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const products = await getProducts(category)

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <h1 className="font-[family-name:var(--font-shippori)] text-3xl font-bold text-[#2B2820] mb-8 tracking-wide">
        商品一覧
      </h1>

      <Suspense fallback={<div className="flex flex-wrap gap-2 h-9" />}>
        <CategoryFilter
          categories={categories.categories}
          activeCategory={category ?? "all"}
        />
      </Suspense>

      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
