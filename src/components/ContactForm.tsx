"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import emailjs from "@emailjs/browser";
import Stepper from "./reactbits/Stepper";
import { motion } from "framer-motion";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field as keyof FormErrors];
      return next;
    });
  };

  const ERR = {
    name:
      locale === "ro"
        ? "Numele trebuie să aibă cel puțin 2 caractere"
        : "Name must be at least 2 characters",
    email:
      locale === "ro"
        ? "Adresă de email invalidă"
        : "Invalid email address",
    phone:
      locale === "ro"
        ? "Număr de telefon invalid"
        : "Invalid phone number",
    message:
      locale === "ro"
        ? "Mesajul trebuie să aibă cel puțin 10 caractere"
        : "Message must be at least 10 characters",
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    if (step === 0) {
      if (formData.name.trim().length < 2) newErrors.name = ERR.name;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
        newErrors.email = ERR.email;
      if (!/^[+\d\s\-().]{7,}$/.test(formData.phone.trim()))
        newErrors.phone = ERR.phone;
    }
    if (step === 2) {
      if (formData.message.trim().length < 10) newErrors.message = ERR.message;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const projectTypes = [
    { key: "prezentare", label: t("project_types.prezentare") },
    { key: "ecommerce", label: t("project_types.ecommerce") },
    { key: "design", label: t("project_types.design") },
    { key: "seo", label: t("project_types.seo") },
    { key: "other", label: t("project_types.other") },
  ];

  const budgets = [
    { key: "sub200", label: t("budgets.sub200") },
    { key: "200_500", label: t("budgets.200_500") },
    { key: "500_1000", label: t("budgets.500_1000") },
    { key: "peste1000", label: t("budgets.peste1000") },
  ];

  const input = (hasError?: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-surface border text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors ${
      hasError ? "border-error/60" : "border-border"
    }`;

  const steps = [
    {
      title: t("steps.info"),
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              {t("name")}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => update("name", e.target.value)}
              className={input(!!errors.name)}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-error">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              {t("email")}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              className={input(!!errors.email)}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-error">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              {t("phone")}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={input(!!errors.phone)}
              placeholder="+40 700 000 000"
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-error">{errors.phone}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: t("steps.project"),
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-muted mb-3">
              {t("project_type")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {projectTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => update("projectType", type.key)}
                  className={`px-4 py-2.5 rounded-xl border text-sm text-left transition-all duration-200 ${
                    formData.projectType === type.key
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted hover:border-border-light"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-3">
              {t("budget")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {budgets.map((b) => (
                <button
                  key={b.key}
                  onClick={() => update("budget", b.key)}
                  className={`px-4 py-2.5 rounded-xl border text-sm text-left transition-all duration-200 ${
                    formData.budget === b.key
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted hover:border-border-light"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("steps.message"),
      content: (
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            {t("message")}
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => update("message", e.target.value)}
            className={`${input(!!errors.message)} min-h-[160px] resize-none`}
            placeholder={t("steps.messagePlaceholder")}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-error">{errors.message}</p>
          )}
        </div>
      ),
    },
    {
      title: t("steps.confirm"),
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-surface-light border border-border">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted">{t("name")}:</span>
                <p className="text-foreground font-medium">
                  {formData.name || "—"}
                </p>
              </div>
              <div>
                <span className="text-muted">{t("email")}:</span>
                <p className="text-foreground font-medium">
                  {formData.email || "—"}
                </p>
              </div>
              <div>
                <span className="text-muted">{t("phone")}:</span>
                <p className="text-foreground font-medium">
                  {formData.phone || "—"}
                </p>
              </div>
              <div>
                <span className="text-muted">{t("project_type")}:</span>
                <p className="text-foreground font-medium">
                  {formData.projectType
                    ? t(`project_types.${formData.projectType}`)
                    : "—"}
                </p>
              </div>
              <div>
                <span className="text-muted">{t("budget")}:</span>
                <p className="text-foreground font-medium">
                  {formData.budget ? t(`budgets.${formData.budget}`) : "—"}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-sm text-muted">{t("message")}:</span>
              <p className="text-sm text-foreground mt-1">
                {formData.message || "—"}
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleComplete = async () => {
    setSending(true);
    setSendError(null);

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (siteKey && typeof window !== "undefined" && window.grecaptcha) {
        await new Promise<void>((resolve) => window.grecaptcha.ready(resolve));
        const token = await window.grecaptcha.execute(siteKey, {
          action: "contact_form",
        });
        const verifyRes = await fetch("/api/verify-recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const { success } = await verifyRes.json();
        if (!success) {
          setSendError(
            locale === "ro"
              ? "Verificare anti-spam eșuată. Încearcă din nou."
              : "Anti-spam verification failed. Please try again."
          );
          return;
        }
      }

      const result = await emailjs.send(
        "service_r39wo8l",
        "template_bgdn6lc",
        {
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          project_type: formData.projectType,
          budget: formData.budget,
          message: formData.message,
        },
        { publicKey: "Jf43kWJ5b_LTDnOdt" }
      );
      console.log("EmailJS success:", result.status, result.text);
      setSubmitted(true);
    } catch (err: unknown) {
      const e = err as { status?: number; text?: string; message?: string };
      const msg = e?.text || e?.message || JSON.stringify(err);
      console.error("EmailJS error:", e?.status, msg);
      setSendError(`Eroare ${e?.status ?? ""}: ${msg}`);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {t("success")}
        </h3>
        <p className="text-muted">{t("response_time")}</p>
      </motion.div>
    );
  }

  return (
    <div>
      {sendError && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-error/10 border border-error/30 text-error text-sm">
          {sendError}
        </div>
      )}
      <Stepper
        steps={steps}
        onComplete={handleComplete}
        onBeforeNext={validateStep}
        nextLabel={t("steps.next")}
        prevLabel={t("steps.back")}
        completeLabel={sending ? t("sending") : t("send")}
      />
    </div>
  );
}
