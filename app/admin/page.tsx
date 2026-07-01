import { createServiceClient } from "@/lib/supabase"
import Link from "next/link"
import { SalesChart } from "@/components/admin/SalesChart"

export const dynamic = "force-dynamic"

const STATUS_LABELS: Record<string, string> = {
  pending: "決済待ち",
  paid: "決済済み",
  shipped: "発送済み",
  delivered: "配達完了",
}

async function getStats() {
  const supabase = createServiceClient()
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).toISOString()
  const start60 = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString()
  const start30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [
    productsRes,
    ordersCountRes,
    recentOrdersRes,
    paidOrdersRes,
    soldOutRes,
    topProductsRes,
  ] = await Promise.all([
    supabase.from("products").select("id, status").neq("status", "draft"),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
    supabase
      .from("orders")
      .select("total, created_at")
      .neq("status", "pending")
      .gte("created_at", start60),
    supabase.from("products").select("id").eq("status", "sold_out"),
    supabase
      .from("products")
      .select("id, name, view_count")
      .order("view_count", { ascending: false })
      .limit(5),
  ])

  const allProducts = productsRes.data ?? []
  const paidOrders = paidOrdersRes.data ?? []

  // 月次売上
  const thisMonthSales = paidOrders
    .filter((o) => o.created_at >= startOfMonth)
    .reduce((s, o) => s + (o.total ?? 0), 0)

  const lastMonthSales = paidOrders
    .filter((o) => o.created_at >= startOfLastMonth && o.created_at <= endOfLastMonth)
    .reduce((s, o) => s + (o.total ?? 0), 0)

  const totalSales = paidOrders.reduce((s, o) => s + (o.total ?? 0), 0)

  const thisMonthOrders = paidOrders.filter((o) => o.created_at >= startOfMonth).length

  // 過去30日間 日別グラフ
  const chartData: { date: string; amount: number }[] = []
  const chartOrders = paidOrders.filter((o) => o.created_at >= start30)
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const isoDate = d.toISOString().slice(0, 10)
    const label = `${d.getMonth() + 1}/${d.getDate()}`
    const amount = chartOrders
      .filter((o) => o.created_at.slice(0, 10) === isoDate)
      .reduce((s, o) => s + (o.total ?? 0), 0)
    chartData.push({ date: label, amount })
  }

  return {
    productCount: allProducts.filter((p) => p.status === "published").length,
    soldOutCount: (soldOutRes.data ?? []).length,
    orderCount: ordersCountRes.count ?? 0,
    thisMonthOrders,
    recentOrders: recentOrdersRes.data ?? [],
    thisMonthSales,
    lastMonthSales,
    totalSales,
    chartData,
    topProducts: (topProductsRes.data ?? []).filter((p) => (p.view_count ?? 0) > 0),
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const salesCards = [
    { label: "今月の売上", value: `¥${stats.thisMonthSales.toLocaleString()}`, sub: `先月：¥${stats.lastMonthSales.toLocaleString()}`, color: "bg-green-50 border-green-200" },
    { label: "累計売上", value: `¥${stats.totalSales.toLocaleString()}`, color: "bg-emerald-50 border-emerald-200" },
    { label: "今月の注文", value: `${stats.thisMonthOrders}件`, sub: `累計：${stats.orderCount}件`, color: "bg-blue-50 border-blue-200" },
    { label: "公開中の商品", value: `${stats.productCount}点`, sub: `在庫切れ：${stats.soldOutCount}点`, color: "bg-amber-50 border-amber-200", href: "/admin/products" },
  ]

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">ダッシュボード</h1>

      {/* 統計カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {salesCards.map((card) =>
          card.href ? (
            <Link key={card.label} href={card.href} className={`${card.color} border rounded-[12px] p-5 hover:shadow-sm transition-shadow`}>
              <p className="text-xs text-gray-500 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              {card.sub && <p className="text-xs text-gray-400 mt-1">{card.sub}</p>}
            </Link>
          ) : (
            <div key={card.label} className={`${card.color} border rounded-[12px] p-5`}>
              <p className="text-xs text-gray-500 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              {card.sub && <p className="text-xs text-gray-400 mt-1">{card.sub}</p>}
            </div>
          )
        )}
      </div>

      {/* 売上グラフ + 人気商品 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[12px] shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4">過去30日間の売上</h2>
          <SalesChart data={stats.chartData} />
        </div>

        <div className="bg-white rounded-[12px] shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-4">閲覧数ランキング</h2>
          {stats.topProducts.length === 0 ? (
            <p className="text-sm text-gray-400">
              閲覧データがありません
              <br /><span className="text-xs">（migration-001 実行後に有効）</span>
            </p>
          ) : (
            <ol className="space-y-3">
              {stats.topProducts.map((p, i) => (
                <li key={p.id} className="flex items-center gap-2 text-sm">
                  <span className="text-xs font-bold text-gray-400 w-5">{i + 1}</span>
                  <span className="flex-1 text-gray-700 truncate">{p.name}</span>
                  <span className="text-xs text-gray-400">{p.view_count}回</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {/* 最近の注文 */}
      <div className="bg-white rounded-[12px] shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-800">最近の注文</h2>
          <Link href="/admin/orders" className="text-sm text-[#3D4F3D] hover:underline">
            すべて見る →
          </Link>
        </div>
        {stats.recentOrders.length === 0 ? (
          <p className="text-sm text-gray-400">注文はまだありません</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b">
                <th className="pb-2 font-normal">お客様</th>
                <th className="pb-2 font-normal">金額</th>
                <th className="pb-2 font-normal">ステータス</th>
                <th className="pb-2 font-normal">日時</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 text-gray-700">{order.customer_name}</td>
                  <td className="py-2">¥{order.total?.toLocaleString()}</td>
                  <td className="py-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="py-2 text-gray-400">
                    {new Date(order.created_at).toLocaleDateString("ja-JP")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
