"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const GA_ID = "G-QY89V1JETV";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
  }
}

function loadGA() {
  if (typeof window === "undefined") return;
  if (document.getElementById("ga-script")) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const script = document.createElement("script");
  script.id = "ga-script";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const t = useTranslations("cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "accepted") {
      loadGA();
    } else if (!consent) {
      // Small delay so it doesn't pop up immediately on page load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    loadGA();
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", "essential");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70] w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-md shadow-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Lime accent top line */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-lime-400/40 to-transparent" />

            {/* Icon */}
            <div className="w-9 h-9 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center shrink-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-lime-400"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="!text-[14px] text-zinc-400 leading-relaxed line-clamp-2">
                {t("message")}{" "}
                <Link
                  href="/privacy"
                  className="text-lime-400 hover:text-lime-300 underline underline-offset-2 transition-colors"
                >
                  {t("privacy_policy")}
                </Link>
                .
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={reject}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                {t("essential_only")}
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-lime-400 text-zinc-900 hover:bg-lime-300 transition-colors"
              >
                {t("accept_all")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
