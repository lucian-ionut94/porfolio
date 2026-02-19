"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DbArticle } from "@/types/database";
import { Button } from "@/components/admin/ui/Button";
import { Modal } from "@/components/admin/ui/Modal";
import { useToast } from "@/components/admin/ui/Toast";

export default function ArticlesListPage() {
  const { toast } = useToast();
  const [articles, setArticles] = useState<DbArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<DbArticle | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadArticles = async () => {
    const res = await fetch("/api/admin/articles");
    if (res.ok) setArticles(await res.json());
    setLoading(false);
  };

  useEffect(() => { loadArticles(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/articles/${deleteTarget.id}`, { method: "DELETE" });
    if (res.ok) {
      toast("Article deleted");
      setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    } else {
      toast("Failed to delete", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <Link href="/admin/articles/new">
          <Button>+ New Article</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-white/50">Loading...</p>
      ) : articles.length === 0 ? (
        <p className="text-white/50">No articles yet.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02]">
              <tr>
                <th className="px-4 py-3 font-medium text-white/50">Title</th>
                <th className="px-4 py-3 font-medium text-white/50">Slug</th>
                <th className="px-4 py-3 font-medium text-white/50">Category</th>
                <th className="px-4 py-3 font-medium text-white/50">Date</th>
                <th className="px-4 py-3 font-medium text-white/50">Order</th>
                <th className="px-4 py-3 font-medium text-white/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-white">{a.title_en}</td>
                  <td className="px-4 py-3 text-white/60">{a.slug}</td>
                  <td className="px-4 py-3 text-white/60">{a.category_en}</td>
                  <td className="px-4 py-3 text-white/60">{a.date}</td>
                  <td className="px-4 py-3 text-white/60">{a.sort_order}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/articles/${a.id}`}>
                        <Button variant="secondary">Edit</Button>
                      </Link>
                      <Button variant="danger" onClick={() => setDeleteTarget(a)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Article"
        message={`Are you sure you want to delete "${deleteTarget?.title_en}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
