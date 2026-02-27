"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ShinyText from "./reactbits/ShinyText";
import Magnet from "./reactbits/Magnet";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const HandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-wave" aria-hidden="true">
    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      <div className="relative z-[2] max-w-7xl mx-auto px-6 sm:px-8 w-full">
        {/* Greeting */}
        <div
          className="mb-8 flex items-center gap-2 animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <HandIcon />
          <ShinyText
            text={t("greeting")}
            className="text-[16px] text-muted"
            speed={4}
          />
        </div>

        {/* Heading - 75% width */}
        <h1
          className="font-display text-[1.8rem] md:text-[3.5rem] font-medium leading-[1.05] tracking-tight mb-8 animate-fade-up"
          style={{ animationDelay: "200ms", maxWidth: "800px" }}
        >
          {t("heading_1")}
          <span className="text-primary">{t("heading_highlight")}</span>
          {t("heading_2")}
        </h1>

        {/* Border left + Description right */}
        <div
          className="flex items-center mb-8 animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          <div className="hidden lg:flex items-center w-1/2 pr-8">
            <div className="h-px bg-border w-full" />
          </div>
          <div className="lg:w-1/2">
            <p className="font-sans text-[16px] text-[#a9a9bd] leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Bottom row: Social links + CTA */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-fade-up"
          style={{ animationDelay: "800ms" }}
        >
          {/* Social Links with Magnet + opacity hover effect */}
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap opacity-container">
            {SOCIAL_LINKS.map((social) => (
              <Magnet key={social.name} strength={0.2} range={80}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-container-child w-9 h-9 rounded-full border border-border flex items-center justify-center text-[#a9a9bd] hover:text-primary hover:border-primary/30 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              </Magnet>
            ))}
          </div>

          {/* CTA Button with text swap + ripple on hover */}
          <Magnet strength={0.15} range={120}>
            <Link
              href="/about"
              className="group relative inline-block rounded-full border border-white/80 px-8 py-3 text-sm font-semibold text-foreground overflow-hidden transition-transform duration-[400ms] hover:scale-x-[1.02] hover:duration-[600ms]"
            >
              <span className="absolute inset-x-0 bottom-0 h-full bg-white rounded-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0,1)] translate-y-full group-hover:translate-y-0" />
              <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[110%]">
                  {t("cta")}
                </span>
                <span className="absolute left-0 top-[110%] w-full text-center text-black transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[110%]">
                  {t("cta_hover")}
                </span>
              </span>
            </Link>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
