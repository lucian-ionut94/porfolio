"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface LegalPageProps {
  pageKey: "privacy" | "terms" | "gdpr";
}

export default function LegalPage({ pageKey }: LegalPageProps) {
  const t = useTranslations(pageKey);
  const sections: string[] = t.raw("sections");

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#a9a9bd] hover:text-foreground transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t("back")}
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-3">
          {t("title")}
        </h1>
        <p className="text-sm text-[#a9a9bd] mb-10">
          {t("last_updated")}
        </p>

        <div className="flex flex-col gap-8">
          {sections.map((section: string, i: number) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {t(`section_${i}_title`)}
              </h2>
              <p className="text-[15px] text-[#a9a9bd] leading-relaxed">
                {t(`section_${i}_text`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-[#a9a9bd]">
            {t("contact_note")}{" "}
            <a href="mailto:ardeleanulucianionut@gmail.com" className="text-primary hover:underline">
              ardeleanulucianionut@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
