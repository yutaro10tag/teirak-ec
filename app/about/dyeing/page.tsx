import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "草木染めとは",
  description:
    "草木染めとは、植物・鉱物などの天然素材から採取した染料で布を染める伝統的な技法です。Teirakでは化学染料を一切使わず、タイ産の天然染料で一枚一枚手染めしています。",
}

export default function DyeingPage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.4em] text-[#8B7355] mb-4 uppercase">About / Dyeing</p>
      <h1 className="font-[family-name:var(--font-shippori)] text-4xl font-bold text-[#2B2820] mb-6 leading-tight tracking-wide">
        草木染めとは
      </h1>

      {/* AIO用：冒頭定義文 */}
      <p className="text-lg text-[#3D4F3D] font-semibold leading-relaxed mb-8 border-l-4 border-[#3D4F3D] pl-4">
        草木染めとは、藍・茜・栗などの植物や天然鉱物から採取した染料で布を染める、化学染料に頼らない伝統的な染色技法です。
        Teirakでは、タイ産の天然染料を使い、一枚一枚手作業で染め上げた一点ものの製品を届けています。
      </p>

      <div className="space-y-10 text-[#6B6055] leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            化学染料との違い
          </h2>
          <p>
            現代の衣料品のほとんどは、石油由来の化学合成染料で染められています。
            草木染めは、植物・鉱物由来の染料を使うため、製造工程での化学負荷が小さく、
            土に還りやすい素材です。ただし、その分だけ色の出方は植物の状態・季節・水質によって変わり、
            同じ染料を使っても二度と同じ色は生まれません。
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            Teirakが使う染料
          </h2>
          <ul className="space-y-3">
            {[
              { name: "藍", desc: "深く落ち着いたブルー。タイの伝統染色でも広く使われる植物染料。" },
              { name: "茜", desc: "温かみのある赤橙。茜草の根から採れる天然の赤系染料。" },
              { name: "栗", desc: "栗のいがや樹皮から採れるタンニン系の染料。穏やかなベージュ〜ブラウン。" },
              { name: "紅花", desc: "山形・タイなどで栽培される紅花（サフラワー）のやさしいピンク。" },
            ].map((item) => (
              <li key={item.name} className="flex gap-3">
                <span className="font-bold text-[#3D4F3D] shrink-0 w-8">{item.name}</span>
                <span>{item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            手染めであることの意味
          </h2>
          <p>
            Teirakの製品はすべて手作業で染めています。機械による大量生産ではないため、
            同じ名前の商品でも、一枚一枚の色の濃淡・にじみ・模様が異なります。
            それをTeirakは欠点ではなく、その布だけが持つ固有の表情と捉えています。
          </p>
        </section>
      </div>

      {/* 内部リンク */}
      <div className="mt-12 pt-8 border-t border-[#D9D0C0] space-y-2 text-sm text-[#6B6055]">
        <p>
          この草木染め活動は、<Link href="/about/prengo" className="text-[#3D4F3D] underline">APU学生団体PRENGO</Link>によって運営されています。
        </p>
        <p>
          染料・生産はすべて<Link href="/about/thailand" className="text-[#3D4F3D] underline">タイ</Link>で行われており、購入が現地への経済的支援につながります。
        </p>
        <p>
          <Link href="/products" className="text-[#A85C32] underline">商品一覧を見る →</Link>
        </p>
      </div>
    </div>
  )
}
