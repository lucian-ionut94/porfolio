import { createClient } from "@supabase/supabase-js";
import type { Article, ArticleIcon, CategoryKey } from "@/data/articles";
import type { DbArticle } from "@/types/database";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Map a DB row (snake_case) to the existing Article interface (camelCase). */
function mapArticle(row: DbArticle): Article {
  return {
    id: row.id,
    slug: row.slug,
    slugEn: row.slug_en || undefined,
    slugRo: row.slug_ro || undefined,
    title_en: row.title_en,
    title_ro: row.title_ro,
    excerpt_en: row.excerpt_en,
    excerpt_ro: row.excerpt_ro,
    body_en: row.body_en,
    body_ro: row.body_ro,
    category: row.category as Exclude<CategoryKey, "all">,
    category_en: row.category_en,
    category_ro: row.category_ro,
    date: row.date,
    readTime: row.read_time,
    accent: row.accent,
    bgFrom: row.bg_from,
    bgTo: row.bg_to,
    icon: row.icon as ArticleIcon,
    featureImage: row.feature_image || undefined,
    adImage: row.ad_image || undefined,
    adLink: row.ad_link || undefined,
    metaTitleEn: row.meta_title_en ?? undefined,
    metaTitleRo: row.meta_title_ro ?? undefined,
    metaDescEn: row.meta_desc_en ?? undefined,
    metaDescRo: row.meta_desc_ro ?? undefined,
  };
}

async function getStaticArticles() {
  const { articles } = await import("@/data/articles");
  return articles;
}

export async function getAllArticles(): Promise<Article[]> {
  const sb = getSupabase();
  if (!sb) return getStaticArticles();

  try {
    const { data, error } = await sb
      .from("articles")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return getStaticArticles();
    return data.map(mapArticle);
  } catch {
    return getStaticArticles();
  }
}

/** Look up an article by its locale-specific slug (slug_ro / slug_en) or the canonical slug. */
export async function getArticleBySlug(slug: string, locale?: string): Promise<Article | undefined> {
  const sb = getSupabase();
  if (!sb) {
    const { getArticleBySlug: staticGet } = await import("@/data/articles");
    return staticGet(slug);
  }

  try {
    const slugCol = locale === "ro" ? "slug_ro" : locale === "en" ? "slug_en" : "slug";

    // Try locale-specific slug column first, then fall back to canonical slug
    let { data, error } = await sb
      .from("articles")
      .select("*")
      .eq(slugCol, slug)
      .maybeSingle();

    if (!data && slugCol !== "slug") {
      // Fall back to canonical slug
      ({ data, error } = await sb
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .maybeSingle());
    }

    if (error || !data) {
      const { getArticleBySlug: staticGet } = await import("@/data/articles");
      return staticGet(slug);
    }
    return mapArticle(data);
  } catch {
    const { getArticleBySlug: staticGet } = await import("@/data/articles");
    return staticGet(slug);
  }
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) {
    const { getAllSlugs } = await import("@/data/articles");
    return getAllSlugs();
  }

  try {
    const { data, error } = await sb
      .from("articles")
      .select("slug")
      .order("sort_order", { ascending: true });

    if (error || !data) {
      const { getAllSlugs } = await import("@/data/articles");
      return getAllSlugs();
    }
    return data.map((r) => r.slug);
  } catch {
    const { getAllSlugs } = await import("@/data/articles");
    return getAllSlugs();
  }
}

/** Return locale-specific slugs for static params generation. */
export async function getAllArticleSlugsForLocale(locale: string): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) {
    const { getAllSlugs } = await import("@/data/articles");
    return getAllSlugs();
  }

  try {
    const slugCol = locale === "ro" ? "slug_ro" : "slug_en";
    const { data, error } = await sb
      .from("articles")
      .select(`slug, ${slugCol}`)
      .order("sort_order", { ascending: true });

    if (error || !data) {
      const { getAllSlugs } = await import("@/data/articles");
      return getAllSlugs();
    }
    // Use locale slug if set, otherwise fall back to canonical slug
    return data.map((r) => (r as Record<string, string>)[slugCol] || r.slug);
  } catch {
    const { getAllSlugs } = await import("@/data/articles");
    return getAllSlugs();
  }
}
