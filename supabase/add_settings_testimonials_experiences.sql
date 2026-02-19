-- ============================================================
-- Migration: site_settings + testimonials + experiences
-- Also adds slug_ro to projects & articles for locale slugs
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ============================================================
-- SITE SETTINGS TABLE (key-value store for global settings)
-- ============================================================
create table if not exists site_settings (
  id           uuid primary key default uuid_generate_v4(),
  key          text unique not null,
  value        text not null default '',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger site_settings_updated_at
  before update on site_settings
  for each row execute function update_updated_at();

alter table site_settings enable row level security;

create policy "Public read site_settings" on site_settings
  for select using (true);

create policy "Auth insert site_settings" on site_settings
  for insert to authenticated with check (true);
create policy "Auth update site_settings" on site_settings
  for update to authenticated using (true) with check (true);
create policy "Auth delete site_settings" on site_settings
  for delete to authenticated using (true);

create index if not exists idx_site_settings_key on site_settings (key);

-- Seed default settings keys
insert into site_settings (key, value) values
  ('ga_measurement_id', ''),
  ('about_image', ''),
  ('expertise_image_development', ''),
  ('expertise_image_uiux', ''),
  ('expertise_image_branding', '')
on conflict (key) do nothing;

-- ============================================================
-- TESTIMONIALS TABLE
-- ============================================================
create table if not exists testimonials (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null default '',
  title       text not null default '',
  text_ro     text not null default '',
  text_en     text not null default '',
  avatar_url  text not null default '',
  link_url    text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger testimonials_updated_at
  before update on testimonials
  for each row execute function update_updated_at();

alter table testimonials enable row level security;

create policy "Public read testimonials" on testimonials
  for select using (true);

create policy "Auth insert testimonials" on testimonials
  for insert to authenticated with check (true);
create policy "Auth update testimonials" on testimonials
  for update to authenticated using (true) with check (true);
create policy "Auth delete testimonials" on testimonials
  for delete to authenticated using (true);

create index if not exists idx_testimonials_sort on testimonials (sort_order);

-- ============================================================
-- EXPERIENCES TABLE
-- ============================================================
create table if not exists experiences (
  id          uuid primary key default uuid_generate_v4(),
  role_en     text not null default '',
  role_ro     text not null default '',
  company     text not null default '',
  logo_url    text not null default '',
  color       text not null default '#a3e635',
  period_en   text not null default '',
  period_ro   text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger experiences_updated_at
  before update on experiences
  for each row execute function update_updated_at();

alter table experiences enable row level security;

create policy "Public read experiences" on experiences
  for select using (true);

create policy "Auth insert experiences" on experiences
  for insert to authenticated with check (true);
create policy "Auth update experiences" on experiences
  for update to authenticated using (true) with check (true);
create policy "Auth delete experiences" on experiences
  for delete to authenticated using (true);

create index if not exists idx_experiences_sort on experiences (sort_order);

-- ============================================================
-- ADD LOCALE-SPECIFIC SLUGS TO PROJECTS & ARTICLES
-- ============================================================
alter table projects add column if not exists slug_ro text not null default '';
alter table projects add column if not exists slug_en text not null default '';

alter table articles add column if not exists slug_ro text not null default '';
alter table articles add column if not exists slug_en text not null default '';

-- Copy existing slug to slug_en and slug_ro as defaults
update projects set slug_en = slug, slug_ro = slug where slug_en = '' or slug_ro = '';
update articles set slug_en = slug, slug_ro = slug where slug_en = '' or slug_ro = '';

create index if not exists idx_projects_slug_ro on projects (slug_ro);
create index if not exists idx_projects_slug_en on projects (slug_en);
create index if not exists idx_articles_slug_ro on articles (slug_ro);
create index if not exists idx_articles_slug_en on articles (slug_en);
