import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ro", "en"],
  defaultLocale: "ro",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/about": { en: "/about", ro: "/despre" },
    "/portfolio": { en: "/portfolio", ro: "/portofoliu" },
    "/blog": "/blog",
    "/contact": "/contact",
    "/privacy": "/privacy",
    "/terms": "/terms",
    "/gdpr": "/gdpr",
    "/blog/[slug]": "/blog/[slug]",
    "/portfolio/[slug]": "/portfolio/[slug]",
  },
});
