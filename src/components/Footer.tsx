"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

const navLinks = [
  { key: "nav_home", href: "/" as const },
  { key: "nav_about", href: "/about" as const },
  { key: "nav_projects", href: "/portfolio" as const },
  { key: "nav_blog", href: "/blog" as const },
  { key: "nav_contact", href: "/contact" as const },
];

const legalLinks = [
  { key: "privacy", href: "/privacy" as const },
  { key: "terms", href: "/terms" as const },
  { key: "gdpr", href: "/gdpr" as const },
];

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 py-14">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M18 2L4 8v10c0 9.05 5.97 17.52 14 20 8.03-2.48 14-10.95 14-20V8L18 2z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-primary/40 transition-colors duration-300" />
                  <path d="M18 5L7 10v7c0 7.42 4.9 14.38 11 16.42 6.1-2.04 11-9 11-16.42v-7L18 5z" fill="currentColor" className="text-primary/5 group-hover:text-primary/10 transition-colors duration-300" />
                  <path d="M11 14l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                  <path d="M17 22h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/60" />
                </svg>
              </div>
              <span className="text-xl font-display font-semibold text-foreground">
                L.I<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-[15px] text-[#a9a9bd] leading-relaxed max-w-sm mb-6">
              {t("tagline")}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 flex-wrap">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-[#a9a9bd] hover:text-primary hover:border-primary/30 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t("navigation")}
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-[#a9a9bd] hover:text-foreground transition-colors duration-200"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t("legal")}
            </h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-[#a9a9bd] hover:text-foreground transition-colors duration-200"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {t("contact_title")}
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:contact@lucianionut.ro"
                  className="text-[15px] text-[#a9a9bd] hover:text-foreground transition-colors duration-200"
                >
                  contact@lucianionut.ro
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-[13px] text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {t("available")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-[#a9a9bd]">
            &copy; {new Date().getFullYear()} Lucian Ionuț. {t("rights")}
          </p>
          <p className="text-[13px] text-[#a9a9bd]">
            {t("made_with")}
          </p>
        </div>
      </div>
    </footer>
  );
}
