import { createClient } from "@supabase/supabase-js";
import type { Project, ProjectHighlight, FilterKey } from "@/data/projects";
import type { DbProject } from "@/types/database";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Map a DB row (snake_case) to the existing Project interface (camelCase). */
function mapProject(row: DbProject): Project {
  return {
    id: row.id,
    slug: row.slug,
    slugEn: row.slug_en || undefined,
    slugRo: row.slug_ro || undefined,
    title: row.title,
    category: row.category as FilterKey,
    category_en: row.category_en,
    category_ro: row.category_ro,
    description_en: row.description_en,
    description_ro: row.description_ro,
    challenge_en: row.challenge_en,
    challenge_ro: row.challenge_ro,
    solution_en: row.solution_en,
    solution_ro: row.solution_ro,
    results_en: row.results_en,
    results_ro: row.results_ro,
    tech: row.tech,
    year: row.year,
    bgColor: row.bg_color,
    letter: row.letter,
    letterColor: row.letter_color,
    accentColor: row.accent_color,
    liveUrl: row.live_url ?? undefined,
    sourceUrl: row.source_url ?? undefined,
    features_en: row.features_en,
    features_ro: row.features_ro,
    featureImage: row.feature_image || undefined,
    videoDesktop: row.video_desktop,
    videoMobile: row.video_mobile,
    highlights: row.highlights as ProjectHighlight[],
    metaTitleEn: row.meta_title_en ?? undefined,
    metaTitleRo: row.meta_title_ro ?? undefined,
    metaDescEn: row.meta_desc_en ?? undefined,
    metaDescRo: row.meta_desc_ro ?? undefined,
  };
}

// ---- Fallback to static data ----
async function getStaticProjects() {
  const { projects } = await import("@/data/projects");
  return projects;
}

export async function getAllProjects(): Promise<Project[]> {
  const sb = getSupabase();
  if (!sb) return getStaticProjects();

  try {
    const { data, error } = await sb
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return getStaticProjects();
    return data.map(mapProject);
  } catch {
    return getStaticProjects();
  }
}

/** Look up a project by its locale-specific slug (slug_ro / slug_en) or the canonical slug. */
export async function getProjectBySlug(slug: string, locale?: string): Promise<Project | undefined> {
  const sb = getSupabase();
  if (!sb) {
    const { getProjectBySlug: staticGet } = await import("@/data/projects");
    return staticGet(slug);
  }

  try {
    const slugCol = locale === "ro" ? "slug_ro" : locale === "en" ? "slug_en" : "slug";

    let { data, error } = await sb
      .from("projects")
      .select("*")
      .eq(slugCol, slug)
      .maybeSingle();

    if (!data && slugCol !== "slug") {
      ({ data, error } = await sb
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle());
    }

    if (error || !data) {
      const { getProjectBySlug: staticGet } = await import("@/data/projects");
      return staticGet(slug);
    }
    return mapProject(data);
  } catch {
    const { getProjectBySlug: staticGet } = await import("@/data/projects");
    return staticGet(slug);
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) {
    const { getAllSlugs } = await import("@/data/projects");
    return getAllSlugs();
  }

  try {
    const { data, error } = await sb
      .from("projects")
      .select("slug")
      .order("sort_order", { ascending: true });

    if (error || !data) {
      const { getAllSlugs } = await import("@/data/projects");
      return getAllSlugs();
    }
    return data.map((r) => r.slug);
  } catch {
    const { getAllSlugs } = await import("@/data/projects");
    return getAllSlugs();
  }
}

/** Return locale-specific slugs for static params generation. */
export async function getAllProjectSlugsForLocale(locale: string): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) {
    const { getAllSlugs } = await import("@/data/projects");
    return getAllSlugs();
  }

  try {
    const slugCol = locale === "ro" ? "slug_ro" : "slug_en";
    const { data, error } = await sb
      .from("projects")
      .select(`slug, ${slugCol}`)
      .order("sort_order", { ascending: true });

    if (error || !data) {
      const { getAllSlugs } = await import("@/data/projects");
      return getAllSlugs();
    }
    return data.map((r) => (r as Record<string, string>)[slugCol] || r.slug);
  } catch {
    const { getAllSlugs } = await import("@/data/projects");
    return getAllSlugs();
  }
}

export async function getAdjacentProjects(
  slug: string
): Promise<{ prev: Project | null; next: Project | null }> {
  const all = await getAllProjects();
  const index = all.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}
