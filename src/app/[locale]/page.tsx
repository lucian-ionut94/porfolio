import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import { getAllProjects } from "@/lib/queries/projects";
import { getAllArticles } from "@/lib/queries/articles";
import { getPageSeo } from "@/lib/queries/page-seo";
import { pageAlternates } from "@/lib/site-url";
import { getAllTestimonials } from "@/lib/queries/testimonials";
import { getSiteSettings } from "@/lib/queries/site-settings";

const Marquee = dynamic(() => import("@/components/Marquee"));
const AboutPreview = dynamic(() => import("@/components/AboutPreview"));
const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"));
const ExpertiseSection = dynamic(() => import("@/components/ExpertiseSection"));
const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection")
);
const RecentArticles = dynamic(() => import("@/components/RecentArticles"));
const CTASection = dynamic(() => import("@/components/CTASection"));

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRo = locale === "ro";
  const [seo, t] = await Promise.all([
    getPageSeo("home"),
    getTranslations({ locale, namespace: "metadata" }),
  ]);

  const title = (isRo ? seo.metaTitleRo : seo.metaTitleEn) || t("title");
  const description = (isRo ? seo.metaDescRo : seo.metaDescEn) || t("description");

  return {
    title,
    description,
    alternates: pageAlternates(locale),
    ...(seo.ogImage && {
      openGraph: { images: [{ url: seo.ogImage, width: 1200, height: 630 }] },
      twitter: { card: "summary_large_image" as const, images: [seo.ogImage] },
    }),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [projects, articles, testimonials, settings] = await Promise.all([
    getAllProjects(),
    getAllArticles(),
    getAllTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero />
      <Marquee />
      <AboutPreview />
      <FeaturedProjects projects={projects} />
      <ExpertiseSection expertiseImages={{
        development: settings.expertise_image_development,
        uiux: settings.expertise_image_uiux,
        branding: settings.expertise_image_branding,
      }} />
      <TestimonialsSection testimonials={testimonials} />
      <RecentArticles articles={articles} />
      <CTASection />
    </>
  );
}
