"use client";

import { useEffect, useState, useRef } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

interface NavItem {
  href: string;
  key: string;
}

interface PillNavProps {
  items: NavItem[];
  className?: string;
}

export default function PillNav({ items, className = "" }: PillNavProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [activeRect, setActiveRect] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeIndex = items.findIndex((item) =>
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
  }, [pathname, items]);

  const switchLocale = () => {
    const newLocale = locale === "ro" ? "en" : "ro";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace({ pathname, params: params as any }, { locale: newLocale });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${className}`}
    >
      <div
        className={`flex items-center gap-1 rounded-full border transition-all duration-500 ${
          scrolled
            ? "px-2 py-1.5 bg-background/80 backdrop-blur-xl border-border shadow-lg shadow-black/20"
            : "px-3 py-2 bg-background/50 backdrop-blur-md border-border/50"
        }`}
      >
        <div className="relative flex items-center gap-0.5">
          {activeRect && (
            <motion.div
              className="absolute h-full rounded-full bg-surface-lighter"
              layoutId="pillnav-active"
              animate={{ left: activeRect.left - 4, width: activeRect.width + 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ top: 0 }}
            />
          )}
          {items.map((item, i) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={item.href as any}
                ref={(el) => {
                  linksRef.current[i] = el;
                }}
                className={`relative z-10 px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </div>
        <div className="w-px h-4 bg-border mx-1" />
        <button
          onClick={switchLocale}
          className="px-2 py-1.5 text-xs font-medium text-muted hover:text-foreground rounded-full hover:bg-surface-lighter transition-all duration-200"
          aria-label="Switch language"
        >
          {locale === "ro" ? "EN" : "RO"}
        </button>
      </div>
    </nav>
  );
}
