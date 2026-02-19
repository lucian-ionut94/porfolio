import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavigationWrapper from "@/components/NavigationWrapper";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import CookieConsent from "@/components/CookieConsent";
import { siteUrl } from "@/lib/site-url";

const Chatbot = dynamic(() => import("@/components/Chatbot"));
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"));

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: siteUrl(locale),
      languages: {
        ro: siteUrl("ro"),
        en: siteUrl("en"),
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "ro" ? "ro_RO" : "en_US",
      url: siteUrl(locale),
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lucian Ionuț — Full-Stack Web Developer" }],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ro" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ProgressBar />
      <SmoothScroll />
      <NavigationWrapper />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Chatbot />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}
