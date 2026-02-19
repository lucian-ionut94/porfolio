"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import LogoLoop from "./reactbits/LogoLoop";

const techLogos = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "PHP", color: "#777BB4" },
  { name: "Node.js", color: "#339933" },
  { name: "WordPress", color: "#21759B" },
  { name: "OpenCart", color: "#23B5D4" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "MySQL", color: "#4479A1" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "Docker", color: "#2496ED" },
  { name: "Git", color: "#F05032" },
  { name: "Figma", color: "#F24E1E" },
];

export default function TechStackSection() {
  const t = useTranslations("techStack");

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
          <span className="section-label">{t("label")}</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted"
        >
          {t("subtitle")}
        </motion.p>
      </div>

      <LogoLoop speed={35} pauseOnHover={true}>
        {techLogos.map((tech) => (
          <div
            key={tech.name}
            className="inline-flex items-center gap-3 mx-4 px-5 py-3 rounded-xl border border-border bg-surface/50 hover:border-border-light hover:bg-surface-light transition-all duration-300 cursor-default"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: tech.color }}
            />
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </LogoLoop>
    </section>
  );
}
