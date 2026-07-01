"use client"

import { useCart } from "./CartProvider"
import { Product } from "@/lib/types"
import siteCopy from "@/content/site-copy.json"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full bg-[#3D4F3D] text-[#F5F1E8] font-bold py-4 rounded-[8px] hover:bg-[#2e3d2e] transition-colors tracking-wide text-sm"
    >
      {siteCopy.products.add_to_cart}
    </button>
  )
}
