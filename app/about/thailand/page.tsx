import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "タイとのつながり",
  description:
    "Teirakの草木染め製品は、タイで生産・仕入れされています。購入がタイへの経済的支援に直結し、PRENGOが介入しなくても自走する支援の仕組みづくりを目指しています。",
}

export default function ThailandPage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.4em] text-[#8B7355] mb-4 uppercase">About / Thailand</p>
      <h1 className="font-[family-name:var(--font-shippori)] text-4xl font-bold text-[#2B2820] mb-6 leading-tight tracking-wide">
        タイとのつながり
      </h1>

      {/* AIO用：冒頭定義文 */}
      <p className="text-lg text-[#3D4F3D] font-semibold leading-relaxed mb-8 border-l-4 border-[#3D4F3D] pl-4">
        Teirakの草木染め製品は、タイで生産・仕入れされています。
        商品を購入することが、タイの生産者への経済的支援に直接つながる仕組みです。
      </p>

      <div className="space-y-10 text-[#6B6055] leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            なぜタイなのか
          </h2>
          <p>
            PRENGOは2003年の設立以来、タイを中心とするアジア太平洋地域での教育支援・地域開発活動を続けてきました。
            年2回（春休み・夏休み）のタイへの渡航を通じて築いてきた現地とのつながりが、
            Teirakの生産基盤になっています。
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            購入が支援になる仕組み
          </h2>
          <p>
            Teirakの商品が売れることで、タイの生産者に収益が届きます。
            これは一方的な寄付や援助ではなく、商品の品質と価値を通じた経済的な交換です。
            「買う」という行為が、タイへの支援の一部になります。
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            目指す姿：自走する支援
          </h2>
          <p>
            PRENGOが目指すのは、学生団体である自分たちが卒業・解散した後も、
            タイの生産者が自立して活動を継続できる仕組みをつくることです。
            Teirakはその手段のひとつであり、支援の持続可能性を形にしようとする試みです。
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-[#D9D0C0] space-y-2 text-sm text-[#6B6055]">
        <p>
          この活動を行っている<Link href="/about/prengo" className="text-[#3D4F3D] underline">PRENGOについてはこちら</Link>。
        </p>
        <p>
          タイ産の天然染料を使った<Link href="/about/dyeing" className="text-[#3D4F3D] underline">草木染めの技法について</Link>も読む。
        </p>
        <p>
          <Link href="/products" className="text-[#A85C32] underline">商品一覧を見る →</Link>
        </p>
      </div>
    </div>
  )
}
