"use client";

import { useState, KeyboardEvent } from "react";

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ label, value, onChange, placeholder }: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm text-white/70">{label}</label>
      )}
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
        {value.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/80"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-white/40 hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && addTag(input)}
          className="min-w-[120px] flex-1 bg-transparent text-sm text-white outline-none placeholder-white/30"
          placeholder={value.length === 0 ? placeholder : ""}
        />
      </div>
    </div>
  );
}
