"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Breadcrumb } from "./Breadcrumb";
import { articles as staticArticles, type Article } from "@/data/articles";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

const articleIcons = {
  code: (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  design: (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20" aria-hidden="true">
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  gauge: (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20" aria-hidden="true">
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      <path d="M6 14a4 4 0 0 1 4-4" />
    </svg>
  ),
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "ro" ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlePageContent({ article, articles: propArticles }: { article: Article; articles?: Article[] }) {
  const articles = propArticles ?? staticArticles;
  const t = useTranslations("blog");
  const locale = useLocale();

  const title = locale === "ro" ? article.title_ro : article.title_en;
  const body = locale === "ro" ? article.body_ro : article.body_en;
  const category = locale === "ro" ? article.category_ro : article.category_en;

  // Related articles: same category, excluding current
  const related = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumb currentPage={title} />

        {/* Feature image — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-56 sm:h-72 lg:h-80 rounded-2xl overflow-hidden mb-10"
          style={!article.featureImage ? { background: `linear-gradient(135deg, ${article.bgFrom} 0%, ${article.bgTo} 100%)` } : undefined}
        >
          {article.featureImage ? (
            <img src={article.featureImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <>
              <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br ${article.accent} opacity-20 blur-3xl`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  {articleIcons[article.icon]}
                </div>
              </div>
            </>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14">
          {/* Main content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="rounded-full text-xs bg-primary/10 text-primary border border-primary/30 px-3 py-1">
                {category}
              </span>
              <span className="text-xs text-muted font-mono">
                {formatDate(article.date, locale)}
              </span>
              <span className="text-xs text-muted font-mono">
                {article.readTime} {t("min_read")}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-8 leading-tight">
              {title}
            </h1>

            {/* Body paragraphs */}
            <div className="space-y-5">
              {body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[15px] text-[#c5c5d2] leading-[1.8]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="mt-16 pt-10 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                  {locale === "ro" ? "Articole similare" : "Related Articles"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={{ pathname: "/blog/[slug]", params: { slug: (locale === "ro" ? r.slugRo : r.slugEn) || r.slug } }}
                      className="group p-4 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all duration-300"
                    >
                      <span className="text-xs text-muted font-mono">
                        {locale === "ro" ? r.category_ro : r.category_en}
                      </span>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-1 line-clamp-2">
                        {locale === "ro" ? r.title_ro : r.title_en}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            {/* Author card */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-surface-lighter flex items-center justify-center text-xl font-bold text-primary shrink-0">
                  LI
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Lucian Ionuț
                  </p>
                  <p className="text-xs text-muted">
                    Full-Stack Web Developer
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-4">
                {locale === "ro"
                  ? "Dezvoltator web full-stack cu peste 5 ani de experiență. Specializat în React, Next.js, Laravel și WordPress."
                  : "Full-stack web developer with 5+ years of experience. Specialized in React, Next.js, Laravel, and WordPress."}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all"
                    aria-label={social.name}
                  >
                    <span className="w-[14px] h-[14px] flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Ad banner */}
            {article.adImage && article.adLink ? (
              <a href={article.adLink} target="_blank" rel="noopener noreferrer" className="block rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/30 transition-all">
                <img src={article.adImage} alt="Ad" className="w-full h-auto" />
              </a>
            ) : (
              <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-surface-light to-surface-lighter flex flex-col items-center justify-center gap-3 p-6">
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 12px)" }} />
                  <div className="relative w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-1">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </div>
                  <p className="relative text-xs font-semibold text-foreground text-center">
                    {locale === "ro" ? "Spațiu Publicitar" : "Ad Space"}
                  </p>
                  <p className="relative text-[10px] text-muted text-center leading-relaxed max-w-[180px]">
                    {locale === "ro"
                      ? "Contactează-mă pentru oportunități de colaborare și sponsorizare."
                      : "Get in touch for collaboration and sponsorship opportunities."}
                  </p>
                  <Link
                    href="/contact"
                    className="relative mt-1 px-4 py-1.5 text-[10px] font-medium rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                  >
                    {locale === "ro" ? "Contactează-mă" : "Contact Me"}
                  </Link>
                </div>
              </div>
            )}

            {/* Back to blog */}
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
              {locale === "ro" ? "Toate articolele" : "All Articles"}
            </Link>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
