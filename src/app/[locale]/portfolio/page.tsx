import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import PortfolioPageContent from "@/components/PortfolioPageContent";
import { getAllProjects } from "@/lib/queries/projects";
import { getPageSeo } from "@/lib/queries/page-seo";
import { siteUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRo = locale === "ro";
  const seo = await getPageSeo("portfolio");

  const defaultTitle = isRo ? "Portofoliu" : "Portfolio";
  const defaultDesc = isRo
    ? "Proiectele mele — de la teme WordPress premium la aplicații React și Laravel."
    : "My projects — from premium WordPress themes to React and Laravel applications.";

  const title = (isRo ? seo.metaTitleRo : seo.metaTitleEn) || defaultTitle;
  const description = (isRo ? seo.metaDescRo : seo.metaDescEn) || defaultDesc;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl(locale, "/portfolio"),
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

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("portfolio");
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
        name: tNav("portfolio"),
        item: `https://lucianionut.com/${locale}/portfolio`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PortfolioPageContent projects={await getAllProjects()} />
    </>
  );
}
