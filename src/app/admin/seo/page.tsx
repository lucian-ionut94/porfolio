"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/admin/ui/Input";
import { Button } from "@/components/admin/ui/Button";
import { MediaUpload } from "@/components/admin/ui/MediaUpload";
import { useToast } from "@/components/admin/ui/Toast";

interface PageSeoRow {
  page_key: string;
  meta_title_en: string;
  meta_title_ro: string;
  meta_desc_en: string;
  meta_desc_ro: string;
  og_image: string;
}

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  about: "About",
  portfolio: "Portfolio (listing)",
  blog: "Blog (listing)",
  contact: "Contact",
};

const EMPTY_ROW = (key: string): PageSeoRow => ({
  page_key: key,
  meta_title_en: "",
  meta_title_ro: "",
  meta_desc_en: "",
  meta_desc_ro: "",
  og_image: "",
});

export default function SeoPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<PageSeoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((r) => r.json())
      .then((data: PageSeoRow[]) => {
        const keys = ["home", "about", "portfolio", "blog", "contact"];
        const merged = keys.map((key) => {
          const existing = data.find((r) => r.page_key === key);
          return existing ?? EMPTY_ROW(key);
        });
        setRows(merged);
      })
      .catch(() => toast("Failed to load SEO data", "error"))
      .finally(() => setLoading(false));
  }, [toast]);

  const update = (key: string, field: keyof Omit<PageSeoRow, "page_key">, value: string) => {
    setRows((prev) => prev.map((r) => (r.page_key === key ? { ...r, [field]: value } : r)));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates: rows }),
    });

    if (res.ok) {
      toast("SEO settings saved");
    } else {
      const err = await res.json();
      toast(err.error || "Failed to save", "error");
    }
    setSaving(false);
  };

  if (loading) return <p className="text-white/50">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Page SEO</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save All"}
        </Button>
      </div>

      <p className="text-sm text-white/40">
        Custom meta tags and OG image for static pages. Leave blank to use the default generated values.
      </p>

      {/* Slug reference */}
      <fieldset className="space-y-3 rounded-xl border border-white/10 p-5">
        <legend className="px-2 text-sm font-medium text-white/50">URL Slugs (configured in code)</legend>
        <p className="text-xs text-white/30">These are the actual public URLs for each locale. To change them, update <code className="text-primary/70">src/i18n/routing.ts</code>.</p>
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <span className="text-white/40">Page</span>
          <span className="text-white/40">RO URL</span>
          <span className="text-white/40">EN URL</span>
          {[
            { page: "Home", ro: "/", en: "/en" },
            { page: "About", ro: "/despre", en: "/en/about" },
            { page: "Portfolio", ro: "/portofoliu", en: "/en/portfolio" },
            { page: "Blog", ro: "/blog", en: "/en/blog" },
            { page: "Contact", ro: "/contact", en: "/en/contact" },
          ].map(({ page, ro, en }) => (
            <>
              <span key={page} className="text-white/70">{page}</span>
              <span key={`${page}-ro`} className="text-primary/70">{ro}</span>
              <span key={`${page}-en`} className="text-primary/70">{en}</span>
            </>
          ))}
        </div>
      </fieldset>

      <div className="space-y-4">
        {rows.map((row) => (
          <fieldset key={row.page_key} className="space-y-4 rounded-xl border border-white/10 p-5">
            <legend className="px-2 text-sm font-medium text-white/50">
              {PAGE_LABELS[row.page_key] ?? row.page_key}
            </legend>

            {/* OG Image */}
            <div>
              <MediaUpload
                label="OG Image (1200×630px recommended)"
                value={row.og_image}
                onChange={(url) => update(row.page_key, "og_image", url)}
                accept="image/*"
                folder="seo"
              />
              {row.og_image && (
                <button
                  type="button"
                  onClick={() => update(row.page_key, "og_image", "")}
                  className="mt-1 text-xs text-red-400 hover:text-red-300"
                >
                  Remove image (use auto-generated)
                </button>
              )}
            </div>

            {/* Titles */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Meta Title EN"
                value={row.meta_title_en}
                onChange={(e) => update(row.page_key, "meta_title_en", e.target.value)}
                placeholder="e.g. Lucian Ionuț | Full-Stack Developer"
              />
              <Input
                label="Meta Title RO"
                value={row.meta_title_ro}
                onChange={(e) => update(row.page_key, "meta_title_ro", e.target.value)}
                placeholder="e.g. Lucian Ionuț | Dezvoltator Full-Stack"
              />
            </div>

            {/* Descriptions */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Meta Description EN"
                value={row.meta_desc_en}
                onChange={(e) => update(row.page_key, "meta_desc_en", e.target.value)}
                placeholder="Short description for search engines (150-160 chars)"
              />
              <Input
                label="Meta Description RO"
                value={row.meta_desc_ro}
                onChange={(e) => update(row.page_key, "meta_desc_ro", e.target.value)}
                placeholder="Descriere scurtă pentru motoarele de căutare (150-160 caractere)"
              />
            </div>
          </fieldset>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save All"}
        </Button>
      </div>
    </div>
  );
}
