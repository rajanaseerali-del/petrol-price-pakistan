-- Supabase Schema for Petrol Price Pakistan
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Fuel Products Table
create table if not exists public.fuel_products (
  id text primary key, -- e.g. 'petrol', 'diesel', 'hi-octane', 'kerosene', 'lpg'
  display_name text not null,
  display_name_ur text,
  slug text not null unique,
  unit text not null default 'Litre',
  is_active boolean not null default true,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Verified Price Records Table
create table if not exists public.price_records (
  id uuid primary key default uuid_generate_v4(),
  product_id text not null references public.fuel_products(id) on delete cascade,
  price_paisa bigint not null, -- integer paisa representation (e.g. 39023 for 390.23 PKR) to eliminate rounding errors
  price_pkr numeric(10, 2) generated always as (price_paisa / 100.0) stored,
  currency text not null default 'PKR',
  effective_start timestamptz not null,
  effective_end timestamptz,
  source_publication_date timestamptz not null,
  verification_timestamp timestamptz not null default now(),
  source_url text not null,
  source_type text not null, -- 'OGRA_NOTIFIED', 'PETROLEUM_DIVISION_ANNOUNCEMENT', 'PSO_OFFICIAL', 'MANUAL_VERIFIED'
  extraction_method text not null, -- 'PORTAL_AUTOMATED', 'PRESS_RELEASE_AUTOMATED', 'ADMIN_MANUAL_ENTRY'
  verification_status text not null default 'APPROVED', -- 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'CONFLICT_FLAGGED'
  notification_identifier text, -- e.g. 'OGRA-NOTIF-OCT-16-2026'
  previous_price_paisa bigint,
  price_change_paisa bigint, -- can be positive (increase) or negative (decrease)
  notes text,
  created_at timestamptz not null default now()
);

-- Index for speedy queries on latest approved rates
create index if not exists idx_price_records_product_effective on public.price_records (product_id, effective_start desc, verification_status);
create index if not exists idx_price_records_status on public.price_records (verification_status);

-- 3. Source Check Logs Table
create table if not exists public.source_check_logs (
  id uuid primary key default uuid_generate_v4(),
  source_identifier text not null, -- 'OGRA', 'PETROLEUM_DIVISION', 'PSO'
  check_timestamp timestamptz not null default now(),
  is_success boolean not null,
  http_status int,
  response_time_ms int,
  records_discovered int not null default 0,
  records_ingested int not null default 0,
  error_details text,
  metadata jsonb
);

create index if not exists idx_source_check_logs_source_time on public.source_check_logs (source_identifier, check_timestamp desc);

-- 4. Admin Audit Logs Table
create table if not exists public.admin_audit_logs (
  id uuid primary key default uuid_generate_v4(),
  admin_user_id text not null,
  admin_email text,
  action text not null, -- 'CREATE_PRICE', 'EDIT_PRICE', 'APPROVE_RECORD', 'REJECT_RECORD', 'TRIGGER_SOURCE_CHECK'
  target_record_id uuid,
  target_table text not null default 'price_records',
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  user_agent text,
  timestamp timestamptz not null default now()
);

create index if not exists idx_admin_audit_logs_timestamp on public.admin_audit_logs (timestamp desc);

-- 5. Row Level Security (RLS) Policies
alter table public.fuel_products enable row level security;
alter table public.price_records enable row level security;
alter table public.source_check_logs enable row level security;
alter table public.admin_audit_logs enable row level security;

-- Public read permissions: Public users may ONLY read active products and APPROVED price records
create policy "Allow public read active products"
  on public.fuel_products for select
  using (is_active = true);

create policy "Allow public read approved price records"
  on public.price_records for select
  using (verification_status = 'APPROVED');

-- Admin / Service-Role permissions: Full access for service_role or authenticated administrators
create policy "Allow admin full access to fuel_products"
  on public.fuel_products for all
  using (auth.role() = 'service_role' or (auth.jwt() ->> 'role') = 'admin');

create policy "Allow admin full access to price_records"
  on public.price_records for all
  using (auth.role() = 'service_role' or (auth.jwt() ->> 'role') = 'admin');

create policy "Allow admin full access to source_check_logs"
  on public.source_check_logs for all
  using (auth.role() = 'service_role' or (auth.jwt() ->> 'role') = 'admin');

create policy "Allow admin full access to admin_audit_logs"
  on public.admin_audit_logs for all
  using (auth.role() = 'service_role' or (auth.jwt() ->> 'role') = 'admin');

-- 6. Initial Seed Data: Fuel Products
insert into public.fuel_products (id, display_name, display_name_ur, slug, unit, display_order)
values
  ('petrol', 'Petrol (Motor Spirit / Super)', 'پیٹرول', 'petrol-price-in-pakistan', 'Litre', 1),
  ('diesel', 'High-Speed Diesel (HSD)', 'ہائی اسپیڈ ڈیزل', 'diesel-price-in-pakistan', 'Litre', 2),
  ('hi-octane', 'Hi-Octane (RON 97)', 'ہائی اوکٹین', 'hi-octane-price-in-pakistan', 'Litre', 3),
  ('kerosene', 'Kerosene Oil (SKO)', 'مٹی کا تیل', 'kerosene-oil-price-in-pakistan', 'Litre', 4),
  ('ldo', 'Light Diesel Oil (LDO)', 'لائٹ ڈیزل آئل', 'light-diesel-oil-price-in-pakistan', 'Litre', 5),
  ('lpg', 'LPG (Liquefied Petroleum Gas)', 'ایل پی جی', 'lpg-price-in-pakistan', 'kg', 6)
on conflict (id) do nothing;
