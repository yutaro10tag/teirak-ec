"use client"

import { motion } from "framer-motion"

const features = [
  {
    num: "01",
    title: "天然染料のみ",
    body: ["草木から抽出した染料だけを使用。", "化学物質を一切使わない。"],
  },
  {
    num: "02",
    title: "手染め一点もの",
    body: ["すべてタイの職人が手作業で染色。", "同じ色は二度と生まれない。"],
  },
  {
    num: "03",
    title: "地球への配慮",
    body: ["環境に負荷をかけない製法で、", "自然と共存するものづくり。"],
  },
]

export function LpValues() {
  return (
    <section className="bg-[#FAF7F2]" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#D9D0C0]">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              className="px-6 sm:px-10 lg:px-14 py-12 sm:py-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.15 }}
            >
              <p
                className="leading-none mb-6 select-none font-bold text-[#1A1814]"
                style={{
                  fontSize: "80px",
                  opacity: 0.15,
                  fontFamily: "var(--font-cormorant)",
                  letterSpacing: "-0.02em",
                }}
              >
                {f.num}
              </p>
              <h3 className="font-[family-name:var(--font-shippori)] text-sm font-bold text-[#1A1814] mb-4 tracking-wider">
                {f.title}
              </h3>
              <p className="text-sm text-[#1A1814]/55 leading-[2]">
                {f.body.map((line, j) => (
                  <span key={j} className="block">{line}</span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
