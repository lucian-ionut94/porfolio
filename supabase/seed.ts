/**
 * Seed script — migrates static data + translations to Supabase.
 *
 * Usage:
 *   npx tsx supabase/seed.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// ----- Load env from .env.local -----
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  env[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ----- Load static data -----
// We can't use TS path aliases here, so import from relative paths.
// Using dynamic import for ESM/CJS compatibility.

async function main() {
  console.log("Seeding Supabase database...\n");

  // ===== PROJECTS =====
  console.log("--- Seeding projects ---");

  // Import the projects data
  const projectsMod = await import("../src/data/projects");
  const projects = projectsMod.projects;

  const projectRows = projects.map((p: any, i: number) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    category_en: p.category_en,
    category_ro: p.category_ro,
    description_en: p.description_en,
    description_ro: p.description_ro,
    challenge_en: p.challenge_en,
    challenge_ro: p.challenge_ro,
    solution_en: p.solution_en,
    solution_ro: p.solution_ro,
    results_en: p.results_en,
    results_ro: p.results_ro,
    tech: p.tech,
    year: p.year,
    bg_color: p.bgColor,
    letter: p.letter,
    letter_color: p.letterColor,
    accent_color: p.accentColor,
    live_url: p.liveUrl ?? null,
    source_url: p.sourceUrl ?? null,
    features_en: p.features_en,
    features_ro: p.features_ro,
    video_desktop: p.videoDesktop,
    video_mobile: p.videoMobile,
    highlights: p.highlights,
    sort_order: i,
  }));

  const { error: pErr } = await supabase
    .from("projects")
    .upsert(projectRows, { onConflict: "slug" });

  if (pErr) {
    console.error("Projects error:", pErr.message);
  } else {
    console.log(`  Upserted ${projectRows.length} projects`);
  }

  // ===== ARTICLES =====
  console.log("--- Seeding articles ---");

  const articlesMod = await import("../src/data/articles");
  const articles = articlesMod.articles;

  const articleRows = articles.map((a: any, i: number) => ({
    slug: a.slug,
    title_en: a.title_en,
    title_ro: a.title_ro,
    excerpt_en: a.excerpt_en,
    excerpt_ro: a.excerpt_ro,
    body_en: a.body_en,
    body_ro: a.body_ro,
    category: a.category,
    category_en: a.category_en,
    category_ro: a.category_ro,
    date: a.date,
    read_time: a.readTime,
    accent: a.accent,
    bg_from: a.bgFrom,
    bg_to: a.bgTo,
    icon: a.icon,
    sort_order: i,
  }));

  const { error: aErr } = await supabase
    .from("articles")
    .upsert(articleRows, { onConflict: "slug" });

  if (aErr) {
    console.error("Articles error:", aErr.message);
  } else {
    console.log(`  Upserted ${articleRows.length} articles`);
  }

  // ===== TRANSLATIONS =====
  console.log("--- Seeding translations ---");

  const enJson = JSON.parse(
    readFileSync(resolve(__dirname, "../messages/en.json"), "utf-8")
  );
  const roJson = JSON.parse(
    readFileSync(resolve(__dirname, "../messages/ro.json"), "utf-8")
  );

  // Flatten nested JSON to dot-notation
  function flatten(
    obj: Record<string, any>,
    prefix = ""
  ): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        Object.assign(result, flatten(value, fullKey));
      } else {
        // Store arrays as JSON strings, primitives as strings
        result[fullKey] = Array.isArray(value)
          ? JSON.stringify(value)
          : String(value);
      }
    }
    return result;
  }

  const enFlat = flatten(enJson);
  const roFlat = flatten(roJson);

  // Build translation rows — namespace is the top-level key, key is the rest
  const allKeys = new Set([...Object.keys(enFlat), ...Object.keys(roFlat)]);
  const translationRows: {
    namespace: string;
    key: string;
    value_en: string;
    value_ro: string;
  }[] = [];

  for (const fullKey of allKeys) {
    const dotIdx = fullKey.indexOf(".");
    const namespace = dotIdx === -1 ? fullKey : fullKey.slice(0, dotIdx);
    const key = dotIdx === -1 ? "" : fullKey.slice(dotIdx + 1);

    translationRows.push({
      namespace,
      key: key || "_root",
      value_en: enFlat[fullKey] ?? "",
      value_ro: roFlat[fullKey] ?? "",
    });
  }

  // Upsert in batches of 50
  const BATCH = 50;
  let inserted = 0;
  for (let i = 0; i < translationRows.length; i += BATCH) {
    const batch = translationRows.slice(i, i + BATCH);
    const { error: tErr } = await supabase
      .from("translations")
      .upsert(batch, { onConflict: "namespace,key" });

    if (tErr) {
      console.error(`  Translations batch error (${i}):`, tErr.message);
    } else {
      inserted += batch.length;
    }
  }

  console.log(`  Upserted ${inserted} translation keys`);
  console.log(`\nDone! Total translations: ${translationRows.length}`);
}

main().catch(console.error);
