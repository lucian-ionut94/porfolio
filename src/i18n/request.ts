import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { createClient } from "@supabase/supabase-js";

/**
 * Fetch all translations from Supabase and rebuild nested messages object.
 */
async function getTranslationsFromDb(
  locale: string
): Promise<Record<string, any> | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const supabase = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabase
      .from("translations")
      .select("namespace, key, value_en, value_ro");

    if (error || !data || data.length === 0) return null;

    // Rebuild nested object from flat (namespace, dotted-key) rows
    const messages: Record<string, any> = {};

    for (const row of data) {
      const value = locale === "en" ? row.value_en : row.value_ro;
      const fullKey =
        row.key === "_root" ? row.namespace : `${row.namespace}.${row.key}`;

      // Set nested value
      const parts = fullKey.split(".");
      let current = messages;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!(parts[i] in current) || typeof current[parts[i]] !== "object") {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }

      // Try to parse JSON arrays back
      const lastKey = parts[parts.length - 1];
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          current[lastKey] = parsed;
          continue;
        }
      } catch {
        // Not JSON, store as string
      }
      current[lastKey] = value;
    }

    return messages;
  } catch {
    return null;
  }
}

function deepMerge(
  base: Record<string, any>,
  override: Record<string, any>
): Record<string, any> {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (
      typeof override[key] === "object" &&
      override[key] !== null &&
      !Array.isArray(override[key]) &&
      typeof base[key] === "object" &&
      base[key] !== null &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as "ro" | "en")) {
    locale = routing.defaultLocale;
  }

  // Always load JSON as base, then override with Supabase values
  const jsonMessages = (await import(`../../messages/${locale}.json`)).default;
  const dbMessages = await getTranslationsFromDb(locale);
  const messages = dbMessages ? deepMerge(jsonMessages, dbMessages) : jsonMessages;

  return {
    locale,
    messages,
  };
});
