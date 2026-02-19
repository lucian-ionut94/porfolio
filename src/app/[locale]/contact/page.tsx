import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import ContactPageContent from "@/components/ContactPageContent";
import { getPageSeo } from "@/lib/queries/page-seo";
import { siteUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRo = locale === "ro";
  const seo = await getPageSeo("contact");

  const title = (isRo ? seo.metaTitleRo : seo.metaTitleEn) || undefined;
  const description = (isRo ? seo.metaDescRo : seo.metaDescEn) || undefined;

  return {
    ...(title && { title }),
    ...(description && { description }),
    openGraph: {
      ...(title && { title }),
      ...(description && { description }),
      url: siteUrl(locale, "/contact"),
      ...(seo.ogImage && { images: [{ url: seo.ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      ...(seo.ogImage && { images: [seo.ogImage] }),
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
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
        name: t("title"),
        item: siteUrl(locale, "/contact"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactPageContent />
    </>
  );
}
