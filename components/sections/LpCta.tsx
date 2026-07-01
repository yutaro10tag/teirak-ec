"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function LpCta() {
  return (
    <section className="relative overflow-hidden" style={{ height: "60vh" }}>
      {/* ぼかし背景 + 深緑オーバーレイ */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-[-20px]">
          <Image
            src="/images/product-tote-full.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ filter: "blur(8px)" }}
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "#3D5A3E", opacity: 0.6 }}
        />
      </div>

      {/* テキスト */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p
          className="text-white/70 mb-5 uppercase"
          style={{ fontSize: "11px", letterSpacing: "0.3em" }}
        >
          Find your one of a kind
        </p>

        <h2
          className="font-[family-name:var(--font-shippori)] text-white mb-10"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "0.05em",
          }}
        >
          あなただけの一点ものを
        </h2>

        <Link
          href="/products"
          className="bg-white text-[#3D5A3E] font-bold text-sm hover:bg-[#3D5A3E] hover:text-white transition-colors duration-300"
          style={{ padding: "16px 40px", letterSpacing: "0.15em" }}
        >
          Collection を見る
        </Link>
      </motion.div>
    </section>
  )
}
