export default function AdminLoading() {
  return (
    <div className="p-8 space-y-8 animate-pulse">
      {/* タイトル */}
      <div className="h-8 w-48 bg-gray-200 rounded" />

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-[12px]" />
        ))}
      </div>

      {/* グラフ + ランキング */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 bg-gray-100 rounded-[12px]" />
        <div className="h-64 bg-gray-100 rounded-[12px]" />
      </div>

      {/* 最近の注文 */}
      <div className="h-48 bg-gray-100 rounded-[12px]" />
    </div>
  )
}
