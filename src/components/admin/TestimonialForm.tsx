"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, TextArea } from "@/components/admin/ui/Input";
import { Button } from "@/components/admin/ui/Button";
import { MediaUpload } from "@/components/admin/ui/MediaUpload";
import { useToast } from "@/components/admin/ui/Toast";

interface TestimonialData {
  name: string;
  title: string;
  text_ro: string;
  text_en: string;
  avatar_url: string;
  link_url: string;
  sort_order: number;
}

interface TestimonialFormProps {
  id?: string;
  initial?: Partial<TestimonialData>;
}

const defaults: TestimonialData = {
  name: "",
  title: "",
  text_ro: "",
  text_en: "",
  avatar_url: "",
  link_url: "",
  sort_order: 0,
};

export default function TestimonialForm({ id, initial }: TestimonialFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState<TestimonialData>({ ...defaults, ...initial });
  const [saving, setSaving] = useState(false);

  const set = (key: keyof TestimonialData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const setVal = (key: keyof TestimonialData) => (value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = id ? `/api/admin/testimonials/${id}` : "/api/admin/testimonials";
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast(id ? "Testimonial updated." : "Testimonial created.");
        router.push("/admin/testimonials");
      } else {
        const data = await res.json();
        toast(data.error || "Save failed.", "error");
      }
    } catch {
      toast("Network error.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Name"
          value={form.name}
          onChange={set("name")}
          required
          placeholder="John Doe"
        />
        <Input
          label="Title / Company"
          value={form.title}
          onChange={set("title")}
          placeholder="CEO @ Company"
        />
      </div>

      <TextArea
        label="Testimonial (Romanian)"
        value={form.text_ro}
        onChange={set("text_ro")}
        rows={4}
        placeholder="Text în română..."
        required
      />

      <TextArea
        label="Testimonial (English)"
        value={form.text_en}
        onChange={set("text_en")}
        rows={4}
        placeholder="Text in English..."
        required
      />

      <MediaUpload
        label="Avatar Photo"
        value={form.avatar_url}
        onChange={setVal("avatar_url") as (v: string) => void}
        folder="testimonials"
      />

      <Input
        label="LinkedIn / Profile URL (optional)"
        value={form.link_url}
        onChange={set("link_url")}
        type="url"
        placeholder="https://linkedin.com/in/..."
      />

      <Input
        label="Sort Order"
        value={String(form.sort_order)}
        onChange={(e) => setVal("sort_order")(Number(e.target.value))}
        type="number"
        min="0"
      />

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : id ? "Update Testimonial" : "Create Testimonial"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/testimonials")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
