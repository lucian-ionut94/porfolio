"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import ShinyText from "./reactbits/ShinyText";
import SplitText from "./reactbits/SplitText";
import { Breadcrumb } from "./Breadcrumb";
import { projects as staticProjects, type Project, type FilterKey } from "@/data/projects";

const filters: { key: FilterKey | "all"; translationKey: string }[] = [
  { key: "all", translationKey: "filter_all" },
  { key: "wordpress", translationKey: "filter_wordpress" },
  { key: "react", translationKey: "filter_react" },
  { key: "laravel", translationKey: "filter_laravel" },
  { key: "opencart", translationKey: "filter_opencart" },
];

export default function PortfolioPageContent({ projects: propProjects }: { projects?: Project[] }) {
  const projects = propProjects ?? staticProjects;
  const t = useTranslations("portfolio");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState<FilterKey | "all">("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumb currentPage={tNav("portfolio")} />

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

        {/* Subtitle + Filters row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm text-muted"
          >
            {t("subtitle")}
          </motion.p>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 shrink-0"
          >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`relative px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 cursor-pointer ${
                activeFilter === filter.key
                  ? "text-black bg-primary border-primary"
                  : "text-muted border-border bg-surface hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {t(filter.translationKey)}
              {activeFilter === filter.key && (
                <motion.span
                  layoutId="activeFilterDot"
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
          </motion.div>
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 opacity-container">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`group opacity-container-child transition-opacity duration-300 ${
                  index % 2 === 1 ? "sm:mt-[50px]" : ""
                }`}
              >
                <Link href={{ pathname: "/portfolio/[slug]", params: { slug: (locale === "ro" ? project.slugRo : project.slugEn) || project.slug } }} className="block">
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

                    {/* View Case Study overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white">
                        {t("view_project")}
                      </span>
                    </div>

                    {/* Tech pills overlay */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-black/40 text-white/80 backdrop-blur-sm border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="mt-3 px-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-xs text-muted mt-1 line-clamp-2">
                          {locale === "ro"
                            ? project.description_ro
                            : project.description_en}
                        </p>
                      </div>
                      <span className="text-xs text-muted ml-4 shrink-0">
                        {project.year}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-muted text-sm">
                {locale === "ro"
                  ? "Niciun proiect în această categorie."
                  : "No projects in this category."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
