"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const STATUSES = [
  { value: "pending", label: "決済待ち" },
  { value: "paid", label: "決済済み" },
  { value: "shipped", label: "発送済み" },
  { value: "delivered", label: "配達完了" },
]

export function OrderStatusSelector({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: string
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLoading(true)
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: e.target.value }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={handleChange}
      disabled={loading}
      className="text-sm border border-gray-200 rounded-[8px] px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#3D4F3D] disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>{s.label}に変更</option>
      ))}
    </select>
  )
}
