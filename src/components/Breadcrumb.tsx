"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type NavLinkHref = ComponentProps<typeof Link>["href"];

interface BreadcrumbProps {
  currentPage: string;
  parentPage?: string;
  parentHref?: NavLinkHref;
}

export function Breadcrumb({ currentPage, parentPage, parentHref }: BreadcrumbProps) {
  const tNav = useTranslations("nav");

  const chevron = (
    <li aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-border"><path d="m9 18 6-6-6-6" /></svg>
    </li>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Breadcrumb"
      className="mb-[70px]"
    >
      <ol className="flex items-center gap-2 text-xs text-muted font-mono">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            {tNav("home")}
          </Link>
        </li>
        {chevron}
        {parentPage && parentHref ? (
          <>
            <li>
              <Link href={parentHref} className="hover:text-primary transition-colors">
                {parentPage}
              </Link>
            </li>
            {chevron}
          </>
        ) : null}
        <li>
          <span className="text-foreground" aria-current="page">
            {currentPage}
          </span>
        </li>
      </ol>
    </motion.nav>
  );
}
