import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import {
  getProjectBySlug,
  getAllProjectSlugsForLocale,
  getAdjacentProjects,
} from "@/lib/queries/projects";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import { siteUrl, pageAlternates } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const slugs = await getAllProjectSlugsForLocale(locale);
      return slugs.map((slug) => ({ locale, slug }));
    })
  );
  return results.flat();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale);
  if (!project) return {};

  const isRo = locale === "ro";
  const title = (isRo ? project.metaTitleRo : project.metaTitleEn) || project.title;
  const description = (isRo ? project.metaDescRo : project.metaDescEn) || (isRo ? project.description_ro : project.description_en);
  const ogImage = project.featureImage || "/opengraph-image";

  const roSlug = project.slugRo || project.slug;
  const enSlug = project.slugEn || project.slug;

  return {
    title,
    description,
    alternates: {
      canonical: siteUrl(locale, `/portfolio/${slug}`),
      languages: {
        ro: siteUrl("ro", `/portfolio/${roSlug}`),
        en: siteUrl("en", `/portfolio/${enSlug}`),
      },
    },
    openGraph: {
      title,
      description,
      url: siteUrl(locale, `/portfolio/${slug}`),
      type: "article",
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

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug, locale);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(project.slug);
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
        item: siteUrl(locale, "/portfolio"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: siteUrl(locale, `/portfolio/${slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectDetailContent
        project={project}
        prevProject={prev}
        nextProject={next}
      />
    </>
  );
}
