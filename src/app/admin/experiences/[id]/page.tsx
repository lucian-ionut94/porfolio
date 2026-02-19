import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import ExperienceForm from "@/components/admin/ExperienceForm";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const { id } = await params;
  const supabase = createAdminSupabaseClient();
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) redirect("/admin/experiences");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Edit Experience</h1>
      <ExperienceForm id={id} initial={data} />
    </div>
  );
}
