"use client";

import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const baseInput =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-white/25";

interface LabelProps {
  label?: string;
  id?: string;
}

function Label({ label, id }: LabelProps) {
  if (!label) return null;
  return (
    <label htmlFor={id} className="mb-1.5 block text-sm text-white/70">
      {label}
    </label>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div>
      <Label label={label} id={props.id} />
      <input className={`${baseInput} ${className}`} {...props} />
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div>
      <Label label={label} id={props.id} />
      <select className={`${baseInput} ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className = "", ...props }: TextAreaProps) {
  return (
    <div>
      <Label label={label} id={props.id} />
      <textarea className={`${baseInput} min-h-[100px] ${className}`} {...props} />
    </div>
  );
}

interface ColorInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function ColorInput({ label, value, onChange, ...props }: ColorInputProps) {
  return (
    <div>
      <Label label={label} id={props.id} />
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#000000"}
          onChange={onChange}
          className="h-9 w-9 cursor-pointer rounded border border-white/10 bg-transparent"
          {...props}
        />
        <input
          type="text"
          value={value || ""}
          onChange={onChange}
          className={`${baseInput} flex-1`}
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
