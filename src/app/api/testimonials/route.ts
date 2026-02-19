import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function GET() {
  const sb = getSupabase();
  if (!sb) return NextResponse.json([]);

  try {
    const { data, error } = await sb
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data) return NextResponse.json([]);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
