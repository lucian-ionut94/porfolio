import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export interface SiteSettings {
  ga_measurement_id: string;
  about_image: string;
  expertise_image_development: string;
  expertise_image_uiux: string;
  expertise_image_branding: string;
}

const defaultSettings: SiteSettings = {
  ga_measurement_id: "",
  about_image: "",
  expertise_image_development: "",
  expertise_image_uiux: "",
  expertise_image_branding: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const sb = getSupabase();
  if (!sb) return defaultSettings;

  try {
    const { data, error } = await sb.from("site_settings").select("key, value");
    if (error || !data) return defaultSettings;

    const settings: Record<string, string> = {};
    data.forEach((row: { key: string; value: string }) => {
      settings[row.key] = row.value;
    });

    return {
      ga_measurement_id: settings.ga_measurement_id ?? "",
      about_image: settings.about_image ?? "",
      expertise_image_development: settings.expertise_image_development ?? "",
      expertise_image_uiux: settings.expertise_image_uiux ?? "",
      expertise_image_branding: settings.expertise_image_branding ?? "",
    };
  } catch {
    return defaultSettings;
  }
}
