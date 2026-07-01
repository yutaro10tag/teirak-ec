export type ProductStatus = 'published' | 'draft' | 'sold_out'
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  is_one_of_a_kind: boolean
  images: string[]
  category: string
  dye_material: string
  status: ProductStatus
  created_at: string
  // 拡張フィールド
  is_sale: boolean
  sale_price: number | null
  notify_email_list: string[]
  view_count: number
  sizes: string[] | null
}

export interface OrderItem {
  product_id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  stripe_session_id: string
  customer_name: string
  customer_email: string
  customer_address: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface SiteSetting {
  key: string
  value: string
  updated_at: string
}
