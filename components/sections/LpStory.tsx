"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function LpStory() {
  return (
    <section className="bg-[#3D5A3E] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* 左：縦長画像 */}
        <motion.div
          className="relative aspect-[2/3] lg:aspect-auto lg:min-h-[640px]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/images/story-cooking.jpg"
            alt="草木染めの工程"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* 右：テキスト */}
        <motion.div
          className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 lg:py-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <p
            className="text-white/60 mb-7 uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.35em" }}
          >
            The color of nature
          </p>

          <h2
            className="text-white font-bold leading-snug mb-8"
            style={{
              fontFamily: "var(--font-noto-serif)",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: "0.05em",
            }}
          >
            草木が教えてくれる色
          </h2>

          <p
            className="text-sm sm:text-base leading-[2.4] mb-10"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            藍、茜、栗——植物が持つ色を、<br />
            職人の手で布に宿す。<br />
            化学染料では生まれない、<br />
            自然だけが知っている色がある。
          </p>

          <Link
            href="/about"
            className="text-sm text-white/60 hover:text-white tracking-wider transition-colors self-start"
          >
            Teirakについて →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
