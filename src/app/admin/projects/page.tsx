"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DbProject } from "@/types/database";
import { Button } from "@/components/admin/ui/Button";
import { Modal } from "@/components/admin/ui/Modal";
import { useToast } from "@/components/admin/ui/Toast";

export default function ProjectsListPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<DbProject | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadProjects = async () => {
    const res = await fetch("/api/admin/projects");
    if (res.ok) setProjects(await res.json());
    setLoading(false);
  };

  useEffect(() => { loadProjects(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/projects/${deleteTarget.id}`, { method: "DELETE" });
    if (res.ok) {
      toast("Project deleted");
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    } else {
      toast("Failed to delete", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link href="/admin/projects/new">
          <Button>+ New Project</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-white/50">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-white/50">No projects yet.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02]">
              <tr>
                <th className="px-4 py-3 font-medium text-white/50">Title</th>
                <th className="px-4 py-3 font-medium text-white/50">Slug</th>
                <th className="px-4 py-3 font-medium text-white/50">Category</th>
                <th className="px-4 py-3 font-medium text-white/50">Year</th>
                <th className="px-4 py-3 font-medium text-white/50">Order</th>
                <th className="px-4 py-3 font-medium text-white/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-white">{p.title}</td>
                  <td className="px-4 py-3 text-white/60">{p.slug}</td>
                  <td className="px-4 py-3 text-white/60">{p.category_en}</td>
                  <td className="px-4 py-3 text-white/60">{p.year}</td>
                  <td className="px-4 py-3 text-white/60">{p.sort_order}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projects/${p.id}`}>
                        <Button variant="secondary">Edit</Button>
                      </Link>
                      <Button variant="danger" onClick={() => setDeleteTarget(p)}>
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
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
