"use client";

import { useEffect, useState, useMemo } from "react";
import { DbTranslation } from "@/types/database";
import { Button } from "@/components/admin/ui/Button";
import { Input } from "@/components/admin/ui/Input";
import { Modal } from "@/components/admin/ui/Modal";
import { useToast } from "@/components/admin/ui/Toast";

export default function TranslationsPage() {
  const { toast } = useToast();
  const [translations, setTranslations] = useState<DbTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [nsFilter, setNsFilter] = useState("");
  const [changes, setChanges] = useState<Record<string, { value_en: string; value_ro: string }>>({});
  const [deleteTarget, setDeleteTarget] = useState<DbTranslation | null>(null);
  const [deleting, setDeleting] = useState(false);

  // New translation form
  const [showNew, setShowNew] = useState(false);
  const [newNs, setNewNs] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newEn, setNewEn] = useState("");
  const [newRo, setNewRo] = useState("");

  const loadTranslations = async () => {
    const url = nsFilter
      ? `/api/admin/translations?namespace=${encodeURIComponent(nsFilter)}`
      : "/api/admin/translations";
    const res = await fetch(url);
    if (res.ok) setTranslations(await res.json());
    setLoading(false);
  };

  useEffect(() => { loadTranslations(); }, [nsFilter]);

  const namespaces = useMemo(() => {
    const ns = new Set(translations.map((t) => t.namespace));
    return Array.from(ns).sort();
  }, [translations]);

  const filtered = useMemo(() => {
    if (!search) return translations;
    const q = search.toLowerCase();
    return translations.filter(
      (t) =>
        t.key.toLowerCase().includes(q) ||
        t.value_en.toLowerCase().includes(q) ||
        t.value_ro.toLowerCase().includes(q)
    );
  }, [translations, search]);

  const updateField = (id: string, field: "value_en" | "value_ro", value: string) => {
    const t = translations.find((t) => t.id === id);
    if (!t) return;
    const current = changes[id] || { value_en: t.value_en, value_ro: t.value_ro };
    setChanges((prev) => ({ ...prev, [id]: { ...current, [field]: value } }));
  };

  const hasChanges = Object.keys(changes).length > 0;

  const handleSaveAll = async () => {
    if (!hasChanges) return;
    setSaving(true);

    const updates = Object.entries(changes).map(([id, vals]) => ({ id, ...vals }));
    const res = await fetch("/api/admin/translations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });

    if (res.ok) {
      toast(`${updates.length} translation(s) updated`);
      setChanges({});
      loadTranslations();
    } else {
      toast("Failed to save changes", "error");
    }
    setSaving(false);
  };

  const handleCreate = async () => {
    if (!newNs || !newKey) return;
    const res = await fetch("/api/admin/translations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ namespace: newNs, key: newKey, value_en: newEn, value_ro: newRo }),
    });

    if (res.ok) {
      toast("Translation added");
      setShowNew(false);
      setNewNs("");
      setNewKey("");
      setNewEn("");
      setNewRo("");
      loadTranslations();
    } else {
      const err = await res.json();
      toast(err.error || "Failed to create", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/translations/${deleteTarget.id}`, { method: "DELETE" });
    if (res.ok) {
      toast("Translation deleted");
      setTranslations((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    } else {
      toast("Failed to delete", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const getValue = (t: DbTranslation, field: "value_en" | "value_ro") => {
    return changes[t.id]?.[field] ?? t[field];
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Translations</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowNew(!showNew)}>
            + Add Translation
          </Button>
          <Button onClick={handleSaveAll} disabled={!hasChanges || saving}>
            {saving ? "Saving..." : `Save Changes${hasChanges ? ` (${Object.keys(changes).length})` : ""}`}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-3">
        <div className="w-48">
          <select
            value={nsFilter}
            onChange={(e) => setNsFilter(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
          >
            <option value="">All namespaces</option>
            {namespaces.map((ns) => (
              <option key={ns} value={ns}>{ns}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keys or values..."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none"
          />
        </div>
      </div>

      {/* Add New Form */}
      {showNew && (
        <div className="mb-4 flex items-end gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <Input label="Namespace" value={newNs} onChange={(e) => setNewNs(e.target.value)} />
          <Input label="Key" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
          <Input label="Value EN" value={newEn} onChange={(e) => setNewEn(e.target.value)} />
          <Input label="Value RO" value={newRo} onChange={(e) => setNewRo(e.target.value)} />
          <Button onClick={handleCreate}>Add</Button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p className="text-white/50">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-white/50">No translations found.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.02]">
              <tr>
                <th className="px-4 py-3 font-medium text-white/50 w-36">Namespace</th>
                <th className="px-4 py-3 font-medium text-white/50 w-48">Key</th>
                <th className="px-4 py-3 font-medium text-white/50">Value EN</th>
                <th className="px-4 py-3 font-medium text-white/50">Value RO</th>
                <th className="px-4 py-3 font-medium text-white/50 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-2 text-white/60">{t.namespace}</td>
                  <td className="px-4 py-2 font-mono text-xs text-white/70">{t.key}</td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      value={getValue(t, "value_en")}
                      onChange={(e) => updateField(t.id, "value_en", e.target.value)}
                      className={`w-full rounded border bg-transparent px-2 py-1.5 text-sm text-white outline-none ${
                        changes[t.id] ? "border-yellow-500/30" : "border-transparent"
                      }`}
                    />
                  </td>
                  <td className="px-2 py-1">
                    <input
                      type="text"
                      value={getValue(t, "value_ro")}
                      onChange={(e) => updateField(t.id, "value_ro", e.target.value)}
                      className={`w-full rounded border bg-transparent px-2 py-1.5 text-sm text-white outline-none ${
                        changes[t.id] ? "border-yellow-500/30" : "border-transparent"
                      }`}
                    />
                  </td>
                  <td className="px-2 py-1 text-center">
                    <button
                      onClick={() => setDeleteTarget(t)}
                      className="text-sm text-red-400/60 hover:text-red-400"
                    >
                      ×
                    </button>
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
        title="Delete Translation"
        message={`Delete "${deleteTarget?.namespace}.${deleteTarget?.key}"? This cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
