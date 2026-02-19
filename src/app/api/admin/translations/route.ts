import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { revalidateTranslations } from "@/lib/revalidate";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const supabase = createAdminSupabaseClient();
    const namespace = request.nextUrl.searchParams.get("namespace");

    let query = supabase
      .from("translations")
      .select("*")
      .order("namespace")
      .order("key");

    if (namespace) {
      query = query.eq("namespace", namespace);
    }

    const { data, error } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const supabase = createAdminSupabaseClient();

    const { data, error } = await supabase
      .from("translations")
      .insert(body)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidateTranslations();
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const { updates } = await request.json();
    const supabase = createAdminSupabaseClient();

    const results = await Promise.all(
      updates.map(
        (item: { id: string; value_en: string; value_ro: string }) =>
          supabase
            .from("translations")
            .update({ value_en: item.value_en, value_ro: item.value_ro })
            .eq("id", item.id)
      )
    );

    const errors = results.filter((r) => r.error);
    if (errors.length > 0) {
      return NextResponse.json(
        { error: `${errors.length} updates failed` },
        { status: 500 }
      );
    }

    revalidateTranslations();
    return NextResponse.json({ success: true, updated: updates.length });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
