import { createServiceClient } from "@/lib/supabase"
import { OrderStatusSelector } from "@/components/admin/OrderStatusSelector"
import { StatusBadge } from "@/components/admin/StatusBadge"

export const dynamic = "force-dynamic"

async function getOrders() {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
  return data ?? []
}

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">注文管理</h1>

      <div className="space-y-4">
        {orders.length === 0 && (
          <div className="bg-white rounded-[12px] p-10 text-center text-gray-400 text-sm">
            注文はまだありません
          </div>
        )}
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-[12px] shadow-sm p-5">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-bold text-gray-800">{order.customer_name}</p>
                <p className="text-sm text-gray-500">{order.customer_email}</p>
                <p className="text-xs text-gray-400 mt-0.5">{order.customer_address}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800 text-lg">¥{order.total?.toLocaleString()}</p>
                <p className="text-xs text-gray-400">
                  {new Date(order.created_at).toLocaleString("ja-JP")}
                </p>
              </div>
            </div>

            {/* 注文商品 */}
            <div className="bg-gray-50 rounded-[8px] p-3 mb-4 text-sm">
              {(order.items as Array<{ name: string; quantity: number; price: number }>).map((item, i) => (
                <div key={i} className="flex justify-between text-gray-700">
                  <span>{item.name} × {item.quantity}</span>
                  <span>¥{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge status={order.status} />
              <OrderStatusSelector orderId={order.id} currentStatus={order.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
