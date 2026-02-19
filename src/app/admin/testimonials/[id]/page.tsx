import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default async function EditTestimonialPage({
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
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) redirect("/admin/testimonials");

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Edit Testimonial</h1>
      <TestimonialForm id={id} initial={data} />
    </div>
  );
}
