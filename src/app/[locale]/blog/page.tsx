import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import BlogPageContent from "@/components/BlogPageContent";
import { getAllArticles } from "@/lib/queries/articles";
import { getPageSeo } from "@/lib/queries/page-seo";
import { siteUrl, pageAlternates } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRo = locale === "ro";
  const seo = await getPageSeo("blog");

  const defaultDesc = isRo
    ? "Articole despre dezvoltare web, design și performanță."
    : "Articles about web development, design and performance.";

  const title = (isRo ? seo.metaTitleRo : seo.metaTitleEn) || "Blog";
  const description = (isRo ? seo.metaDescRo : seo.metaDescEn) || defaultDesc;

  return {
    title,
    description,
    alternates: pageAlternates(locale, "/blog"),
    openGraph: {
      title,
      description,
      url: siteUrl(locale, "/blog"),
      ...(seo.ogImage && { images: [{ url: seo.ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(seo.ogImage && { images: [seo.ogImage] }),
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPageContent articles={await getAllArticles()} />
    </>
  );
}
