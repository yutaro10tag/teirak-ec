-- Teirak EC サイト Supabase スキーマ
-- Supabase の SQL Editor でこのファイル全体を実行してください

-- 商品テーブル
create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text not null default '',
  price         integer not null,
  stock         integer not null default 0,
  is_one_of_a_kind boolean not null default false,
  images        text[] not null default '{}',
  category      text not null default 'other',
  dye_material  text not null default '',
  status        text not null default 'draft' check (status in ('published', 'draft', 'sold_out')),
  created_at    timestamptz not null default now()
);

-- 注文テーブル
create table if not exists orders (
  id                uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  customer_name     text not null,
  customer_email    text not null,
  customer_address  text not null,
  items             jsonb not null default '[]',
  total             integer not null,
  status            text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'delivered')),
  created_at        timestamptz not null default now()
);

-- サイト設定テーブル（管理画面から編集可能な設定値）
create table if not exists site_settings (
  key         text primary key,
  value       text not null,
  updated_at  timestamptz not null default now()
);

-- デフォルト設定値を挿入
insert into site_settings (key, value) values
  ('shipping_fee', '500'),
  ('free_shipping_threshold', '8000'),
  ('announcement_text', ''),
  ('is_shop_open', 'true')
on conflict (key) do nothing;

-- Row Level Security（RLS）設定
alter table products enable row level security;
alter table orders enable row level security;
alter table site_settings enable row level security;

-- 商品の公開ポリシー：published の商品は誰でも読める
create policy "published products are viewable by all"
  on products for select
  using (status = 'published');

-- 注文：サービスロールキーのみ操作可能（フロントからは直接触らない）
-- orders の insert は API Route 経由（service role）で行う

-- 在庫を安全に減らすストアドプロシージャ（同時購入の競合防止）
create or replace function decrement_stock(product_id uuid, quantity integer)
returns void
language plpgsql
security definer
as $$
begin
  update products
  set
    stock = stock - quantity,
    status = case
      when (stock - quantity) <= 0 then 'sold_out'
      else status
    end
  where id = product_id
    and stock >= quantity;

  if not found then
    raise exception 'insufficient_stock';
  end if;
end;
$$;

-- サンプル商品データ（動作確認用）
insert into products (name, description, price, stock, is_one_of_a_kind, images, category, dye_material, status)
values
  (
    '藍染めシルクスカーフ',
    '徳島産の天然藍で染めたシルク100%のスカーフ。深い藍色の濃淡が独特の表情を生み出しています。',
    12000,
    1,
    true,
    ARRAY['https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800'],
    'scarf',
    '藍',
    'published'
  ),
  (
    '茜染めウールストール',
    '茜草の根から採れた染料で染めたウールのストール。温かみのある赤橙色が特徴。',
    18000,
    1,
    true,
    ARRAY['https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=800'],
    'stole',
    '茜',
    'published'
  ),
  (
    '栗染めコットントートバッグ',
    '栗のいがで染めたコットン地のトートバッグ。使うほどに味が出ます。',
    6500,
    3,
    false,
    ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
    'tote',
    '栗',
    'published'
  );
