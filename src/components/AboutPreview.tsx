"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ShinyText from "./reactbits/ShinyText";
import ScrollReveal from "./reactbits/ScrollReveal";

export default function AboutPreview() {
  const t = useTranslations("aboutSection");
  const fullText = `${t("text_before")}${t("text_highlight")}${t("text_after")}`;

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-[1260px] mx-auto px-6 sm:px-8 text-center">
        {/* Section label with ShinyText */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
          <ShinyText
            text={t("label")}
            className="text-xs font-semibold uppercase tracking-[0.1em] text-muted"
            speed={4}
          />
        </motion.div>

        {/* About text with ScrollReveal */}
        <ScrollReveal
          text={fullText}
          tag="h2"
          className="font-sans text-[18px] leading-[30px] md:text-[32px] md:leading-[44px] font-medium"
          activeColor="#ffffff"
          inactiveColor="#3a3a4a"
        />
      </div>
    </section>
  );
}
