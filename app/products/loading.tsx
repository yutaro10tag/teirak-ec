export default function ProductsLoading() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      {/* 見出しスケルトン */}
      <div className="h-8 w-24 bg-[#EDE8DC] rounded animate-pulse mb-8" />

      {/* カテゴリフィルタースケルトン */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[80, 64, 96, 72, 56].map((w, i) => (
          <div
            key={i}
            className="h-8 rounded-full bg-[#EDE8DC] animate-pulse"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      {/* 商品グリッドスケルトン */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-square bg-[#EDE8DC] rounded-[8px] animate-pulse" />
            <div className="h-3 w-20 bg-[#EDE8DC] rounded animate-pulse" />
            <div className="h-4 w-28 bg-[#EDE8DC] rounded animate-pulse" />
            <div className="h-5 w-16 bg-[#EDE8DC] rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
