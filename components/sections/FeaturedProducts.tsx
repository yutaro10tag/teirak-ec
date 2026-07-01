import Link from "next/link"
import { ProductGrid } from "@/components/ProductGrid"
import { Product } from "@/lib/types"

interface FeaturedProductsProps {
  products: Product[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] tracking-wide">
          新着商品
        </h2>
        <Link href="/products" className="text-sm text-[#8B7355] hover:text-[#3D4F3D] transition-colors">
          すべて見る →
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  )
}
