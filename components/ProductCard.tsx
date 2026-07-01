import Link from "next/link"
import Image from "next/image"
import { Product } from "@/lib/types"
import { StockBadge } from "./StockBadge"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isSoldOut = product.status === "sold_out" || product.stock === 0
  const image = product.images[0] ?? "/placeholder.jpg"
  const hasSale = product.is_sale && product.sale_price != null

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article>
        <div className="relative aspect-square overflow-hidden rounded-[8px] bg-[#EDE8DC]">
          <Image
            src={image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              isSoldOut ? "opacity-60 grayscale" : ""
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* ステータスバッジ */}
          <div className="absolute top-2 left-2">
            <StockBadge
              status={product.status}
              stock={product.stock}
              isOneOfAKind={product.is_one_of_a_kind}
            />
          </div>
          {/* SALEバッジ */}
          {hasSale && !isSoldOut && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              SALE
            </span>
          )}
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-xs text-[#8B7355]">{product.dye_material}</p>
          <h2 className="text-sm font-semibold text-[#2B2820] group-hover:text-[#3D4F3D] transition-colors leading-snug">
            {product.name}
          </h2>
          {hasSale ? (
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-red-500">
                ¥{product.sale_price!.toLocaleString()}
              </span>
              <span className="text-sm text-[#8B7355] line-through">
                ¥{product.price.toLocaleString()}
              </span>
            </div>
          ) : (
            <p className="text-base font-bold text-[#2B2820]">
              ¥{product.price.toLocaleString()}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}
