"use client"

import { useRouter } from "next/navigation"

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`「${name}」を削除しますか？この操作は取り消せません。`)) return

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
    if (res.ok) {
      router.refresh()
    } else {
      alert("削除に失敗しました")
    }
  }

  return (
    <button onClick={handleDelete} className="text-xs text-red-500 hover:underline">
      削除
    </button>
  )
}
