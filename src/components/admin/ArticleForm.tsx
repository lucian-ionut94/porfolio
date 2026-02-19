"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { DbArticle } from "@/types/database";
import { Input, ColorInput } from "./ui/Input";
import { MediaUpload } from "./ui/MediaUpload";
import { Button } from "./ui/Button";
import { useToast } from "./ui/Toast";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type ArticleData = Omit<DbArticle, "id" | "created_at" | "updated_at">;

const emptyArticle: ArticleData = {
  slug: "",
  slug_en: "",
  slug_ro: "",
  title_en: "",
  title_ro: "",
  excerpt_en: "",
  excerpt_ro: "",
  body_en: [],
  body_ro: [],
  category: "",
  category_en: "",
  category_ro: "",
  date: new Date().toISOString().split("T")[0],
  read_time: 5,
  accent: "#a3e635",
  bg_from: "#0a0a0a",
  bg_to: "#111111",
  icon: "code",
  feature_image: "",
  ad_image: "",
  ad_link: "",
  meta_title_en: null,
  meta_title_ro: null,
  meta_desc_en: null,
  meta_desc_ro: null,
  sort_order: 0,
};

interface ArticleFormProps {
  article?: DbArticle;
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = !!article;

  const [data, setData] = useState<ArticleData>(() => {
    if (article) {
      const { id, created_at, updated_at, ...rest } = article;
      void id; void created_at; void updated_at;
      return rest;
    }
    return emptyArticle;
  });

  // Body as joined string for the MD editor
  const [bodyEn, setBodyEn] = useState(() =>
    article ? article.body_en.join("\n\n") : ""
  );
  const [bodyRo, setBodyRo] = useState(() =>
    article ? article.body_ro.join("\n\n") : ""
  );
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof ArticleData>(key: K, value: ArticleData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...data,
      body_en: bodyEn.split("\n\n").filter(Boolean),
      body_ro: bodyRo.split("\n\n").filter(Boolean),
    };

    const url = isEdit ? `/api/admin/articles/${article.id}` : "/api/admin/articles";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast(isEdit ? "Article updated" : "Article created");
      router.push("/admin/articles");
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
          <Input label="Icon" value={data.icon} onChange={(e) => set("icon", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Slug EN" value={data.slug_en} onChange={(e) => set("slug_en", e.target.value)} placeholder="en-article-slug" />
          <Input label="Slug RO" value={data.slug_ro} onChange={(e) => set("slug_ro", e.target.value)} placeholder="slug-articol-ro" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Category (key)" value={data.category} onChange={(e) => set("category", e.target.value)} />
          <Input label="Category EN" value={data.category_en} onChange={(e) => set("category_en", e.target.value)} />
          <Input label="Category RO" value={data.category_ro} onChange={(e) => set("category_ro", e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Date" type="date" value={data.date} onChange={(e) => set("date", e.target.value)} />
          <Input label="Read Time (min)" type="number" value={data.read_time} onChange={(e) => set("read_time", Number(e.target.value))} />
          <Input label="Sort Order" type="number" value={data.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} />
        </div>
      </Section>

      {/* Titles & Excerpts */}
      <Section title="Titles & Excerpts">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Title EN" value={data.title_en} onChange={(e) => set("title_en", e.target.value)} required />
          <Input label="Title RO" value={data.title_ro} onChange={(e) => set("title_ro", e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Excerpt EN" value={data.excerpt_en} onChange={(e) => set("excerpt_en", e.target.value)} />
          <Input label="Excerpt RO" value={data.excerpt_ro} onChange={(e) => set("excerpt_ro", e.target.value)} />
        </div>
      </Section>

      {/* Body */}
      <Section title="Body Content">
        <div className="grid grid-cols-2 gap-4" data-color-mode="dark">
          <div>
            <label className="mb-1.5 block text-sm text-white/70">Body EN</label>
            <MDEditor value={bodyEn} onChange={(v) => setBodyEn(v || "")} height={400} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/70">Body RO</label>
            <MDEditor value={bodyRo} onChange={(v) => setBodyRo(v || "")} height={400} />
          </div>
        </div>
      </Section>

      {/* Feature Image */}
      <Section title="Feature Image">
        <MediaUpload
          label="Feature Image"
          value={data.feature_image}
          onChange={(url) => set("feature_image", url)}
          accept="image/*"
          folder="articles"
        />
      </Section>

      {/* Ad Space */}
      <Section title="Ad Space">
        <MediaUpload
          label="Ad Image"
          value={data.ad_image}
          onChange={(url) => set("ad_image", url)}
          accept="image/*"
          folder="articles/ads"
        />
        <Input
          label="Ad Link (opens in new tab)"
          value={data.ad_link}
          onChange={(e) => set("ad_link", e.target.value)}
          placeholder="https://..."
        />
      </Section>

      {/* SEO */}
      <Section title="SEO (optional — overrides default meta tags)">
        <p className="text-xs text-white/40">Leave blank to use the article title and excerpt as meta tags.</p>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Meta Title EN" value={data.meta_title_en || ""} onChange={(e) => set("meta_title_en", e.target.value || null)} placeholder="Overrides title EN in search results" />
          <Input label="Meta Title RO" value={data.meta_title_ro || ""} onChange={(e) => set("meta_title_ro", e.target.value || null)} placeholder="Overrides title RO in search results" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Meta Description EN" value={data.meta_desc_en || ""} onChange={(e) => set("meta_desc_en", e.target.value || null)} placeholder="Overrides excerpt EN in search results" />
          <Input label="Meta Description RO" value={data.meta_desc_ro || ""} onChange={(e) => set("meta_desc_ro", e.target.value || null)} placeholder="Overrides excerpt RO in search results" />
        </div>
      </Section>

      {/* Style */}
      <Section title="Style">
        <div className="grid grid-cols-3 gap-4">
          <ColorInput label="Accent" value={data.accent} onChange={(e) => set("accent", e.target.value)} />
          <ColorInput label="BG From" value={data.bg_from} onChange={(e) => set("bg_from", e.target.value)} />
          <ColorInput label="BG To" value={data.bg_to} onChange={(e) => set("bg_to", e.target.value)} />
        </div>
      </Section>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : isEdit ? "Update Article" : "Create Article"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push("/admin/articles")}>
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
