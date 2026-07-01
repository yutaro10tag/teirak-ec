# Teirak EC サイト — 設計書

## 変更容易性の原則（最重要）

変更を加えるときは必ず以下のルールを守ること。

| 変更したいもの | 編集するファイル |
|---|---|
| 色・フォント・角丸 | `lib/theme.ts` |
| 配送料・送料無料ライン | `lib/config.ts` |
| ページの文言・コピー | `content/site-copy.json` |
| 商品カテゴリ | `content/categories.json` |
| 配送の説明文 | `content/shipping-info.json` |
| 商品データ | Supabase の products テーブル |
| トップページのセクション順序 | `app/page.tsx`（コンポーネントを並び替えるだけ） |

**コンポーネントのコードに色のHEX値や文言を直接書かない。**

## 変更後は CHANGELOG.md に記録する

```markdown
## YYYY-MM-DD
- 変更した内容を箇条書きで記録
```

## 技術スタック

- Next.js 16 App Router + TypeScript + Tailwind CSS v4
- Supabase（DB・Storage）、Stripe（決済）、Resend（メール）
- Vercel でホスティング

## ディレクトリ

```
lib/theme.ts         ← デザイン設定（色・フォント）
lib/config.ts        ← 数値設定（配送料等）
content/             ← 文言・カテゴリ（JSON）
components/sections/ ← トップページセクション（差し替え可能）
supabase-schema.sql  ← Supabase スキーマ（初回のみ実行）
```

## Supabase セットアップ

1. Supabase プロジェクト作成
2. SQL Editor で `supabase-schema.sql` を実行
3. `.env.local` に URL・キーを設定

## Stripe セットアップ

1. Stripe ダッシュボードで商品・価格を設定
2. `.env.local` に Secret Key・Publishable Key を設定
3. Webhook エンドポイント: `https://your-domain.vercel.app/api/stripe/webhook`
4. Webhook シークレットを `.env.local` の `STRIPE_WEBHOOK_SECRET` に設定

## 在庫管理の注意

1点ものの同時購入競合は `decrement_stock` ストアドプロシージャで防止。
直接 `stock` を更新しないこと。
