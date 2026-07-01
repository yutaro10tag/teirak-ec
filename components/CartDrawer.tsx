"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "./CartProvider"
import { config } from "@/lib/config"
import siteCopy from "@/content/site-copy.json"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total } = useCart()

  const shippingFee = total >= config.freeShippingThreshold ? 0 : config.shippingFee
  const grandTotal = total + shippingFee

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#F5F1E8] z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="カート"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D9D0C0]">
          <h2 className="font-[family-name:var(--font-shippori)] text-lg font-bold text-[#2B2820]">
            {siteCopy.cart.heading}
          </h2>
          <button onClick={onClose} className="text-[#6B6055] hover:text-[#2B2820]" aria-label="閉じる">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-[#8B7355]">
              <p className="text-sm">{siteCopy.cart.empty}</p>
              <button onClick={onClose} className="text-sm text-[#3D4F3D] underline">
                {siteCopy.cart.continue_shopping}
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-[8px] overflow-hidden bg-[#EDE8DC] shrink-0">
                    {product.images[0] && (
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2B2820] leading-snug">{product.name}</p>
                    <p className="text-sm text-[#6B6055]">¥{product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {!product.is_one_of_a_kind && (
                        <div className="flex items-center border border-[#D9D0C0] rounded">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2 py-0.5 text-[#6B6055] hover:text-[#2B2820]"
                          >−</button>
                          <span className="px-2 text-sm">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2 py-0.5 text-[#6B6055] hover:text-[#2B2820]"
                          >+</button>
                        </div>
                      )}
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-xs text-[#8B7355] underline"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-[#D9D0C0] space-y-3">
            <div className="space-y-1.5 text-sm">
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
              <div className="flex justify-between font-bold text-[#2B2820] text-base pt-1 border-t border-[#D9D0C0]">
                <span>{siteCopy.cart.total}</span>
                <span>¥{grandTotal.toLocaleString()}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-[#3D4F3D] text-white font-bold py-3 rounded-[8px] hover:bg-[#2e3d2e] transition-colors"
            >
              {siteCopy.cart.checkout}
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
