"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/admin/ui/Button";
import { Modal } from "@/components/admin/ui/Modal";
import { useToast } from "@/components/admin/ui/Toast";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  text_en: string;
  text_ro: string;
  sort_order: number;
}

export default function TestimonialsListPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/testimonials/${deleteTarget.id}`, { method: "DELETE" });
    if (res.ok) {
      toast("Testimonial deleted");
      setItems((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    } else {
      toast("Failed to delete", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Testimonials</h1>
        <Link href="/admin/testimonials/new">
          <Button>+ New Testimonial</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-white/50">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-white/50">No testimonials yet. Add your first one!</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02]">
              <tr>
                <th className="px-4 py-3 font-medium text-white/50">Name</th>
                <th className="px-4 py-3 font-medium text-white/50">Title</th>
                <th className="px-4 py-3 font-medium text-white/50">Order</th>
                <th className="px-4 py-3 font-medium text-white/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-white">{item.name}</td>
                  <td className="px-4 py-3 text-white/60">{item.title}</td>
                  <td className="px-4 py-3 text-white/60">{item.sort_order}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/testimonials/${item.id}`}>
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
        title="Delete Testimonial"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        loading={deleting}
      />
    </div>
  );
}
