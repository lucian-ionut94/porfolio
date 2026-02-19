"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/admin/ui/Input";
import { Button } from "@/components/admin/ui/Button";
import { MediaUpload } from "@/components/admin/ui/MediaUpload";
import { useToast } from "@/components/admin/ui/Toast";

interface Settings {
  ga_measurement_id: string;
  about_image: string;
  expertise_image_development: string;
  expertise_image_uiux: string;
  expertise_image_branding: string;
}

const defaultSettings: Settings = {
  ga_measurement_id: "",
  about_image: "",
  expertise_image_development: "",
  expertise_image_uiux: "",
  expertise_image_branding: "",
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings((prev) => ({ ...prev, ...data }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const set = (key: keyof Settings) => (value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        toast("Settings saved.", "success");
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

  if (loading) {
    return (
      <div className="text-white/50 text-sm">Loading settings…</div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Site Settings</h1>
        <p className="mt-1 text-sm text-white/50">
          Manage global site settings — analytics, images, etc.
        </p>
      </div>

      <div className="space-y-10 max-w-2xl">
        {/* Google Analytics */}
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-base font-semibold mb-1">Google Analytics</h2>
          <p className="text-sm text-white/50 mb-5">
            Enter your GA4 Measurement ID (e.g. <code className="text-white/70">G-XXXXXXXXXX</code>).
            Leave empty to disable tracking.
          </p>
          <Input
            label="GA4 Measurement ID"
            value={settings.ga_measurement_id}
            onChange={(e) => set("ga_measurement_id")(e.target.value)}
            placeholder="G-XXXXXXXXXX"
          />
        </section>

        {/* About Page Image */}
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-base font-semibold mb-1">About Page Photo</h2>
          <p className="text-sm text-white/50 mb-5">
            Your profile photo displayed on the About page (portrait format recommended).
          </p>
          <MediaUpload
            label="About Image"
            value={settings.about_image}
            onChange={set("about_image")}
            folder="about"
          />
        </section>

        {/* Expertise Images */}
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-base font-semibold mb-1">Expertise Section Images</h2>
          <p className="text-sm text-white/50 mb-5">
            Images shown in the Expertise accordion on the home page. Landscape format (4:3) recommended.
          </p>
          <div className="space-y-6">
            <MediaUpload
              label="Development Image"
              value={settings.expertise_image_development}
              onChange={set("expertise_image_development")}
              folder="expertise"
            />
            <MediaUpload
              label="UI/UX Design Image"
              value={settings.expertise_image_uiux}
              onChange={set("expertise_image_uiux")}
              folder="expertise"
            />
            <MediaUpload
              label="Branding Image"
              value={settings.expertise_image_branding}
              onChange={set("expertise_image_branding")}
              folder="expertise"
            />
          </div>
        </section>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  );
}
