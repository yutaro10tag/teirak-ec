"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

interface DaySales {
  date: string
  amount: number
}

export function SalesChart({ data }: { data: DaySales[] }) {
  if (data.every((d) => d.amount === 0)) {
    return (
      <div className="h-[200px] flex items-center justify-center text-sm text-gray-400">
        売上データがありません
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          interval={4}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => (v >= 1000 ? `¥${(v / 1000).toFixed(0)}k` : `¥${v}`)}
          width={48}
        />
        <Tooltip
          formatter={(v) => [`¥${Number(v).toLocaleString()}`, "売上"]}
          labelStyle={{ fontSize: 11 }}
          contentStyle={{ fontSize: 12, borderRadius: 8 }}
        />
        <Bar dataKey="amount" fill="#3D4F3D" radius={[3, 3, 0, 0]} maxBarSize={24} />
      </BarChart>
    </ResponsiveContainer>
  )
}
