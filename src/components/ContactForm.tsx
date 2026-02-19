"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";
import Stepper from "./reactbits/Stepper";
import { motion } from "framer-motion";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const projectTypes = [
    { key: "wordpress", label: t("project_types.wordpress") },
    { key: "react", label: t("project_types.react") },
    { key: "laravel", label: t("project_types.laravel") },
    { key: "ecommerce", label: t("project_types.ecommerce") },
    { key: "other", label: t("project_types.other") },
  ];

  const budgets = [
    { key: "small", label: t("budgets.small") },
    { key: "medium", label: t("budgets.medium") },
    { key: "large", label: t("budgets.large") },
    { key: "enterprise", label: t("budgets.enterprise") },
  ];

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors";

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
              className={inputClasses}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-2">
              {t("email")}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputClasses}
              placeholder="john@example.com"
            />
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
            className={`${inputClasses} min-h-[160px] resize-none`}
            placeholder={t("steps.messagePlaceholder")}
          />
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
                <p className="text-foreground font-medium">{formData.name || "—"}</p>
              </div>
              <div>
                <span className="text-muted">{t("email")}:</span>
                <p className="text-foreground font-medium">{formData.email || "—"}</p>
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

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSendError("Config lipsă: credențiale EmailJS nedefinite.");
      setSending(false);
      return;
    }

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          project_type: formData.projectType,
          budget: formData.budget,
          message: formData.message,
        },
        { publicKey }
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
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{t("success")}</h3>
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
        nextLabel={t("steps.next")}
        prevLabel={t("steps.back")}
        completeLabel={sending ? t("sending") : t("send")}
      />
    </div>
  );
}
