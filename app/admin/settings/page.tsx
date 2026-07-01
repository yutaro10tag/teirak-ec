import { createServiceClient } from "@/lib/supabase"
import { SettingsForm } from "@/components/admin/SettingsForm"

export const dynamic = "force-dynamic"

async function getSettings() {
  const supabase = createServiceClient()
  const { data } = await supabase.from("site_settings").select("*")
  return Object.fromEntries((data ?? []).map((row) => [row.key, row.value]))
}

export default async function AdminSettingsPage() {
  const settings = await getSettings()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">設定</h1>
      <SettingsForm initial={settings} />
    </div>
  )
}
