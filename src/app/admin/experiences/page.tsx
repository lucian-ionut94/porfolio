"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/admin/ui/Button";
import { Modal } from "@/components/admin/ui/Modal";
import { useToast } from "@/components/admin/ui/Toast";

interface Experience {
  id: string;
  role_en: string;
  company: string;
  period_en: string;
  sort_order: number;
}

export default function ExperiencesListPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Experience | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    const res = await fetch("/api/admin/experiences");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/experiences/${deleteTarget.id}`, { method: "DELETE" });
    if (res.ok) {
      toast("Experience deleted");
      setItems((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    } else {
      toast("Failed to delete", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Experiences</h1>
        <Link href="/admin/experiences/new">
          <Button>+ New Experience</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-white/50">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-white/50">No experiences yet. Add your first one!</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02]">
              <tr>
                <th className="px-4 py-3 font-medium text-white/50">Role</th>
                <th className="px-4 py-3 font-medium text-white/50">Company</th>
                <th className="px-4 py-3 font-medium text-white/50">Period</th>
                <th className="px-4 py-3 font-medium text-white/50">Order</th>
                <th className="px-4 py-3 font-medium text-white/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-white">{item.role_en}</td>
                  <td className="px-4 py-3 text-white/60">{item.company}</td>
                  <td className="px-4 py-3 text-white/60">{item.period_en}</td>
                  <td className="px-4 py-3 text-white/60">{item.sort_order}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/experiences/${item.id}`}>
                        <Button variant="secondary">Edit</Button>
                      </Link>
                      <Button variant="danger" onClick={() => setDeleteTarget(item)}>
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
        title="Delete Experience"
        message={`Are you sure you want to delete "${deleteTarget?.role_en} @ ${deleteTarget?.company}"?`}
        loading={deleting}
      />
    </div>
  );
}
