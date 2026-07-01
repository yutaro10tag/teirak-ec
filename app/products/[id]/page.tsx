export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import { createServiceClient } from "@/lib/supabase"
import { Product } from "@/lib/types"
import { StockBadge } from "@/components/StockBadge"
import { AddToCartButton } from "@/components/AddToCartButton"
import { ViewTracker } from "@/components/ViewTracker"
import { RestockNotifyForm } from "@/components/RestockNotifyForm"
import siteCopy from "@/content/site-copy.json"

interface PageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const supabase = createServiceClient()
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .in("status", ["published", "sold_out"])
      .single()
    return data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) notFound()

  const isSoldOut = product.status === "sold_out" || product.stock === 0
  const hasSale = product.is_sale && product.sale_price != null

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      {/* 閲覧数トラッキング（クライアント側） */}
      <ViewTracker productId={id} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 画像エリア */}
        <div className="space-y-2">
          <div className="relative aspect-square rounded-[12px] overflow-hidden bg-[#EDE8DC]">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={`object-cover ${isSoldOut ? "opacity-70 grayscale" : ""}`}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#8B7355]">
                画像なし
              </div>
            )}
            {/* SALEバッジ */}
            {hasSale && !isSoldOut && (
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                SALE
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((img, i) => (
                <div key={i} className="relative aspect-square rounded-[8px] overflow-hidden bg-[#EDE8DC]">
                  <Image src={img} alt={`${product.name} ${i + 2}`} fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 商品情報エリア */}
        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <StockBadge
              status={product.status}
              stock={product.stock}
              isOneOfAKind={product.is_one_of_a_kind}
            />
            {hasSale && !isSoldOut && (
              <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded">SALE</span>
            )}
          </div>

          <h1 className="font-[family-name:var(--font-shippori)] text-3xl font-bold text-[#2B2820] mb-3 leading-snug">
            {product.name}
          </h1>

          {/* 価格（セール対応） */}
          {hasSale ? (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-bold text-red-500">
                ¥{product.sale_price!.toLocaleString()}
                <span className="text-sm font-normal ml-1">（税込）</span>
              </span>
              <span className="text-lg text-[#8B7355] line-through">
                ¥{product.price.toLocaleString()}
              </span>
            </div>
          ) : (
            <p className="text-2xl font-bold text-[#2B2820] mb-6">
              ¥{product.price.toLocaleString()}
              <span className="text-sm font-normal text-[#8B7355] ml-2">（税込）</span>
            </p>
          )}

          {/* 草木染め情報 */}
          <div className="bg-[#EDE8DC] rounded-[8px] px-5 py-4 mb-6">
            <p className="text-xs tracking-widest text-[#8B7355] uppercase mb-2">Natural Dye</p>
            <p className="text-sm text-[#2B2820]">
              <span className="font-semibold">{siteCopy.products.dye_material_label}：</span>
              {product.dye_material}
            </p>
            {product.is_one_of_a_kind && (
              <p className="text-sm text-[#A85C32] mt-1 font-semibold">
                ※ この商品は一点ものです。同じものは二度と作れません。
              </p>
            )}
            {product.sizes && product.sizes.length > 0 && (
              <p className="text-sm text-[#2B2820] mt-1">
                <span className="font-semibold">サイズ：</span>
                {product.sizes.join("・")}
              </p>
            )}
          </div>

          <p className="text-sm text-[#6B6055] leading-relaxed mb-8">{product.description}</p>

          <div className="mt-auto space-y-3">
            {!isSoldOut ? (
              <>
                <AddToCartButton product={product} />
                <p className="text-xs text-center text-[#8B7355]">
                  {siteCopy.checkout.secure_notice}
                </p>
              </>
            ) : (
              <>
                <button
                  disabled
                  className="w-full bg-[#D9D0C0] text-[#8B7355] font-bold py-4 rounded-[8px] cursor-not-allowed"
                >
                  {siteCopy.products.sold_out}
                </button>
                {/* 再入荷通知フォーム */}
                <RestockNotifyForm productId={id} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
