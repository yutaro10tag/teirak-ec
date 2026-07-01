"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/CartProvider"
import { config } from "@/lib/config"
import siteCopy from "@/content/site-copy.json"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  const shippingFee = total >= config.freeShippingThreshold ? 0 : config.shippingFee
  const grandTotal = total + shippingFee

  return (
    <div className="max-w-[720px] mx-auto px-4 py-10">
      <h1 className="font-[family-name:var(--font-shippori)] text-3xl font-bold text-[#2B2820] mb-8 tracking-wide">
        {siteCopy.cart.heading}
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#8B7355] mb-6">{siteCopy.cart.empty}</p>
          <Link
            href="/products"
            className="inline-block bg-[#3D4F3D] text-[#F5F1E8] font-bold px-6 py-3 rounded-[8px] hover:bg-[#2e3d2e] transition-colors"
          >
            {siteCopy.cart.continue_shopping}
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 bg-white rounded-[12px] p-4 shadow-sm">
                <div className="relative w-24 h-24 rounded-[8px] overflow-hidden bg-[#EDE8DC] shrink-0">
                  {product.images[0] && (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${product.id}`} className="font-semibold text-[#2B2820] hover:text-[#3D4F3D] line-clamp-2">
                    {product.name}
                  </Link>
                  <p className="text-sm text-[#6B6055] mt-1">¥{product.price.toLocaleString()}</p>
                  <div className="flex items-center gap-4 mt-3">
                    {!product.is_one_of_a_kind ? (
                      <div className="flex items-center border border-[#D9D0C0] rounded-[8px]">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-3 py-1 text-[#6B6055] hover:text-[#2B2820]"
                        >−</button>
                        <span className="px-3 text-sm font-medium">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, Math.min(quantity + 1, product.stock))}
                          className="px-3 py-1 text-[#6B6055] hover:text-[#2B2820]"
                        >+</button>
                      </div>
                    ) : (
                      <span className="text-xs text-[#A85C32] font-semibold">一点もの</span>
                    )}
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-xs text-[#8B7355] underline"
                    >
                      削除
                    </button>
                  </div>
                </div>
                <p className="font-bold text-[#2B2820] whitespace-nowrap">
                  ¥{(product.price * quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[12px] p-6 shadow-sm sticky top-20">
              <h2 className="font-semibold text-[#2B2820] mb-4">注文サマリー</h2>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-[#6B6055]">
                  <span>{siteCopy.cart.subtotal}</span>
                  <span>¥{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#6B6055]">
                  <span>{siteCopy.cart.shipping}</span>
                  <span>{shippingFee === 0 ? siteCopy.cart.shipping_free : `¥${shippingFee.toLocaleString()}`}</span>
                </div>
                {total < config.freeShippingThreshold && (
                  <p className="text-xs text-[#A85C32]">
                    あと¥{(config.freeShippingThreshold - total).toLocaleString()}で送料無料
                  </p>
                )}
              </div>
              <div className="flex justify-between font-bold text-[#2B2820] text-lg border-t border-[#D9D0C0] pt-3 mb-6">
                <span>{siteCopy.cart.total}</span>
                <span>¥{grandTotal.toLocaleString()}</span>
              </div>
              <Link
                href="/checkout"
                className="block w-full text-center bg-[#3D4F3D] text-[#F5F1E8] font-bold py-3.5 rounded-[8px] hover:bg-[#2e3d2e] transition-colors"
              >
                {siteCopy.cart.checkout}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
