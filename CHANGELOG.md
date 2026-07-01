# Changelog

## 2026-06-23 — 管理画面強化・セール・再入荷通知・閲覧数

### 新規ファイル
- `components/ViewTracker.tsx` — 商品詳細ページロード時に view_count +1（useEffect + API）
- `components/RestockNotifyForm.tsx` — sold_out 商品詳細のメール登録フォーム
- `components/admin/SalesChart.tsx` — recharts BarChart（過去30日日別売上）
- `components/admin/AdminNotifyButton.tsx` — 管理画面から再入荷通知一斉送信
- `app/api/products/[id]/view/route.ts` — view_count インクリメント（RPC呼び出し）
- `app/api/products/[id]/notify/route.ts` — 再入荷メール登録 GET/POST
- `app/api/admin/notify/[id]/route.ts` — Resend で一斉送信→リストクリア
- `supabase-migration-001.sql` — increment_view_count 関数を追記

### 変更ファイル
- `app/admin/page.tsx` — 統計カード4種（今月売上・累計・注文数・公開商品数）+ 売上グラフ + 閲覧数ランキング
- `app/admin/products/page.tsx` — SALE バッジ・セール価格表示・再入荷通知件数＋送信ボタン列
- `components/admin/ProductForm.tsx` — is_sale トグル・sale_price 入力・sizes 入力・複数画像URL対応
- `app/api/products/[id]/route.ts` — PUT に is_sale / sale_price / sizes 追加（migration後有効）
- `app/products/[id]/page.tsx` — ViewTracker 追加・セール価格表示（取消線＋赤字）・SALE バッジ・RestockNotifyForm（sold_out 時）・sizes 表示
- `components/ProductCard.tsx` — SALE バッジ・セール価格（赤字＋取消線）対応

### パッケージ
- recharts インストール

### 備考（要実行）
Supabase SQL Editor で `supabase-migration-001.sql` を実行すると以下が有効化される：
- view_count トラッキング・閲覧数ランキング
- is_sale / sale_price / notify_email_list / sizes フィールド

## 2026-06-23 — 商品データ設計変更・13件登録

### スキーマ変更
- `supabase-migration-001.sql` 生成（Supabase SQL Editor で要実行）
  - `is_sale boolean DEFAULT false`
  - `sale_price integer DEFAULT NULL`
  - `notify_email_list text[] DEFAULT '{}'`
  - `view_count integer DEFAULT 0`
  - `sizes text[] DEFAULT NULL`
- `lib/types.ts` — Product 型に上記5フィールドを追加

### 画像リネーム（public/images/）
- 21枚のUUID/IMG名ファイルを apron-*/tshirt-*/lunchmat-*/tote-* の命名規則に統一

### 商品データ
- 既存3件を削除し13件を新規登録（Supabase products テーブル）
  - エプロン 3件・Tシャツ 4件・ランチョンマット 2件・トートバッグ 3件・靴下 1件
  - すべて is_one_of_a_kind / stock / status を正確に設定
- `content/categories.json` — カテゴリを実商品に合わせて更新

### 備考
- 新フィールド（is_sale 等）は `supabase-migration-001.sql` 実行後に有効化される
  実行前は既存スキーマのみで動作（新フィールドはデフォルト値）

## 2026-06-22 — 残セクション実装（フィーチャー・CTA・フッター）

### 変更
- `components/sections/LpValues.tsx` — 完全リライト
  - 01/02/03 の薄い大数字（Cormorant Garamond・opacity 0.15・80px）
  - `divide-x` で列間に細い区切り線、モバイルは `divide-y` 縦積み
  - ステガードフェードアップ（delay 0/0.15/0.3秒）
- `components/sections/LpCta.tsx` — 完全リライト
  - `/images/product-tote-full.jpg` ローカル画像にブラー + 深緑 overlay 0.6
  - 高さ 60vh・「あなただけの一点ものを」+「Collection を見る」ボタン
  - ホバーで背景深緑・文字白に反転（0.3秒）
- `components/SiteFooter.tsx` — ダーク (#1A1814) フッターにリデザイン
  - 左：Teirak ロゴ／中央：ナビ3本／右：コピーライト
  - モバイル縦積み・中央揃え
- `app/page.tsx` — LpCta への imageUrl prop を削除

## 2026-06-22 — ブランドストーリーセクション改善

### 変更
- `components/sections/LpStory.tsx` — 完全リライト
  - ローカル画像 `/images/story-cooking.jpg` に変更（Supabase 依存を解消）
  - aspect-[2/3] 縦長画像（デスクトップ min-h-[640px]・モバイル縦積み）
  - Cormorant Garamond で「草木が教えてくれる色」見出し
  - 「The color of nature」（opacity 0.6）→ 見出し → 本文（opacity 0.85）→「Teirakについて →」リンク
  - 左 x:-50→0、右 x:50→0（delay 0.2s）のスクロールアニメーション
- `app/page.tsx` — LpStory への imageUrl prop を削除

## 2026-06-22 — ヒーロースライドショー実装

### 変更
- `app/layout.tsx` — Cormorant Garamond フォント追加・`@keyframes kenburns` 定義・スクロール連動ヘッダー透明化 CSS 追加
- `components/sections/LpHero.tsx` — 完全リライト
  - 3枚スライドショー（5秒ごと・クロスフェード 1.5秒）
  - 各スライドにケンバーンズ効果（CSS animation 20秒）
  - `data-hero` 属性でスクロール 80px 未満はヘッダー透明/白文字に切り替え（0.3秒 transition）
  - テキスト全体フェードイン（y:30→0、opacity:0→1、1.5秒）
  - 「Scroll ↓」バウンスアニメーション
- `app/page.tsx` — LpHero への imageUrl prop を削除（ローカル画像に移行）

## 2026-06-22 — トップページ LP リデザイン

### 追加
- `components/sections/LpHero.tsx` — ケンバーンズ全画面ヒーロー（framer-motion）
- `components/sections/LpProducts.tsx` — 商品ピックアップ3点（左右スライドイン）
- `components/sections/LpStory.tsx` — ブランドストーリー（深緑背景・左右フェードイン）
- `components/sections/LpValues.tsx` — 3つのこだわり（ステガードフェードアップ）
- `components/sections/LpCta.tsx` — CTA（ぼかし背景・白文字）
- `framer-motion` パッケージ追加

### 変更
- `app/page.tsx` — 旧セクション構成から新 LP 構成へ全面更新
  Supabase から取得した商品画像を Hero・Story・CTA 背景に使用

## 2026-06-22 — /products Runtime TypeError 修正

### 修正
- `app/products/page.tsx` — `CategoryFilter`（`useSearchParams()` 使用）を `<Suspense>` でラップ
- Next.js 16 + React 19 では `useSearchParams()` を使うクライアントコンポーネントは Suspense 境界が必須。未設定の場合 Performance API の負のタイムスタンプエラーが発生していた

## 2026-06-22 — 管理画面（Phase 2）実装

### 追加
- `proxy.ts` 管理画面の認証プロキシ（`/admin/*` をパスワードで保護）
- `app/admin/login/page.tsx` ログインページ
- `app/api/admin/login/route.ts` ログイン/ログアウト API
- `app/admin/layout.tsx` 管理画面共通レイアウト（サイドバー）
- `app/admin/page.tsx` ダッシュボード（商品数・注文数・最近の注文）
- `app/admin/products/page.tsx` 商品一覧（編集・削除）
- `app/admin/products/new/page.tsx` 商品追加フォーム
- `app/admin/products/[id]/edit/page.tsx` 商品編集フォーム
- `app/admin/orders/page.tsx` 注文一覧（ステータス変更）
- `app/admin/settings/page.tsx` サイト設定（配送料・お知らせ文等）
- `app/api/products/[id]/route.ts` 商品 GET・PUT・DELETE
- `app/api/orders/[id]/route.ts` 注文ステータス PATCH
- `app/api/settings/route.ts` サイト設定 GET・PUT
- `components/admin/` 管理画面用コンポーネント群

### 変更
- `app/api/products/route.ts` に POST（商品追加）と `?all=true` オプションを追加
- `.env.local` に `ADMIN_PASSWORD=teirak-admin` を追加（本番前に変更すること）

### 注意
- Stripe・Resend のキーはまだ未設定。`.env.local` に追加後、決済フローが動作する

## 2026-06-19 — SEO・AIO強化

### 追加
- `app/about/dyeing/page.tsx` 草木染めとは（軸1：工芸・素材）
- `app/about/thailand/page.tsx` タイとのつながり（軸2：社会的意義）
- `app/about/ethical/page.tsx` サステナビリティ方針（軸3：エコフレンドリー）
- `app/about/prengo/page.tsx` PRENGOとTeirak（軸4：APU・学生団体）
- `app/journal/page.tsx` ブランドジャーナル一覧
- `app/journal/[slug]/page.tsx` ジャーナル記事（Article JSON-LD付き）
- `data/journal.json` ジャーナル記事3本（草木染め・タイ・エコ）
- `app/sitemap.ts` 全ページ対応のサイトマップ自動生成
- `lib/schema.ts` Organization・Product・Article・WebSite スキーマ
- `app/layout.tsx` に Organization・WebSite JSON-LD を追加

### 変更
- `app/layout.tsx` メタデータを4軸キーワード対応に更新（タイトル・description・keywords・OGP）
- `next.config.ts` に Unsplash・Supabase Storage の画像ドメインを追加

### コンテンツ方針（記録）
- 「タイとの関係」「PRENGO情報」はAPU公式サイト・ユーザー確認のみに基づき記述
- 有機認証・ヴィーガン表記は確認できないため追加せず
- 「エシカル」表現は「エコフレンドリー」に留め、過大表現を避けた

## 2026-06-18 — Phase 1 初期実装

### 追加
- Next.js 16 プロジェクト初期化
- `lib/theme.ts` デザイン設定の一元管理
- `lib/config.ts` 数値設定の一元管理（配送料・送料無料ライン等）
- `content/site-copy.json` サイト文言の一元管理
- `content/categories.json` 商品カテゴリ定義
- `content/shipping-info.json` 配送情報
- `supabase-schema.sql` Supabaseテーブル定義（products・orders・site_settings）
- トップページ（HeroSection / FeaturedProducts / BrandStory / InstagramFeed のセクション構成）
- 商品一覧ページ（カテゴリフィルター付き）
- 商品詳細ページ（草木染め情報・在庫状況表示）
- カートページ（数量変更・削除・送料計算）
- チェックアウトページ（住所入力フォーム）
- 注文完了ページ
- Aboutページ
- カートサイドパネル（CartDrawer）
- Stripe Checkout セッション作成 API
- Stripe Webhook（注文確定・在庫減少・メール送信）
- Resend による注文確認メール

### 設定が必要なもの
- `.env.local` に各種キーを設定
- Supabase でスキーマを実行（supabase-schema.sql）
- Vercel にデプロイ後、Stripe Webhook エンドポイントを登録
