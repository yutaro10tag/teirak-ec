-- ============================================================
-- Migration 001: products テーブルに新フィールドを追加
-- Supabase SQL Editor で実行してください
-- ============================================================

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS is_sale          boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sale_price       integer     DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS notify_email_list text[]     NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS view_count       integer     NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS sizes            text[]      DEFAULT NULL;

-- view_count のインデックス（人気商品ランキング等で使用）
CREATE INDEX IF NOT EXISTS idx_products_view_count ON products (view_count DESC);

-- view_count インクリメント関数（/api/products/[id]/view から呼び出す）
CREATE OR REPLACE FUNCTION increment_view_count(product_id uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE products SET view_count = view_count + 1 WHERE id = product_id;
END;
$$;
