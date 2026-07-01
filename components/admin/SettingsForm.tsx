"use client"

import { useState } from "react"

interface SettingsFormProps {
  initial: Record<string, string>
}

export function SettingsForm({ initial }: SettingsFormProps) {
  const [values, setValues] = useState(initial)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  async function saveSetting(key: string) {
    setSaving(key)
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: values[key] }),
    })
    setSaving(null)
    setSaved(key)
    setTimeout(() => setSaved(null), 2000)
  }

  function update(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const fields = [
    {
      key: "shipping_fee",
      label: "配送料（円）",
      type: "number",
      description: "0にすると全注文送料無料",
    },
    {
      key: "free_shipping_threshold",
      label: "送料無料ライン（円）",
      type: "number",
      description: "この金額以上の注文は送料無料",
    },
    {
      key: "announcement_text",
      label: "お知らせ文（空欄で非表示）",
      type: "text",
      description: "サイト上部に表示される告知文",
    },
    {
      key: "is_shop_open",
      label: "ショップ公開",
      type: "select",
      options: [
        { value: "true", label: "公開中" },
        { value: "false", label: "一時閉店" },
      ],
      description: "falseにすると購入不可になります",
    },
  ]

  return (
    <div className="space-y-4 max-w-lg">
      {fields.map((field) => (
        <div key={field.key} className="bg-white rounded-[12px] p-5 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
          <p className="text-xs text-gray-400 mb-3">{field.description}</p>

          <div className="flex gap-2">
            {field.type === "select" ? (
              <select
                value={values[field.key] ?? "true"}
                onChange={(e) => update(field.key, e.target.value)}
                className="flex-1 border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D4F3D]"
              >
                {field.options?.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={values[field.key] ?? ""}
                onChange={(e) => update(field.key, e.target.value)}
                className="flex-1 border border-gray-200 rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3D4F3D]"
              />
            )}
            <button
              onClick={() => saveSetting(field.key)}
              disabled={saving === field.key}
              className="bg-[#3D4F3D] text-white text-sm px-4 py-2 rounded-[8px] hover:bg-[#2e3d2e] transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {saving === field.key ? "保存中" : saved === field.key ? "✓ 保存済み" : "保存"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
