"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "./reactbits/ShinyText";
import SplitText from "./reactbits/SplitText";
import { Breadcrumb } from "./Breadcrumb";
import ContactForm from "./ContactForm";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

const infoItems = [
  {
    key: "email",
    labelKey: "info_email_label" as const,
    valueKey: "info_email" as const,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    key: "location",
    labelKey: "info_location_label" as const,
    valueKey: "info_location" as const,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    key: "response",
    labelKey: "info_response_label" as const,
    valueKey: "info_response_value" as const,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const faqKeys = ["1", "2", "3", "4"] as const;

function FAQSection({ t }: { t: ReturnType<typeof useTranslations<"contact">> }) {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) =>
    setOpen((prev) => (prev === key ? null : key));

  return (
    <section className="mt-20 pt-16 border-t border-border">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-2 mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
        <ShinyText
          text={t("faq_label")}
          className="text-xs font-semibold uppercase tracking-[0.1em] text-muted"
          speed={4}
        />
      </motion.div>

      {/* Title */}
      <SplitText
        text={t("faq_title")}
        tag="h2"
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium mb-2 tracking-tight"
        delay={50}
        duration={1.25}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="left"
      />

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-sm text-muted mb-10"
      >
        {t("faq_subtitle")}
      </motion.p>

      {/* Accordion */}
      <div className="divide-y divide-border border-t border-border">
        {faqKeys.map((key, i) => {
          const isOpen = open === key;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <button
                onClick={() => toggle(key)}
                className="w-full flex items-center gap-5 py-6 text-left cursor-pointer group"
                aria-expanded={isOpen}
              >
                {/* Number */}
                <span className="text-xs font-mono text-primary shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}.
                </span>

                {/* Question */}
                <span className="flex-1 text-base sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                  {t(`faq_items.q${key}` as `faq_items.q1`)}
                </span>

                {/* Toggle icon */}
                <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-primary bg-primary/10 rotate-45" : "border-border group-hover:border-primary/30"}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isOpen ? "text-primary" : "text-muted"}`} aria-hidden="true">
                    <line x1="12" x2="12" y1="5" y2="19" />
                    <line x1="5" x2="19" y1="12" y2="12" />
                  </svg>
                </span>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-13 pr-12">
                      <p className="text-sm text-muted leading-relaxed">
                        {t(`faq_items.a${key}` as `faq_items.a1`)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default function ContactPageContent() {
  const t = useTranslations("contact");

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumb currentPage={t("title")} />

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          {/* Left — Info column */}
          <div>
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex items-center gap-2 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
              <ShinyText
                text={t("label")}
                className="text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                speed={4}
              />
            </motion.div>

            {/* Title */}
            <SplitText
              text={t("title")}
              tag="h1"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium mb-4 tracking-tight"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm text-muted leading-relaxed mb-8"
            >
              {t("subtitle")}
            </motion.p>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">
                {t("availability")}
              </span>
            </motion.div>

            {/* Info cards */}
            <div className="space-y-3 mb-10">
              {infoItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted">{t(item.labelKey)}</p>
                    <p className="text-sm font-medium text-foreground">
                      {t(item.valueKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 flex-wrap">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all duration-300"
                    aria-label={social.name}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Form column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              {/* Form header */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" x2="8" y1="13" y2="13" />
                    <line x1="16" x2="8" y1="17" y2="17" />
                    <line x1="10" x2="8" y1="9" y2="9" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    {t("form_title")}
                  </h2>
                  <p className="text-xs text-muted">{t("response_time")}</p>
                </div>
              </div>

              <ContactForm />
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <FAQSection t={t} />
      </div>
    </div>
  );
}
