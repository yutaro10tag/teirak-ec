"use client"

import Link from "next/link"
import { useCart } from "./CartProvider"
import { CartDrawer } from "./CartDrawer"
import siteCopy from "@/content/site-copy.json"

export function SiteHeader() {
  const { itemCount, isOpen, openCart, closeCart } = useCart()

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F5F1E8]/95 backdrop-blur border-b border-[#D9D0C0]">
        <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-shippori)] text-xl font-bold tracking-widest text-[#3D4F3D]"
          >
            {siteCopy.brand.name}
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm text-[#6B6055]">
            <Link href="/products" className="hover:text-[#3D4F3D] transition-colors">
              {siteCopy.nav.products}
            </Link>
            <Link href="/about" className="hover:text-[#3D4F3D] transition-colors">
              {siteCopy.nav.about}
            </Link>
          </nav>

          <button
            onClick={openCart}
            className="relative flex items-center gap-1.5 text-sm text-[#2B2820] hover:text-[#3D4F3D] transition-colors"
            aria-label={`カート（${itemCount}点）`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#A85C32] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <CartDrawer isOpen={isOpen} onClose={closeCart} />
    </>
  )
}
