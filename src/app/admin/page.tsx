"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/admin/ui/Button";

interface Counts {
  projects: number;
  articles: number;
  translations: number;
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({ projects: 0, articles: 0, translations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, a, t] = await Promise.all([
          fetch("/api/admin/projects").then((r) => r.json()),
          fetch("/api/admin/articles").then((r) => r.json()),
          fetch("/api/admin/translations").then((r) => r.json()),
        ]);
        setCounts({
          projects: Array.isArray(p) ? p.length : 0,
          articles: Array.isArray(a) ? a.length : 0,
          translations: Array.isArray(t) ? t.length : 0,
        });
      } catch {
        // counts stay 0
      }
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: "Projects", count: counts.projects, href: "/admin/projects", action: "Manage Projects" },
    { label: "Articles", count: counts.articles, href: "/admin/articles", action: "Manage Articles" },
    { label: "Translations", count: counts.translations, href: "/admin/translations", action: "Edit Translations" },
  ];

  const handleRevalidate = async () => {
    await fetch("/api/admin/revalidate", { method: "POST" });
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-1 text-sm text-white/50">Manage your portfolio content</p>
        </div>
        <Button variant="secondary" onClick={handleRevalidate}>
          Revalidate Cache
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
          >
            <p className="text-sm text-white/50">{card.label}</p>
            <p className="mt-1 text-3xl font-semibold">
              {loading ? "—" : card.count}
            </p>
            <Link
              href={card.href}
              className="mt-4 inline-block text-sm text-white/60 hover:text-white"
            >
              {card.action} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
