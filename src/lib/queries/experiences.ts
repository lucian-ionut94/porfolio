import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export interface Experience {
  id: string;
  role_en: string;
  role_ro: string;
  company: string;
  logo_url: string;
  color: string;
  period_en: string;
  period_ro: string;
  sort_order: number;
}

const staticExperiences: Experience[] = [
  {
    id: "1",
    role_en: "Web Developer",
    role_ro: "Dezvoltator Web",
    company: "ITeXclusiv.ro",
    logo_url: "",
    color: "#a3e635",
    period_en: "Sep 2018 — Mar 2025",
    period_ro: "Sep 2018 — Mar 2025",
    sort_order: 0,
  },
  {
    id: "2",
    role_en: "Independent Developer",
    role_ro: "Dezvoltator Independent",
    company: "ThemeForest & CodeCanyon",
    logo_url: "",
    color: "#3b82f6",
    period_en: "Sep 2018 — Mar 2025",
    period_ro: "Sep 2018 — Mar 2025",
    sort_order: 1,
  },
  {
    id: "3",
    role_en: "Junior Web Developer",
    role_ro: "Dezvoltator Web Junior",
    company: "Thecon.ro",
    logo_url: "",
    color: "#f59e0b",
    period_en: "Dec 2015 — Apr 2019",
    period_ro: "Dec 2015 — Apr 2019",
    sort_order: 2,
  },
];

export async function getAllExperiences(): Promise<Experience[]> {
  const sb = getSupabase();
  if (!sb) return staticExperiences;

  try {
    const { data, error } = await sb
      .from("experiences")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticExperiences;
    return data as Experience[];
  } catch {
    return staticExperiences;
  }
}
