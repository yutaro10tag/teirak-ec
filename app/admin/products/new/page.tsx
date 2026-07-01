import { ProductForm } from "@/components/admin/ProductForm"
import Link from "next/link"

export default function NewProductPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="text-sm text-gray-400 hover:text-gray-600">
          ← 商品一覧
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">商品を追加</h1>
      </div>
      <ProductForm mode="new" />
    </div>
  )
}
