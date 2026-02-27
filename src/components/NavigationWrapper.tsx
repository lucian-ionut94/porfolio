"use client";

import { useEffect, useState, useRef } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/contact", key: "contact" },
] as const;

const desktopNavItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/contact", key: "contact" },
] as const;

export default function NavigationWrapper() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeRect, setActiveRect] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Recalculate pill position on pathname change or scroll state change
  useEffect(() => {
    const updatePill = () => {
      const activeIndex = desktopNavItems.findIndex((item) =>
        item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
      );
      const activeLink = linksRef.current[activeIndex];
      const nav = navRef.current;
      if (activeLink && nav) {
        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        setActiveRect({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      }
    };

    // Small delay to let layout settle after scroll state change
    const timer = setTimeout(updatePill, 100);
    return () => clearTimeout(timer);
  }, [pathname, scrolled]);

  const switchLocale = () => {
    const newLocale = locale === "ro" ? "en" : "ro";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace({ pathname, params: params as any }, { locale: newLocale });
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto transition-all duration-500 ease-out ${
          scrolled
            ? "mt-3 max-w-[600px] w-[90%]"
            : "mt-0 max-w-[1260px] w-full"
        }`}
      >
        <nav
          className={`transition-all duration-500 flex items-center justify-between ${
            scrolled
              ? "px-3 py-2 rounded-full bg-background/60 backdrop-blur-[12px] shadow-lg shadow-black/10"
              : "px-6 sm:px-8 py-4 bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            title="Acasă"
            className={`group flex items-center gap-1.5 shrink-0 transition-all duration-500`}
          >
            <div className={`transition-all duration-500 ${scrolled ? "w-7 h-7" : "w-8 h-8"}`}>
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M18 2L4 8v10c0 9.05 5.97 17.52 14 20 8.03-2.48 14-10.95 14-20V8L18 2z" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-primary/40 transition-colors duration-300" />
                <path d="M18 5L7 10v7c0 7.42 4.9 14.38 11 16.42 6.1-2.04 11-9 11-16.42v-7L18 5z" fill="currentColor" className="text-primary/5 group-hover:text-primary/10 transition-colors duration-300" />
                <path d="M11 14l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                <path d="M17 22h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary/60" />
              </svg>
            </div>
            <span className={`font-display font-semibold text-foreground tracking-tight transition-all duration-500 ${scrolled ? "text-sm" : "text-base"}`}>
              L.I<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links with pill indicator */}
          <div
            ref={navRef}
            className="hidden md:flex relative items-center gap-0.5"
          >
            {activeRect && (
              <motion.div
                className="absolute h-full rounded-full bg-surface-lighter"
                layoutId="nav-pill"
                animate={{
                  left: activeRect.left - 6,
                  width: activeRect.width + 12,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ top: 0 }}
              />
            )}
            {desktopNavItems.map((item, i) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const label = t(item.key);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  title={label}
                  ref={(el) => {
                    linksRef.current[i] = el;
                  }}
                  className={`group relative z-10 px-3 py-1.5 font-sans text-[14px] font-normal rounded-full ${
                    isActive
                      ? "text-white"
                      : "text-[#a9a9bd]"
                  }`}
                >
                  <span className="relative inline-flex overflow-hidden">
                    <span className="block translate-y-0 skew-y-0 transition-transform duration-500 group-hover:-translate-y-[110%] group-hover:skew-y-12">
                      {label}
                    </span>
                    <span className="absolute block text-white translate-y-[110%] skew-y-12 transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                      {label}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right: Blog icon (mobile) + Language switcher */}
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              title="Blog"
              className={`md:hidden flex items-center gap-1.5 text-muted hover:text-primary transition-all duration-300 ${
                pathname.startsWith("/blog") ? "text-primary" : ""
              }`}
              aria-label="Blog"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                <path d="M18 14h-8" />
                <path d="M15 18h-5" />
                <path d="M10 6h8v4h-8V6Z" />
              </svg>
              <span className="text-xs font-medium">Blog</span>
            </Link>
            <button
              onClick={switchLocale}
              className={`font-medium text-muted hover:text-foreground transition-all duration-300 tracking-wider ${
                scrolled ? "text-[10px]" : "text-xs"
              }`}
              aria-label="Switch language"
            >
              {locale === "ro" ? "EN" : "RO"}
            </button>
          </div>
        </nav>

      </div>
    </header>

    {/* Mobile Bottom Tab Bar */}
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-[12px] border-t border-border/50" style={{ transform: "translateZ(0)" }}>
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              title={t(item.key)}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                isActive ? "text-primary" : "text-muted"
              }`}
            >
              {item.key === "home" && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
              )}
              {item.key === "about" && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
              )}
              {item.key === "portfolio" && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>
              )}
              {item.key === "contact" && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
              )}
              <span className="text-[10px] font-sans font-medium">{t(item.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
    </>
  );
}
