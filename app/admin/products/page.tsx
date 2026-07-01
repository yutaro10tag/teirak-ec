import { createServiceClient } from "@/lib/supabase"
import Link from "next/link"
import { DeleteProductButton } from "@/components/admin/DeleteProductButton"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { AdminNotifyButton } from "@/components/admin/AdminNotifyButton"

export const dynamic = "force-dynamic"

async function getAllProducts() {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
  return data ?? []
}

export default async function AdminProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">商品管理</h1>
        <Link
          href="/admin/products/new"
          className="bg-[#3D4F3D] text-white text-sm font-bold px-4 py-2.5 rounded-[8px] hover:bg-[#2e3d2e] transition-colors"
        >
          + 商品を追加
        </Link>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-500">
              <th className="px-4 py-3 font-normal">商品名</th>
              <th className="px-4 py-3 font-normal">価格</th>
              <th className="px-4 py-3 font-normal">在庫</th>
              <th className="px-4 py-3 font-normal">ステータス</th>
              <th className="px-4 py-3 font-normal">染料</th>
              <th className="px-4 py-3 font-normal"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => {
              const hasSale = product.is_sale && product.sale_price != null
              const notifyCount = (product.notify_email_list ?? []).length
              return (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover bg-gray-100 flex-shrink-0"
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-medium text-gray-800">{product.name}</p>
                        {hasSale && (
                          <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded">SALE</span>
                        )}
                      </div>
                      {product.is_one_of_a_kind && (
                        <span className="text-xs text-[#A85C32]">一点もの</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {hasSale ? (
                    <div>
                      <span className="text-red-500 font-bold">¥{product.sale_price?.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through ml-1">¥{product.price?.toLocaleString()}</span>
                    </div>
                  ) : (
                    <span className="text-gray-700">¥{product.price?.toLocaleString()}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-700">{product.stock}点</td>
                <td className="px-4 py-3">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-4 py-3">
                  {notifyCount > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{notifyCount}件待機中</span>
                      <AdminNotifyButton productId={product.id} productName={product.name} />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-xs text-[#3D4F3D] hover:underline"
                    >
                      編集
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-center text-gray-400 py-10 text-sm">商品がありません</p>
        )}
      </div>
    </div>
  )
}
