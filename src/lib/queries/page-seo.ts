import { createClient } from "@supabase/supabase-js";
import type { DbPageSeo } from "@/types/database";

export interface PageSeo {
  metaTitleEn: string;
  metaTitleRo: string;
  metaDescEn: string;
  metaDescRo: string;
  ogImage: string;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

const empty: PageSeo = {
  metaTitleEn: "",
  metaTitleRo: "",
  metaDescEn: "",
  metaDescRo: "",
  ogImage: "",
};

export async function getPageSeo(pageKey: string): Promise<PageSeo> {
  const sb = getSupabase();
  if (!sb) return empty;

  try {
    const { data, error } = await sb
      .from("page_seo")
      .select("*")
      .eq("page_key", pageKey)
      .single();

    if (error || !data) return empty;

    const row = data as DbPageSeo;
    return {
      metaTitleEn: row.meta_title_en,
      metaTitleRo: row.meta_title_ro,
      metaDescEn: row.meta_desc_en,
      metaDescRo: row.meta_desc_ro,
      ogImage: row.og_image,
    };
  } catch {
    return empty;
  }
}
