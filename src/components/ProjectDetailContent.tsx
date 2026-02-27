"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ShinyText from "./reactbits/ShinyText";
import SplitText from "./reactbits/SplitText";
import { Breadcrumb } from "./Breadcrumb";
import type { Project } from "@/data/projects";

const ProjectVideoShowcase = dynamic(
  () => import("./ProjectVideoShowcase"),
  { ssr: false, loading: () => <div className="h-[500px]" /> }
);

interface ProjectDetailContentProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectDetailContent({
  project,
  prevProject,
  nextProject,
}: ProjectDetailContentProps) {
  const t = useTranslations("projectDetail");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const isRo = locale === "ro";

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Breadcrumb */}
        <Breadcrumb
          currentPage={project.title}
          parentPage={tNav("portfolio")}
          parentHref="/portfolio"
        />

        {/* Hero Section */}
        <section className="mb-16 md:mb-24">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-2 mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
              aria-hidden="true"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
            </svg>
            <ShinyText
              text={t("label")}
              className="text-xs font-semibold uppercase tracking-[0.1em] text-muted"
              speed={4}
            />
          </motion.div>

          {/* Title + CTA row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <SplitText
              text={project.title}
              tag="h1"
              className="font-display text-3xl sm:text-4xl lg:text-6xl font-medium tracking-tight"
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
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex gap-3 shrink-0 sm:mt-2"
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t("live_preview")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold border border-white/20 text-foreground rounded-full transition-all duration-300 hover:bg-white/5 hover:scale-105"
                >
                  {t("live_preview")}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t("source_code")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold border border-white/20 text-foreground rounded-full transition-all duration-300 hover:bg-white/5 hover:scale-105"
                >
                  {t("source_code")}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>
                </a>
              )}
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm md:text-base text-muted max-w-2xl mb-8"
          >
            {isRo ? project.description_ro : project.description_en}
          </motion.p>

          {/* Tech pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3"
          >
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full border border-white/10 bg-surface text-muted"
              >
                {tech}
              </span>
            ))}
            <span className="text-xs text-muted ml-2">{project.year}</span>
          </motion.div>

          {/* Full-width banner */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`relative mt-12 h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden flex items-center justify-center ${!project.featureImage ? project.bgColor : ""}`}
          >
            {project.featureImage ? (
              <img src={project.featureImage} alt={project.title} width={1280} height={720} className="absolute inset-0 w-full h-full object-cover object-top" />
            ) : (
              <span
                className={`text-8xl sm:text-9xl lg:text-[12rem] font-bold opacity-20 ${project.letterColor} select-none`}
              >
                {project.letter}
              </span>
            )}
          </motion.div>
        </section>

        {/* Overview */}
        <section className="mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-4"
          >
            {t("overview")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="h-px bg-white/10 mb-8 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm md:text-base leading-relaxed text-muted mb-8"
          >
            {isRo ? project.challenge_ro : project.challenge_en}
          </motion.p>
          <motion.ul
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-3"
          >
            {(isRo ? project.features_ro : project.features_en).map(
              (feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-muted"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary shrink-0 mt-0.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {feature}
                </li>
              )
            )}
          </motion.ul>
        </section>

        {/* Video Showcase — only if videos exist */}
        {(project.videoDesktop || project.videoMobile) && (
          <section className="mb-16 md:mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-0 text-center"
            >
              {t("preview")}
            </motion.h2>
            <ProjectVideoShowcase
              desktopSrc={project.videoDesktop}
              mobileSrc={project.videoMobile}
              accentColor={project.accentColor}
              title={project.title}
            />
          </section>
        )}

        {/* Results */}
        <section className="mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-4"
          >
            {t("the_results")}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            className="h-px bg-white/10 mb-8 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm md:text-base leading-relaxed text-muted max-w-3xl"
          >
            {isRo ? project.results_ro : project.results_en}
          </motion.p>
        </section>

        {/* Project Navigation */}
        <section className="pt-12 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
            {/* Previous */}
            <div className="flex-1">
              {prevProject && (
                <Link
                  href={{ pathname: "/portfolio/[slug]", params: { slug: (locale === "ro" ? prevProject.slugRo : prevProject.slugEn) || prevProject.slug } }}
                  title={prevProject.title}
                  className="group flex items-center gap-3 text-muted hover:text-foreground transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:-translate-x-1"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted">
                      {t("prev_project")}
                    </p>
                    <p className="text-sm font-medium">{prevProject.title}</p>
                  </div>
                </Link>
              )}
            </div>

            {/* Back to all */}
            <Link
              href="/portfolio"
              title={t("back_to_all")}
              className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold border border-white/20 text-foreground rounded-full transition-all duration-300 hover:bg-white/5"
            >
              {t("back_to_all")}
            </Link>

            {/* Next */}
            <div className="flex-1 text-right">
              {nextProject && (
                <Link
                  href={{ pathname: "/portfolio/[slug]", params: { slug: (locale === "ro" ? nextProject.slugRo : nextProject.slugEn) || nextProject.slug } }}
                  title={nextProject.title}
                  className="group inline-flex items-center gap-3 text-muted hover:text-foreground transition-colors"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted">
                      {t("next_project")}
                    </p>
                    <p className="text-sm font-medium">{nextProject.title}</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
