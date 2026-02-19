import { setRequestLocale } from "next-intl/server";
import LegalPage from "@/components/LegalPage";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalPage pageKey="privacy" />;
}
