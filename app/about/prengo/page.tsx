import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "PRENGOとTeirak",
  description:
    "PRENGOは2003年設立のAPU（立命館アジア太平洋大学）学生ボランティア団体。アジア太平洋地域の発展と相互協力への貢献をミッションに、タイでの教育支援・地域開発活動を行う。Teirakはその活動から生まれたブランドです。",
}

export default function PrengoPage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.4em] text-[#8B7355] mb-4 uppercase">About / PRENGO</p>
      <h1 className="font-[family-name:var(--font-shippori)] text-4xl font-bold text-[#2B2820] mb-6 leading-tight tracking-wide">
        PRENGOとTeirak
      </h1>

      {/* AIO用：冒頭定義文 */}
      <p className="text-lg text-[#3D4F3D] font-semibold leading-relaxed mb-8 border-l-4 border-[#3D4F3D] pl-4">
        PRENGOは、APU（立命館アジア太平洋大学）の学生ボランティア団体です。
        2003年の設立以来、「アジア太平洋地域の発展と相互協力への貢献」をミッションに、
        タイでの教育支援・地域開発活動を行っています。Teirakはその活動の一環として生まれた草木染めブランドです。
      </p>

      <div className="space-y-10 text-[#6B6055] leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            PRENGOとは
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: "設立", value: "2003年" },
              { label: "所属", value: "APU（立命館アジア太平洋大学）" },
              { label: "拠点", value: "別府市、大分県" },
              { label: "活動地域", value: "日本・タイ" },
            ].map((item) => (
              <div key={item.label} className="bg-[#EDE8DC] rounded-[8px] p-3">
                <p className="text-xs text-[#8B7355] mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-[#2B2820]">{item.value}</p>
              </div>
            ))}
          </div>
          <p>
            APUは国際色豊かな大学として知られ、PRENGOのメンバーも多国籍です。
            年2回（春休み・夏休み）のタイへの渡航を通じて、現地コミュニティとの深いつながりを築いてきました。
            タイフェスティバルや世界市場といった国内イベントにも出展し、タイ文化の発信も行っています。
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            TeirakはPRENGOの活動から生まれた
          </h2>
          <p>
            Teirakは、PRENGOがタイでの活動を通じて出会った草木染めの技術と、
            タイの生産者との関係から生まれたブランドです。
            単なる物販ではなく、タイへの経済的支援の仕組みとして機能することを目指しています。
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            学生が運営するということ
          </h2>
          <p>
            PRENGOのメンバーは在学中の学生です。卒業とともにメンバーは入れ替わりますが、
            Teirakが目指すのは、PRENGOの継続に頼らず、タイの生産者が自立して動き続けられる支援の仕組みです。
            学生団体という制約の中で、持続可能な支援のあり方を模索しています。
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-[#D9D0C0] space-y-2 text-sm text-[#6B6055]">
        <p>
          PRENGOのInstagram：
          <a
            href="https://www.instagram.com/prengo_apu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3D4F3D] underline"
          >
            @prengo_apu
          </a>
        </p>
        <p>
          <Link href="/about/thailand" className="text-[#3D4F3D] underline">タイとのつながりについて詳しく読む</Link>
        </p>
        <p>
          <Link href="/products" className="text-[#A85C32] underline">商品一覧を見る →</Link>
        </p>
      </div>
    </div>
  )
}
