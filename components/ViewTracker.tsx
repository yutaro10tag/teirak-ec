"use client"

import { useEffect } from "react"

export function ViewTracker({ productId }: { productId: string }) {
  useEffect(() => {
    fetch(`/api/products/${productId}/view`, { method: "POST" }).catch(() => {})
  }, [productId])
  return null
}
