import { createClient } from "@supabase/supabase-js";
import type { Testimonial } from "@/components/TestimonialsSection";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const sb = getSupabase();
  if (!sb) return [];

  try {
    const { data, error } = await sb
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return [];
    return data as Testimonial[];
  } catch {
    return [];
  }
}
