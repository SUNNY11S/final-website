-- Green Page BD: products, admin allow-list, order storage, RLS, and image bucket.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.admin_users au where au.user_id = (select auth.uid()));
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.products (
  id text primary key, name text not null,
  category text not null check (category in ('indoor-packages', 'stand-packages')),
  category_label text not null default '', price integer not null check (price >= 0),
  original_price integer check (original_price is null or original_price >= 0),
  badge text, short_desc text not null default '', features text[] not null default '{}',
  plants_included text[] not null default '{}',
  care_level text not null default 'Easy' check (care_level in ('Easy', 'Beginner', 'Moderate')),
  light_requirement text not null default '', watering text not null default '',
  image_url text not null default '', ideal_for text not null default '',
  is_active boolean not null default true, created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(), order_code text not null unique,
  customer_name text not null, customer_phone text not null, delivery_address text not null,
  delivery_zone text not null check (delivery_zone in ('dhaka', 'outside-dhaka')),
  payment_method text not null check (payment_method in ('cod', 'bkash')),
  items jsonb not null, subtotal integer not null check (subtotal >= 0),
  delivery_fee integer not null check (delivery_fee >= 0), total integer not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "admins can read own admin record" on public.admin_users;
create policy "admins can read own admin record" on public.admin_users for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "public can read active products" on public.products;
drop policy if exists "public can read product catalog" on public.products;
create policy "public can read product catalog" on public.products for select to anon, authenticated using (true);
drop policy if exists "admins can insert products" on public.products;
create policy "admins can insert products" on public.products for insert to authenticated with check ((select public.is_admin()));
drop policy if exists "admins can update products" on public.products;
create policy "admins can update products" on public.products for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "admins can delete products" on public.products;
create policy "admins can delete products" on public.products for delete to authenticated using ((select public.is_admin()));

drop policy if exists "visitors can submit pending orders" on public.orders;
create policy "visitors can submit pending orders" on public.orders for insert to anon, authenticated with check (
  status = 'pending' and length(trim(customer_name)) between 2 and 120
  and length(trim(customer_phone)) between 6 and 30
  and length(trim(delivery_address)) between 5 and 1000
  and jsonb_typeof(items) = 'array' and jsonb_array_length(items) > 0
);
drop policy if exists "admins can read orders" on public.orders;
create policy "admins can read orders" on public.orders for select to authenticated using ((select public.is_admin()));
drop policy if exists "admins can update orders" on public.orders;
create policy "admins can update orders" on public.orders for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;
drop policy if exists "public can view product images" on storage.objects;
create policy "public can view product images" on storage.objects for select to anon, authenticated using (bucket_id = 'product-images');
drop policy if exists "admins can upload product images" on storage.objects;
create policy "admins can upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and (select public.is_admin()));
drop policy if exists "admins can update product images" on storage.objects;
create policy "admins can update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and (select public.is_admin())) with check (bucket_id = 'product-images' and (select public.is_admin()));
drop policy if exists "admins can delete product images" on storage.objects;
create policy "admins can delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and (select public.is_admin()));

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = ''
as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products for each row execute function public.set_updated_at();
drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at before update on public.orders for each row execute function public.set_updated_at();
