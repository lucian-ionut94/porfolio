"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import ShinyText from "./reactbits/ShinyText";
import Magnet from "./reactbits/Magnet";
import { articles as staticArticles, type Article } from "@/data/articles";

const articleIcons = {
  code: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  design: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20" aria-hidden="true">
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  gauge: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20" aria-hidden="true">
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

export default function RecentArticles({ articles: propArticles }: { articles?: Article[] }) {
  const articles = propArticles ?? staticArticles;
  const recentArticles = articles.slice(0, 3);
  const t = useTranslations("articles");
  const locale = useLocale();

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
            <ShinyText
              text={t("label")}
              className="text-xs font-semibold uppercase tracking-[0.1em] text-muted"
              speed={4}
            />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium mb-2 tracking-tight">
            {t("title")}
          </h2>

          <p className="text-sm text-muted mb-12">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Articles grid with opacity hover effect */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 opacity-container">
          {recentArticles.map((article, index) => (
            <div
              key={article.id}
              className="group opacity-container-child transition-opacity duration-300"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={{ pathname: "/blog/[slug]", params: { slug: (locale === "ro" ? article.slugRo : article.slugEn) || article.slug } }}
                  title={locale === "ro" ? article.title_ro : article.title_en}
                  className="block rounded-2xl border border-border bg-surface overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-primary/30 group-hover:scale-[1.02]"
                >
                  {/* Feature image area */}
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
                          <div className="w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
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

                  {/* Card content */}
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {locale === "ro" ? article.title_ro : article.title_en}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-5 flex-1">
                      {locale === "ro" ? article.excerpt_ro : article.excerpt_en}
                    </p>

                    {/* Bottom: date + read time */}
                    <div className="flex items-center justify-between text-xs text-muted font-mono">
                      <span>{formatDate(article.date, locale)}</span>
                      <span>
                        {article.readTime} {t("min_read")}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>

        {/* View All button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Magnet strength={0.15} range={120}>
            <Link
              href="/blog"
              title={t("view_all")}
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
