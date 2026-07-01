import { notFound } from "next/navigation"
import { createServiceClient } from "@/lib/supabase"
import { ProductForm } from "@/components/admin/ProductForm"
import Link from "next/link"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params
  const supabase = createServiceClient()
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()
  if (!product) notFound()

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="text-sm text-gray-400 hover:text-gray-600">
          ← 商品一覧
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">商品を編集</h1>
      </div>
      <ProductForm mode="edit" initial={product} productId={id} />
    </div>
  )
}
