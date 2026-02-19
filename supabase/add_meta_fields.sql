-- ============================================================
-- Migration: Add SEO meta fields
-- Run this in the Supabase SQL Editor on existing databases
-- ============================================================

-- Add meta fields to projects table
alter table projects
  add column if not exists meta_title_en  text,
  add column if not exists meta_title_ro  text,
  add column if not exists meta_desc_en   text,
  add column if not exists meta_desc_ro   text;

-- Add meta fields to articles table
alter table articles
  add column if not exists meta_title_en  text,
  add column if not exists meta_title_ro  text,
  add column if not exists meta_desc_en   text,
  add column if not exists meta_desc_ro   text;

-- ============================================================
-- PAGE SEO TABLE
-- Stores custom meta title/description for static pages
-- page_key: 'home' | 'about' | 'portfolio' | 'blog' | 'contact'
-- ============================================================
create table if not exists page_seo (
  id          uuid primary key default uuid_generate_v4(),
  page_key    text unique not null,
  meta_title_en  text not null default '',
  meta_title_ro  text not null default '',
  meta_desc_en   text not null default '',
  meta_desc_ro   text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Trigger for updated_at
create trigger page_seo_updated_at
  before update on page_seo
  for each row execute function update_updated_at();

-- RLS
alter table page_seo enable row level security;

create policy "Public read page_seo" on page_seo
  for select using (true);

create policy "Auth insert page_seo" on page_seo
  for insert to authenticated with check (true);
create policy "Auth update page_seo" on page_seo
  for update to authenticated using (true) with check (true);
create policy "Auth delete page_seo" on page_seo
  for delete to authenticated using (true);

-- Index
create index if not exists idx_page_seo_key on page_seo (page_key);

-- ============================================================
-- Migration: Add og_image to page_seo
-- ============================================================
alter table page_seo
  add column if not exists og_image text not null default '';

-- Seed default rows (insert + ignore if already exists)
insert into page_seo (page_key, meta_title_en, meta_title_ro, meta_desc_en, meta_desc_ro)
values
  ('home',      '', '', '', ''),
  ('about',     '', '', '', ''),
  ('portfolio', '', '', '', ''),
  ('blog',      '', '', '', ''),
  ('contact',   '', '', '', '')
on conflict (page_key) do nothing;
