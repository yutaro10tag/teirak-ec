export const dynamic = "force-dynamic"

import { createServiceClient } from "@/lib/supabase"
import { Product } from "@/lib/types"
import { LpHero } from "@/components/sections/LpHero"
import { LpProducts } from "@/components/sections/LpProducts"
import { LpStory } from "@/components/sections/LpStory"
import { LpValues } from "@/components/sections/LpValues"
import { LpCta } from "@/components/sections/LpCta"

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createServiceClient()
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(3)
    return data ?? []
  } catch {
    return []
  }
}

export default async function Home() {
  const products = await getProducts()
  return (
    <>
      <LpHero />
      <LpProducts products={products} />
      <LpStory />
      <LpValues />
      <LpCta />
    </>
  )
}
