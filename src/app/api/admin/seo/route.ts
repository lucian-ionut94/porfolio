import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { revalidatePageSeo } from "@/lib/revalidate";

export async function GET() {
  try {
    await requireAdmin();
    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("page_seo")
      .select("*")
      .order("page_key");

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const { updates } = await request.json() as {
      updates: { page_key: string; meta_title_en: string; meta_title_ro: string; meta_desc_en: string; meta_desc_ro: string; og_image: string }[];
    };
    const supabase = createAdminSupabaseClient();

    const results = await Promise.all(
      updates.map((item) =>
        supabase
          .from("page_seo")
          .upsert(
            {
              page_key: item.page_key,
              meta_title_en: item.meta_title_en,
              meta_title_ro: item.meta_title_ro,
              meta_desc_en: item.meta_desc_en,
              meta_desc_ro: item.meta_desc_ro,
              og_image: item.og_image,
            },
            { onConflict: "page_key" }
          )
      )
    );

    const errors = results.filter((r) => r.error);
    if (errors.length > 0) {
      const messages = errors.map((r) => r.error?.message).join("; ");
      return NextResponse.json({ error: messages }, { status: 500 });
    }

    revalidatePageSeo();
    return NextResponse.json({ success: true, updated: updates.length });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
