"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/" as const, key: "home" },
  { href: "/about" as const, key: "about" },
  { href: "/portfolio" as const, key: "portfolio" },
  { href: "/contact" as const, key: "contact" },
];

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === "ro" ? "en" : "ro";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace({ pathname, params: params as any }, { locale: newLocale });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="relative w-9 h-9">
              {/* Shield / terminal hybrid shape */}
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Outer shield */}
                <path
                  d="M18 2L4 8v10c0 9.05 5.97 17.52 14 20 8.03-2.48 14-10.95 14-20V8L18 2z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white/20 group-hover:text-primary/40 transition-colors duration-300"
                />
                {/* Inner glow shield */}
                <path
                  d="M18 5L7 10v7c0 7.42 4.9 14.38 11 16.42 6.1-2.04 11-9 11-16.42v-7L18 5z"
                  fill="currentColor"
                  className="text-primary/5 group-hover:text-primary/10 transition-colors duration-300"
                />
                {/* Terminal bracket left */}
                <path
                  d="M11 14l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                />
                {/* Cursor line */}
                <path
                  d="M17 22h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-primary/60"
                />
              </svg>
            </div>
            <span className="text-sm font-display font-semibold text-foreground tracking-tight">
              L.I<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Nav - Centered */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`relative mr-[10px] px-4 py-2 text-sm transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-[16px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                  {t(link.key)}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={switchLocale}
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-muted hover:text-foreground border border-border hover:border-border-light transition-all duration-200"
              aria-label="Switch language"
            >
              {locale === "ro" ? "EN" : "RO"}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 text-sm transition-colors ${
                      isActive ? "text-primary" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
