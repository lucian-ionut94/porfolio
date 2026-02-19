"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

interface DockItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface DockProps {
  items: DockItem[];
  className?: string;
}

export default function Dock({ items, className = "" }: DockProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();

  const switchLocale = () => {
    const newLocale = locale === "ro" ? "en" : "ro";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace({ pathname, params: params as any }, { locale: newLocale });
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 25 }}
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 ${className}`}
    >
      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-background/80 backdrop-blur-xl border border-border shadow-lg shadow-black/30">
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={item.href as any}
              className="relative group"
            >
              <motion.div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted hover:text-foreground hover:bg-surface-lighter"
                }`}
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {item.icon}
              </motion.div>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-medium text-foreground bg-surface rounded-md border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="dock-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                />
              )}
            </Link>
          );
        })}
        <div className="w-px h-6 bg-border mx-1" />
        <motion.button
          onClick={switchLocale}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-muted hover:text-foreground hover:bg-surface-lighter transition-colors"
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Switch language"
        >
          {locale === "ro" ? "EN" : "RO"}
        </motion.button>
      </div>
    </motion.nav>
  );
}
