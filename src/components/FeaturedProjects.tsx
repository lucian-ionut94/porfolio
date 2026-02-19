"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import ShinyText from "./reactbits/ShinyText";
import SplitText from "./reactbits/SplitText";
import Magnet from "./reactbits/Magnet";
import { projects as staticProjects, type Project } from "@/data/projects";

export default function FeaturedProjects({ projects: propProjects }: { projects?: Project[] }) {
  const projects = (propProjects ?? staticProjects).slice(0, 4);
  const t = useTranslations("portfolio");
  const locale = useLocale();

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section label with ShinyText */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          className="text-sm text-muted mb-12"
        >
          {t("subtitle")}
        </motion.p>

        {/* Projects grid with opacity hover effect */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 opacity-container">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={{ pathname: "/portfolio/[slug]", params: { slug: (locale === "ro" ? project.slugRo : project.slugEn) || project.slug } }}
              className={`group opacity-container-child transition-opacity duration-300 block ${index % 2 === 1 ? "mt-[50px]" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Card image area */}
                <div
                  className={`relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02] ${!project.featureImage ? project.bgColor : ""}`}
                >
                  {project.featureImage ? (
                    <img src={project.featureImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span
                      className={`text-7xl sm:text-8xl lg:text-9xl font-bold opacity-20 ${project.letterColor} select-none`}
                    >
                      {project.letter}
                    </span>
                  )}
                  {/* Hover arrow */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                  </div>
                </div>

                {/* Card info */}
                <div className="flex items-start justify-between mt-3 px-1">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted">
                      {locale === "ro"
                        ? project.category_ro
                        : project.category_en}
                    </p>
                  </div>
                  <span className="text-xs text-muted">{project.year}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* View All button - white border style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Magnet strength={0.15} range={120}>
            <Link
              href="/portfolio"
              className="inline-block px-8 py-3 text-sm font-semibold text-foreground border border-white/80 rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
            >
              {t("view_all")}
            </Link>
          </Magnet>
        </motion.div>
      </div>
    </section>
  );
}
