"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, ColorInput } from "@/components/admin/ui/Input";
import { Button } from "@/components/admin/ui/Button";
import { MediaUpload } from "@/components/admin/ui/MediaUpload";
import { useToast } from "@/components/admin/ui/Toast";

interface ExperienceData {
  role_en: string;
  role_ro: string;
  company: string;
  logo_url: string;
  color: string;
  period_en: string;
  period_ro: string;
  sort_order: number;
}

interface ExperienceFormProps {
  id?: string;
  initial?: Partial<ExperienceData>;
}

const defaults: ExperienceData = {
  role_en: "",
  role_ro: "",
  company: "",
  logo_url: "",
  color: "#a3e635",
  period_en: "",
  period_ro: "",
  sort_order: 0,
};

export default function ExperienceForm({ id, initial }: ExperienceFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState<ExperienceData>({ ...defaults, ...initial });
  const [saving, setSaving] = useState(false);

  const set = (key: keyof ExperienceData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const setVal = (key: keyof ExperienceData) => (value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = id ? `/api/admin/experiences/${id}` : "/api/admin/experiences";
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast(id ? "Experience updated." : "Experience created.");
        router.push("/admin/experiences");
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
          label="Role (English)"
          value={form.role_en}
          onChange={set("role_en")}
          required
          placeholder="Web Developer"
        />
        <Input
          label="Role (Romanian)"
          value={form.role_ro}
          onChange={set("role_ro")}
          placeholder="Dezvoltator Web"
        />
      </div>

      <Input
        label="Company Name"
        value={form.company}
        onChange={set("company")}
        required
        placeholder="Company SRL"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Period (English)"
          value={form.period_en}
          onChange={set("period_en")}
          placeholder="Jan 2020 — Present"
        />
        <Input
          label="Period (Romanian)"
          value={form.period_ro}
          onChange={set("period_ro")}
          placeholder="Ian 2020 — Prezent"
        />
      </div>

      <MediaUpload
        label="Company Logo"
        value={form.logo_url}
        onChange={setVal("logo_url") as (v: string) => void}
        folder="experiences"
      />

      <ColorInput
        label="Accent Color (shown when no logo)"
        value={form.color}
        onChange={set("color")}
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
          {saving ? "Saving…" : id ? "Update Experience" : "Create Experience"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/experiences")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
