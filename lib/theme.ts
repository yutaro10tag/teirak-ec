// デザイン設定の一元管理。色・フォント・余白を変えるときはここだけ編集する。
export const theme = {
  colors: {
    background: '#F5F1E8',   // 生成り
    surface: '#FFFFFF',
    primary: '#3D4F3D',      // 深緑
    accent: '#A85C32',       // 錆色
    muted: '#8B7355',        // 枯草色
    text: '#2B2820',
    textMuted: '#6B6055',
    border: '#D9D0C0',
    error: '#C0392B',
  },
  fonts: {
    heading: 'var(--font-shippori)',
    body: 'var(--font-noto-serif)',
  },
  layout: {
    maxWidth: '1200px',
    maxWidthNarrow: '720px',
    radius: '8px',
    radiusLg: '12px',
  },
} as const

export type Theme = typeof theme
