"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "./reactbits/ShinyText";
import SplitText from "./reactbits/SplitText";
import { Breadcrumb } from "./Breadcrumb";
import { articles as staticArticles, type Article, type CategoryKey } from "@/data/articles";

const categories: { key: CategoryKey | "all"; label_en: string; label_ro: string }[] = [
  { key: "all", label_en: "All", label_ro: "Toate" },
  { key: "development", label_en: "Development", label_ro: "Development" },
  { key: "design", label_en: "Design", label_ro: "Design" },
  { key: "performance", label_en: "Performance", label_ro: "Performanță" },
];

const articleIcons = {
  code: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  design: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20" aria-hidden="true">
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  gauge: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20" aria-hidden="true">
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      <path d="M6 14a4 4 0 0 1 4-4" />
    </svg>
  ),
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "ro" ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPageContent({ articles: propArticles }: { articles?: Article[] }) {
  const articles = propArticles ?? staticArticles;
  const t = useTranslations("blog");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">("all");

  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumb currentPage="Blog" />

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

        {/* Subtitle + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm text-muted"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 shrink-0"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.key
                    ? "text-black bg-primary border-primary"
                    : "text-muted border-border bg-surface hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {locale === "ro" ? cat.label_ro : cat.label_en}
                {activeCategory === cat.key && (
                  <motion.span
                    layoutId="blogFilterDot"
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Articles grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 opacity-container">
          <AnimatePresence mode="popLayout">
            {filtered.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group opacity-container-child transition-opacity duration-300"
              >
                <Link href={{ pathname: "/blog/[slug]", params: { slug: (locale === "ro" ? article.slugRo : article.slugEn) || article.slug } }} title={locale === "ro" ? article.title_ro : article.title_en} className="block rounded-2xl border border-border bg-surface overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-primary/30 group-hover:scale-[1.02]">
                  {/* Feature image */}
                  <div
                    className="relative h-44 sm:h-48 overflow-hidden"
                    style={!article.featureImage ? { background: `linear-gradient(135deg, ${article.bgFrom} 0%, ${article.bgTo} 100%)` } : undefined}
                  >
                    {article.featureImage ? (
                      <img src={article.featureImage} alt={locale === "ro" ? article.title_ro : article.title_en} width={800} height={500} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                        <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${article.accent} opacity-20 blur-2xl`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                            {articleIcons[article.icon]}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full text-xs bg-black/40 text-white/90 backdrop-blur-sm border border-white/10 px-3 py-1">
                      {locale === "ro" ? article.category_ro : article.category_en}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {locale === "ro" ? article.title_ro : article.title_en}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-5 flex-1">
                      {locale === "ro" ? article.excerpt_ro : article.excerpt_en}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted font-mono">
                      <span>{formatDate(article.date, locale)}</span>
                      <span>{article.readTime} {t("min_read")}</span>
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
              <p className="text-muted text-sm">{t("empty")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
