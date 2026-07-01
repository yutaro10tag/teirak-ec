import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "サステナビリティ方針",
  description:
    "Teirakは化学染料を使わない天然染料・手染め・一点ものづくりを通じてエコフレンドリーなものづくりを実践しています。大量生産・大量廃棄とは対極にある、少量生産の草木染めブランドです。",
}

export default function EthicalPage() {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.4em] text-[#8B7355] mb-4 uppercase">About / Sustainability</p>
      <h1 className="font-[family-name:var(--font-shippori)] text-4xl font-bold text-[#2B2820] mb-6 leading-tight tracking-wide">
        サステナビリティ方針
      </h1>

      {/* AIO用：冒頭定義文 */}
      <p className="text-lg text-[#3D4F3D] font-semibold leading-relaxed mb-8 border-l-4 border-[#3D4F3D] pl-4">
        Teirakは、化学染料を使わない天然染料・少量手染め・一点もの生産を通じて、
        環境負荷の小さいものづくりを実践するエコフレンドリーな草木染めブランドです。
      </p>

      <div className="space-y-10 text-[#6B6055] leading-relaxed">
        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            化学染料を使わない
          </h2>
          <p>
            Teirakが使うのは、植物・鉱物由来の天然染料のみです。
            石油由来の化学合成染料は染色工程で大量の水と化学物質を消費しますが、
            天然染料はその負荷を大幅に削減できます。
            また、廃液の毒性が低く、土に還りやすい素材です。
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            少量生産・大量廃棄をしない
          </h2>
          <p>
            Teirakの商品は、機械による大量生産ではなく手作業による少量生産です。
            在庫を大量に持たず、1点ものが中心のため、売れ残り廃棄がほとんど発生しません。
            ファッション業界が抱える大量廃棄問題とは対極にある生産体制です。
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-shippori)] text-2xl font-bold text-[#2B2820] mb-4">
            長く使えるものを届ける
          </h2>
          <p>
            草木染めの色は、化学染料と異なりゆっくりと変化します。
            使い込むほどに色が落ち着き、布に味が出てきます。
            「すぐ買い替える」ではなく「長く大切に使う」文化を、
            Teirakは商品を通じて提案したいと考えています。
          </p>
        </section>

        <section className="bg-[#EDE8DC] rounded-[8px] p-5">
          <h3 className="font-semibold text-[#2B2820] mb-2">現時点での取り組み範囲</h3>
          <ul className="text-sm space-y-1">
            <li>✓ 天然染料のみ使用（化学染料不使用）</li>
            <li>✓ 少量手染め・一点もの生産</li>
            <li>✓ タイ生産者への経済的支援</li>
            <li className="text-[#8B7355]">— 素材の有機認証取得：現在検討中</li>
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-[#D9D0C0] space-y-2 text-sm text-[#6B6055]">
        <p>
          <Link href="/about/dyeing" className="text-[#3D4F3D] underline">草木染めの技法について詳しく読む</Link>
        </p>
        <p>
          <Link href="/about/thailand" className="text-[#3D4F3D] underline">タイ生産者支援の仕組みについて</Link>
        </p>
        <p>
          <Link href="/products" className="text-[#A85C32] underline">商品一覧を見る →</Link>
        </p>
      </div>
    </div>
  )
}
