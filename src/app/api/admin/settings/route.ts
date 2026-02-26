import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { revalidateSettings } from "@/lib/revalidate";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Return as an object { key: value }
    const settings: Record<string, string> = {};
    (data ?? []).forEach((row: { key: string; value: string }) => {
      settings[row.key] = row.value;
    });
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const body: Record<string, string> = await request.json();
    const supabase = createAdminSupabaseClient();

    // Upsert each key-value pair
    const rows = Object.entries(body).map(([key, value]) => ({ key, value }));
    const { error } = await supabase
      .from("site_settings")
      .upsert(rows, { onConflict: "key" });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidateSettings();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
