"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@/lib/types"
import categories from "@/content/categories.json"

interface ProductFormProps {
  initial?: Partial<Product>
  mode: "new" | "edit"
  productId?: string
}

export function ProductForm({ initial = {}, mode, productId }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [images, setImages] = useState<string[]>(initial.images ?? [])

  const [form, setForm] = useState({
    name: initial.name ?? "",
    description: initial.description ?? "",
    price: String(initial.price ?? ""),
    stock: String(initial.stock ?? "1"),
    is_one_of_a_kind: initial.is_one_of_a_kind ?? false,
    category: initial.category ?? "other",
    dye_material: initial.dye_material ?? "",
    status: initial.status ?? "draft",
    is_sale: initial.is_sale ?? false,
    sale_price: initial.sale_price != null ? String(initial.sale_price) : "",
    sizes: (initial.sizes ?? []).join(", "),
  })

  function update(key: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function updateImage(index: number, value: string) {
    setImages((prev) => {
      const next = [...prev]
      next[index] = value
      return next.filter((v, i) => v !== "" || i < index)
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: images.filter(Boolean),
      is_sale: form.is_sale,
      sale_price: form.is_sale && form.sale_price ? Number(form.sale_price) : null,
      sizes: form.sizes ? form.sizes.split(",").map((s) => s.trim()).filter(Boolean) : null,
    }

    const res = await fetch(
      mode === "new" ? "/api/products" : `/api/products/${productId}`,
      {
        method: mode === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )

    if (res.ok) {
      router.push("/admin/products")
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? "保存に失敗しました")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* 基本情報 */}
      <div className="bg-white rounded-[12px] p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-700">基本情報</h2>

        <Field label="商品名" required>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            className={inputClass}
          />
        </Field>

        <Field label="説明文">
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={4}
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="価格（円）" required>
            <input
              type="number"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              required
              min={0}
              className={inputClass}
            />
          </Field>
          <Field label="在庫数" required>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => update("stock", e.target.value)}
              required
              min={0}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="カテゴリ">
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={inputClass}
          >
            {categories.categories.filter((c) => c.id !== "all").map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </Field>

        <Field label="染料素材">
          <input
            value={form.dye_material}
            onChange={(e) => update("dye_material", e.target.value)}
            placeholder="藍、茜、栗 など"
            className={inputClass}
          />
        </Field>

        <Field label="サイズ展開（カンマ区切り・フリーサイズの場合は空欄）">
          <input
            value={form.sizes}
            onChange={(e) => update("sizes", e.target.value)}
            placeholder="S, M, L など"
            className={inputClass}
          />
        </Field>

        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_one_of_a_kind}
            onChange={(e) => update("is_one_of_a_kind", e.target.checked)}
            className="rounded"
          />
          一点もの（同じ商品は二度と作れない）
        </label>
      </div>

      {/* セール設定 */}
      <div className="bg-white rounded-[12px] p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-700">セール設定</h2>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_sale}
            onChange={(e) => update("is_sale", e.target.checked)}
            className="rounded accent-red-500"
          />
          <span className="font-medium">セール中にする</span>
          {form.is_sale && (
            <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded">SALE</span>
          )}
        </label>
        {form.is_sale && (
          <Field label="セール価格（円）">
            <input
              type="number"
              value={form.sale_price}
              onChange={(e) => update("sale_price", e.target.value)}
              min={0}
              placeholder={form.price || "通常価格より低く設定"}
              className={inputClass}
            />
          </Field>
        )}
      </div>

      {/* 画像 */}
      <div className="bg-white rounded-[12px] p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-gray-700">画像パス</h2>
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <Field label={`画像 ${i + 1}${i === 0 ? "（メイン）" : "（サブ）"}`}>
              <input
                value={images[i] ?? ""}
                onChange={(e) => updateImage(i, e.target.value)}
                placeholder="/images/filename.jpg"
                className={inputClass}
              />
            </Field>
            {images[i] && (
              <img
                src={images[i]}
                alt={`プレビュー${i + 1}`}
                className="mt-1 w-24 h-24 object-cover rounded-[8px] bg-gray-100"
              />
            )}
          </div>
        ))}
      </div>

      {/* 公開設定 */}
      <div className="bg-white rounded-[12px] p-6 shadow-sm">
        <h2 className="font-bold text-gray-700 mb-4">公開設定</h2>
        <div className="flex gap-3">
          {(["draft", "published", "sold_out"] as const).map((s) => (
            <label key={s} className="flex items-center gap-1.5 text-sm cursor-pointer">
              <input
                type="radio"
                name="status"
                value={s}
                checked={form.status === s}
                onChange={() => update("status", s)}
              />
              {{ draft: "下書き", published: "公開", sold_out: "SOLD OUT" }[s]}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-[8px]">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#3D4F3D] text-white font-bold px-6 py-3 rounded-[8px] hover:bg-[#2e3d2e] transition-colors disabled:opacity-50"
        >
          {loading ? "保存中..." : mode === "new" ? "商品を追加" : "変更を保存"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-gray-200 text-gray-600 px-6 py-3 rounded-[8px] hover:border-gray-400 transition-colors"
        >
          キャンセル
        </button>
      </div>
    </form>
  )
}

const inputClass =
  "w-full border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D4F3D]"

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
