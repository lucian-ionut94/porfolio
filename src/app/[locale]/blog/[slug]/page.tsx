import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getArticleBySlug, getAllArticleSlugsForLocale, getAllArticles } from "@/lib/queries/articles";
import ArticlePageContent from "@/components/ArticlePageContent";
import { siteUrl, pageAlternates } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const slugs = await getAllArticleSlugsForLocale(locale);
      return slugs.map((slug) => ({ locale, slug }));
    })
  );
  return results.flat();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale);
  if (!article) return {};

  const isRo = locale === "ro";
  const title = (isRo ? article.metaTitleRo : article.metaTitleEn) || (isRo ? article.title_ro : article.title_en);
  const description = (isRo ? article.metaDescRo : article.metaDescEn) || (isRo ? article.excerpt_ro : article.excerpt_en);
  const ogImage = article.featureImage || "/opengraph-image";

  const roSlug = article.slugRo || article.slug;
  const enSlug = article.slugEn || article.slug;

  return {
    title,
    description,
    alternates: {
      canonical: siteUrl(locale, `/blog/${slug}`),
      languages: {
        ro: siteUrl("ro", `/blog/${roSlug}`),
        en: siteUrl("en", `/blog/${enSlug}`),
      },
    },
    openGraph: {
      title,
      description,
      url: siteUrl(locale, `/blog/${slug}`),
      type: "article",
      publishedTime: article.date,
      authors: ["Lucian Ionuț"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [article, articles] = await Promise.all([
    getArticleBySlug(slug, locale),
    getAllArticles(),
  ]);
  if (!article) notFound();

  const tNav = await getTranslations("nav");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tNav("home"),
        item: siteUrl(locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tNav("blog"),
        item: siteUrl(locale, "/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: locale === "ro" ? article.title_ro : article.title_en,
        item: siteUrl(locale, `/blog/${slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticlePageContent article={article} articles={articles} />
    </>
  );
}
