import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { revalidateAll } from "@/lib/revalidate";

export async function POST() {
  try {
    await requireAdmin();
    revalidateAll();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
