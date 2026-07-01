import Link from "next/link"
import { LogoutButton } from "@/components/admin/LogoutButton"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* サイドバー */}
      <aside className="w-52 bg-[#3D4F3D] text-[#F5F1E8] flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-xs text-white/60 mb-0.5">Teirak</p>
          <p className="font-bold text-sm">管理画面</p>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {[
            { href: "/admin", label: "ダッシュボード", icon: "📊" },
            { href: "/admin/products", label: "商品管理", icon: "🎨" },
            { href: "/admin/orders", label: "注文管理", icon: "📦" },
            { href: "/admin/settings", label: "設定", icon: "⚙️" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-[8px] text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="block text-xs text-white/60 hover:text-white/80 transition-colors"
          >
            ← サイトを見る
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
