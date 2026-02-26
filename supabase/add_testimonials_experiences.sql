-- Run this in Supabase SQL Editor
-- Creates testimonials + experiences tables (skips site_settings which already exists)

-- TESTIMONIALS TABLE
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

create policy "Public read testimonials" on testimonials for select using (true);
create policy "Auth insert testimonials" on testimonials for insert to authenticated with check (true);
create policy "Auth update testimonials" on testimonials for update to authenticated using (true) with check (true);
create policy "Auth delete testimonials" on testimonials for delete to authenticated using (true);

create index if not exists idx_testimonials_sort on testimonials (sort_order);

-- EXPERIENCES TABLE
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

create policy "Public read experiences" on experiences for select using (true);
create policy "Auth insert experiences" on experiences for insert to authenticated with check (true);
create policy "Auth update experiences" on experiences for update to authenticated using (true) with check (true);
create policy "Auth delete experiences" on experiences for delete to authenticated using (true);

create index if not exists idx_experiences_sort on experiences (sort_order);

-- SLUG COLUMNS on projects & articles (safe if already exist)
alter table projects add column if not exists slug_ro text not null default '';
alter table projects add column if not exists slug_en text not null default '';
alter table articles add column if not exists slug_ro text not null default '';
alter table articles add column if not exists slug_en text not null default '';

update projects set slug_en = slug, slug_ro = slug where slug_en = '' or slug_ro = '';
update articles set slug_en = slug, slug_ro = slug where slug_en = '' or slug_ro = '';
