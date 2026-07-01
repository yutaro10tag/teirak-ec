"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/types"

interface LpProductsProps {
  products: Product[]
}

const xOffsets = [-60, 0, 60]

export function LpProducts({ products }: LpProductsProps) {
  const items = products.slice(0, 3)

  return (
    <section className="py-28 px-4 bg-[#F7F4F0]">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          className="font-[family-name:var(--font-shippori)] text-2xl sm:text-3xl text-center text-[#1A1814] mb-20 tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          選ばれた一点もの
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: xOffsets[i] ?? 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
            >
              <Link href={`/products/${product.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden mb-5">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E8E4DC]" />
                    )}
                  </motion.div>
                </div>

                <p className="text-[10px] tracking-[0.35em] text-[#1A1814]/40 uppercase mb-2">
                  {product.dye_material}
                </p>
                <h3 className="font-[family-name:var(--font-shippori)] text-sm text-[#1A1814] tracking-wide mb-1.5">
                  {product.name}
                </h3>
                <p className="text-sm text-[#1A1814]/55 mb-4">
                  ¥{product.price.toLocaleString()}
                </p>
                <span className="text-[11px] tracking-[0.2em] text-[#3D5A3E] border-b border-[#3D5A3E]/50 pb-0.5 uppercase">
                  View
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
