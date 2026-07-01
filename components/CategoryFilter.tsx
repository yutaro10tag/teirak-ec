"use client"

import { useRouter, useSearchParams } from "next/navigation"

interface Category {
  id: string
  label: string
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(id: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (id === "all") {
      params.delete("category")
    } else {
      params.set("category", id)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleChange(cat.id)}
          className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
            (activeCategory === cat.id) || (cat.id === "all" && activeCategory === "all")
              ? "bg-[#3D4F3D] text-[#F5F1E8] border-[#3D4F3D]"
              : "bg-transparent text-[#6B6055] border-[#D9D0C0] hover:border-[#3D4F3D]"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
