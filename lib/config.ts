// 変わりうる数値設定の一元管理。値を変えるときはここだけ編集する。
export const config = {
  shippingFee: 500,              // 配送料（円）
  freeShippingThreshold: 8000,   // この金額以上で送料無料
  taxRate: 0.10,                 // 消費税率（税込み価格の場合は0）
  maxCartItems: 10,              // カートに入れられる最大アイテム数
  siteName: 'Teirak',
  siteDescription: '草木染め一点もの。自然の色をまとう。',
  instagramHandle: '@teirak_official',
  contactEmail: 'hello@teirak.jp',
} as const
