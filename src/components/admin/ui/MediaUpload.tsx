"use client";

import { useRef, useState } from "react";

interface MediaUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  folder?: string;
}

export function MediaUpload({
  label,
  value,
  onChange,
  accept = "image/*",
  folder = "general",
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const isVideo = accept.startsWith("video");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm text-white/70">{label}</label>

      {value && (
        <div className="relative inline-block">
          {isVideo ? (
            <video
              src={value}
              className="h-32 rounded-lg border border-white/10 object-cover"
              muted
              playsInline
              controls={false}
              onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
              onMouseLeave={(e) => {
                const v = e.target as HTMLVideoElement;
                v.pause();
                v.currentTime = 0;
              }}
            />
          ) : (
            <img
              src={value}
              alt={label}
              className="h-32 rounded-lg border border-white/10 object-cover"
            />
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : value ? "Change" : "Upload"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
