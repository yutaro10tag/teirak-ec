const STATUS = {
  published: { label: "公開中", className: "bg-green-100 text-green-700" },
  draft: { label: "下書き", className: "bg-gray-100 text-gray-600" },
  sold_out: { label: "SOLD OUT", className: "bg-red-100 text-red-700" },
} as const

type Status = keyof typeof STATUS

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status as Status] ?? { label: status, className: "bg-gray-100 text-gray-600" }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.className}`}>
      {s.label}
    </span>
  )
}
