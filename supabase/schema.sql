-- ============================================================
-- Portfolio CMS Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  category text not null, -- 'wordpress' | 'react' | 'laravel' | 'opencart'
  category_en text not null,
  category_ro text not null,
  description_en text not null default '',
  description_ro text not null default '',
  challenge_en text not null default '',
  challenge_ro text not null default '',
  solution_en text not null default '',
  solution_ro text not null default '',
  results_en text not null default '',
  results_ro text not null default '',
  tech text[] not null default '{}',
  year text not null,
  bg_color text not null default '',
  letter text not null default '',
  letter_color text not null default '',
  accent_color text not null default '',
  live_url text,
  source_url text,
  features_en text[] not null default '{}',
  features_ro text[] not null default '{}',
  feature_image text not null default '',
  video_desktop text not null default '',
  video_mobile text not null default '',
  highlights jsonb not null default '[]',
  meta_title_en text,
  meta_title_ro text,
  meta_desc_en  text,
  meta_desc_ro  text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- ARTICLES TABLE
-- ============================================================
create table if not exists articles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title_en text not null,
  title_ro text not null,
  excerpt_en text not null default '',
  excerpt_ro text not null default '',
  body_en text[] not null default '{}',
  body_ro text[] not null default '{}',
  category text not null, -- 'development' | 'design' | 'performance'
  category_en text not null,
  category_ro text not null,
  date text not null,
  read_time int not null default 5,
  accent text not null default '',
  bg_from text not null default '',
  bg_to text not null default '',
  icon text not null default 'code', -- 'code' | 'design' | 'gauge'
  feature_image text not null default '',
  ad_image text not null default '',
  ad_link text not null default '',
  meta_title_en text,
  meta_title_ro text,
  meta_desc_en  text,
  meta_desc_ro  text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- TRANSLATIONS TABLE
-- ============================================================
create table if not exists translations (
  id uuid primary key default uuid_generate_v4(),
  namespace text not null,
  key text not null,
  value_en text not null default '',
  value_ro text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (namespace, key)
);

-- ============================================================
-- PAGE SEO TABLE
-- ============================================================
create table if not exists page_seo (
  id            uuid primary key default uuid_generate_v4(),
  page_key      text unique not null,
  meta_title_en text not null default '',
  meta_title_ro text not null default '',
  meta_desc_en  text not null default '',
  meta_desc_ro  text not null default '',
  og_image      text not null default '',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply triggers
create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

create trigger articles_updated_at
  before update on articles
  for each row execute function update_updated_at();

create trigger translations_updated_at
  before update on translations
  for each row execute function update_updated_at();

create trigger page_seo_updated_at
  before update on page_seo
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS
alter table projects enable row level security;
alter table articles enable row level security;
alter table translations enable row level security;
alter table page_seo enable row level security;

-- Public read access
create policy "Public read projects" on projects
  for select using (true);

create policy "Public read articles" on articles
  for select using (true);

create policy "Public read translations" on translations
  for select using (true);

-- Authenticated write access
create policy "Auth insert projects" on projects
  for insert to authenticated with check (true);
create policy "Auth update projects" on projects
  for update to authenticated using (true) with check (true);
create policy "Auth delete projects" on projects
  for delete to authenticated using (true);

create policy "Auth insert articles" on articles
  for insert to authenticated with check (true);
create policy "Auth update articles" on articles
  for update to authenticated using (true) with check (true);
create policy "Auth delete articles" on articles
  for delete to authenticated using (true);

create policy "Auth insert translations" on translations
  for insert to authenticated with check (true);
create policy "Auth update translations" on translations
  for update to authenticated using (true) with check (true);
create policy "Auth delete translations" on translations
  for delete to authenticated using (true);

create policy "Public read page_seo" on page_seo
  for select using (true);

create policy "Auth insert page_seo" on page_seo
  for insert to authenticated with check (true);
create policy "Auth update page_seo" on page_seo
  for update to authenticated using (true) with check (true);
create policy "Auth delete page_seo" on page_seo
  for delete to authenticated using (true);

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_projects_slug on projects (slug);
create index if not exists idx_projects_sort on projects (sort_order);
create index if not exists idx_articles_slug on articles (slug);
create index if not exists idx_articles_sort on articles (sort_order);
create index if not exists idx_translations_namespace on translations (namespace);
create index if not exists idx_translations_ns_key on translations (namespace, key);
create index if not exists idx_page_seo_key on page_seo (page_key);
