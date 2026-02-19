"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DbProject } from "@/types/database";
import { Input, TextArea, ColorInput } from "./ui/Input";
import { TagInput } from "./ui/TagInput";
import { MediaUpload } from "./ui/MediaUpload";
import { Button } from "./ui/Button";
import { useToast } from "./ui/Toast";

type ProjectData = Omit<DbProject, "id" | "created_at" | "updated_at">;

const emptyProject: ProjectData = {
  slug: "",
  slug_en: "",
  slug_ro: "",
  title: "",
  category: "",
  category_en: "",
  category_ro: "",
  description_en: "",
  description_ro: "",
  challenge_en: "",
  challenge_ro: "",
  solution_en: "",
  solution_ro: "",
  results_en: "",
  results_ro: "",
  tech: [],
  year: new Date().getFullYear().toString(),
  bg_color: "#0a0a0a",
  letter: "",
  letter_color: "#ffffff",
  accent_color: "#a3e635",
  feature_image: "",
  live_url: "",
  source_url: "",
  features_en: [],
  features_ro: [],
  video_desktop: "",
  video_mobile: "",
  highlights: [],
  meta_title_en: null,
  meta_title_ro: null,
  meta_desc_en: null,
  meta_desc_ro: null,
  sort_order: 0,
};

interface ProjectFormProps {
  project?: DbProject;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = !!project;

  const [data, setData] = useState<ProjectData>(() => {
    if (project) {
      const { id, created_at, updated_at, ...rest } = project;
      void id; void created_at; void updated_at;
      return { ...rest, live_url: rest.live_url || "", source_url: rest.source_url || "" };
    }
    return emptyProject;
  });
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof ProjectData>(key: K, value: ProjectData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...data,
      live_url: data.live_url || null,
      source_url: data.source_url || null,
    };

    const url = isEdit ? `/api/admin/projects/${project.id}` : "/api/admin/projects";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast(isEdit ? "Project updated" : "Project created");
      router.push("/admin/projects");
      router.refresh();
    } else {
      const err = await res.json();
      toast(err.error || "Failed to save", "error");
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <Section title="Basic Info">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Slug (canonical)" value={data.slug} onChange={(e) => set("slug", e.target.value)} required />
          <Input label="Title" value={data.title} onChange={(e) => set("title", e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Slug EN" value={data.slug_en} onChange={(e) => set("slug_en", e.target.value)} placeholder="en-slug" />
          <Input label="Slug RO" value={data.slug_ro} onChange={(e) => set("slug_ro", e.target.value)} placeholder="slug-ro" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Category (key)" value={data.category} onChange={(e) => set("category", e.target.value)} />
          <Input label="Category EN" value={data.category_en} onChange={(e) => set("category_en", e.target.value)} />
          <Input label="Category RO" value={data.category_ro} onChange={(e) => set("category_ro", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Year" value={data.year} onChange={(e) => set("year", e.target.value)} />
          <Input label="Sort Order" type="number" value={data.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} />
        </div>
      </Section>

      {/* Bilingual Content */}
      <Section title="Description">
        <BilingualTextAreas
          labelEn="Description EN" valueEn={data.description_en} onChangeEn={(v) => set("description_en", v)}
          labelRo="Description RO" valueRo={data.description_ro} onChangeRo={(v) => set("description_ro", v)}
        />
      </Section>

      <Section title="Challenge">
        <BilingualTextAreas
          labelEn="Challenge EN" valueEn={data.challenge_en} onChangeEn={(v) => set("challenge_en", v)}
          labelRo="Challenge RO" valueRo={data.challenge_ro} onChangeRo={(v) => set("challenge_ro", v)}
        />
      </Section>

      <Section title="Solution">
        <BilingualTextAreas
          labelEn="Solution EN" valueEn={data.solution_en} onChangeEn={(v) => set("solution_en", v)}
          labelRo="Solution RO" valueRo={data.solution_ro} onChangeRo={(v) => set("solution_ro", v)}
        />
      </Section>

      <Section title="Results">
        <BilingualTextAreas
          labelEn="Results EN" valueEn={data.results_en} onChangeEn={(v) => set("results_en", v)}
          labelRo="Results RO" valueRo={data.results_ro} onChangeRo={(v) => set("results_ro", v)}
        />
      </Section>

      {/* Arrays */}
      <Section title="Tech & Features">
        <TagInput label="Tech Stack" value={data.tech} onChange={(v) => set("tech", v)} placeholder="Type and press Enter" />
        <TagInput label="Features EN" value={data.features_en} onChange={(v) => set("features_en", v)} placeholder="Feature in English" />
        <TagInput label="Features RO" value={data.features_ro} onChange={(v) => set("features_ro", v)} placeholder="Feature in Romanian" />
      </Section>

      {/* Style */}
      <Section title="Style">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <ColorInput label="Background Color" value={data.bg_color} onChange={(e) => set("bg_color", e.target.value)} />
          <ColorInput label="Letter Color" value={data.letter_color} onChange={(e) => set("letter_color", e.target.value)} />
          <ColorInput label="Accent Color" value={data.accent_color} onChange={(e) => set("accent_color", e.target.value)} />
          <Input label="Letter" value={data.letter} onChange={(e) => set("letter", e.target.value)} />
        </div>
      </Section>

      {/* Media */}
      <Section title="Media">
        <MediaUpload
          label="Feature Image"
          value={data.feature_image}
          onChange={(url) => set("feature_image", url)}
          accept="image/*"
          folder="projects"
        />
        <div className="grid grid-cols-2 gap-4">
          <MediaUpload
            label="Video Desktop"
            value={data.video_desktop}
            onChange={(url) => set("video_desktop", url)}
            accept="video/*"
            folder="projects"
          />
          <MediaUpload
            label="Video Mobile"
            value={data.video_mobile}
            onChange={(url) => set("video_mobile", url)}
            accept="video/*"
            folder="projects"
          />
        </div>
      </Section>

      {/* Links */}
      <Section title="Links">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Live URL" value={data.live_url || ""} onChange={(e) => set("live_url", e.target.value)} />
          <Input label="Source URL" value={data.source_url || ""} onChange={(e) => set("source_url", e.target.value)} />
        </div>
      </Section>

      {/* SEO */}
      <Section title="SEO (optional — overrides default meta tags)">
        <p className="text-xs text-white/40">Leave blank to use the project title and description as meta tags.</p>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Meta Title EN" value={data.meta_title_en || ""} onChange={(e) => set("meta_title_en", e.target.value || null)} placeholder="Overrides project title in search results" />
          <Input label="Meta Title RO" value={data.meta_title_ro || ""} onChange={(e) => set("meta_title_ro", e.target.value || null)} placeholder="Overrides project title RO in search results" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Meta Description EN" value={data.meta_desc_en || ""} onChange={(e) => set("meta_desc_en", e.target.value || null)} placeholder="Overrides description EN in search results" />
          <Input label="Meta Description RO" value={data.meta_desc_ro || ""} onChange={(e) => set("meta_desc_ro", e.target.value || null)} placeholder="Overrides description RO in search results" />
        </div>
      </Section>

      {/* Highlights */}
      <Section title="Highlights">
        <HighlightsEditor
          value={data.highlights}
          onChange={(v) => set("highlights", v)}
        />
      </Section>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push("/admin/projects")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4 rounded-xl border border-white/10 p-5">
      <legend className="px-2 text-sm font-medium text-white/50">{title}</legend>
      {children}
    </fieldset>
  );
}

function BilingualTextAreas({
  labelEn, valueEn, onChangeEn,
  labelRo, valueRo, onChangeRo,
}: {
  labelEn: string; valueEn: string; onChangeEn: (v: string) => void;
  labelRo: string; valueRo: string; onChangeRo: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TextArea label={labelEn} value={valueEn} onChange={(e) => onChangeEn(e.target.value)} />
      <TextArea label={labelRo} value={valueRo} onChange={(e) => onChangeRo(e.target.value)} />
    </div>
  );
}

function HighlightsEditor({
  value,
  onChange,
}: {
  value: { value: string; label_en: string; label_ro: string }[];
  onChange: (v: { value: string; label_en: string; label_ro: string }[]) => void;
}) {
  const addRow = () => {
    onChange([...value, { value: "", label_en: "", label_ro: "" }]);
  };

  const updateRow = (i: number, field: string, val: string) => {
    const updated = value.map((row, idx) =>
      idx === i ? { ...row, [field]: val } : row
    );
    onChange(updated);
  };

  const removeRow = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-2">
      {value.map((row, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
            placeholder="Value"
            value={row.value}
            onChange={(e) => updateRow(i, "value", e.target.value)}
          />
          <input
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
            placeholder="Label EN"
            value={row.label_en}
            onChange={(e) => updateRow(i, "label_en", e.target.value)}
          />
          <input
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
            placeholder="Label RO"
            value={row.label_ro}
            onChange={(e) => updateRow(i, "label_ro", e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeRow(i)}
            className="text-sm text-red-400 hover:text-red-300"
          >
            ×
          </button>
        </div>
      ))}
      <Button type="button" variant="secondary" onClick={addRow}>
        + Add Highlight
      </Button>
    </div>
  );
}
