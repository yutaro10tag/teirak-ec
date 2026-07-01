# Teirak 開発用URL一覧

## ローカル環境での起動方法
```bash
cd ~/teirak-ec
npm run dev
```

## URL一覧

| ページ | URL | 説明 |
|---|---|---|
| LP（トップページ） | http://localhost:3001 | ブランドページ・商品への導線 |
| EC（商品一覧） | http://localhost:3001/products | 商品一覧・購入フロー |
| 商品詳細 | http://localhost:3001/products/[id] | 個別商品ページ |
| カート | http://localhost:3001/cart | カート画面 |
| 管理者画面ログイン | http://localhost:3001/admin/login | 管理者のみ |
| 管理者ダッシュボード | http://localhost:3001/admin | 売上・統計 |
| 商品管理 | http://localhost:3001/admin/products | 商品追加・編集・削除 |
| 注文管理 | http://localhost:3001/admin/orders | 注文一覧・発送管理 |
| サイト設定 | http://localhost:3001/admin/settings | 配送料・お知らせ |

## 管理者ログイン情報
パスワード：.env.localのADMIN_PASSWORDを参照

## デプロイ後のURL（本番環境）
デプロイ完了後にここを更新する
