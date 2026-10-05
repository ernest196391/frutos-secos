create table if not exists public.colo_product_overrides (
 product_id bigint primary key,
 name text not null,
 description text not null default '',
 category text not null,
 price numeric check(price is null or price > 0),
 stock integer not null default 10 check(stock >= 0),
 image text not null,
 active boolean not null default true,
 updated_at timestamptz not null default now()
);
alter table public.colo_product_overrides enable row level security;
grant select on public.colo_product_overrides to anon, authenticated;
grant insert, update on public.colo_product_overrides to authenticated;
create policy catalog_public_read on public.colo_product_overrides for select to anon, authenticated using (true);
create policy catalog_admin_insert on public.colo_product_overrides for insert to authenticated with check ((select public.colo_is_admin()));
create policy catalog_admin_update on public.colo_product_overrides for update to authenticated using ((select public.colo_is_admin())) with check ((select public.colo_is_admin()));
