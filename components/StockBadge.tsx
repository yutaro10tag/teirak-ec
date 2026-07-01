import { ProductStatus } from "@/lib/types"
import siteCopy from "@/content/site-copy.json"

interface StockBadgeProps {
  status: ProductStatus
  stock: number
  isOneOfAKind: boolean
}

export function StockBadge({ status, stock, isOneOfAKind }: StockBadgeProps) {
  if (status === "sold_out" || stock === 0) {
    return (
      <span className="inline-block text-xs font-bold px-2 py-0.5 bg-[#6B6055] text-white rounded">
        {siteCopy.products.sold_out}
      </span>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {isOneOfAKind && (
        <span className="inline-block text-xs font-bold px-2 py-0.5 bg-[#A85C32] text-white rounded">
          {siteCopy.products.one_of_a_kind}
        </span>
      )}
      {!isOneOfAKind && stock <= 3 && (
        <span className="text-xs text-[#A85C32]">
          {siteCopy.products.stock_label} {stock}{siteCopy.products.stock_unit}
        </span>
      )}
    </div>
  )
}
