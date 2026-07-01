"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const SLIDES = [
  "/images/hero-drying.jpg",
  "/images/hero-apron-yellow.jpg",
  "/images/story-cooking.jpg",
]

const INTERVAL_MS = 5000
const FADE_MS = 1500

export function LpHero() {
  const [current, setCurrent] = useState(0)

  // 5秒ごとにスライド切り替え
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  // スクロール量に応じてヘッダー透明度を切り替え
  useEffect(() => {
    const update = () => {
      if (window.scrollY < 80) {
        document.body.setAttribute("data-hero", "true")
      } else {
        document.body.removeAttribute("data-hero")
      }
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      window.removeEventListener("scroll", update)
      document.body.removeAttribute("data-hero")
    }
  }, [])

  return (
    <section className="relative -mt-14 h-screen overflow-hidden">
      {/* ── スライドショー背景 ── */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        >
          {/* ケンバーンズ効果（CSS animation） */}
          <div className="absolute inset-0 animate-kenburns">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      {/* 深緑オーバーレイ */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: "#3D5A3E", opacity: 0.45 }}
      />

      {/* ── テキスト（中央配置） ── */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pt-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <p
          className="text-[10px] sm:text-xs text-white/65 mb-6 uppercase"
          style={{ letterSpacing: "0.25em" }}
        >
          Natural Dye / Handmade / One of a Kind
        </p>

        <h1
          className="text-white font-light leading-none mb-5"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(64px, 10vw, 120px)",
            letterSpacing: "0.08em",
          }}
        >
          Teirak
        </h1>

        <p
          className="text-sm sm:text-base text-white/75"
          style={{ letterSpacing: "0.25em" }}
        >
          自然の色をまとう
        </p>
      </motion.div>

      {/* ── Scroll ↓ バウンス ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span
          className="text-[9px] uppercase"
          style={{ letterSpacing: "0.3em" }}
        >
          Scroll
        </span>
        <motion.span
          className="text-base"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}
