"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import Magnet from "./reactbits/Magnet";
import StarBorder from "./reactbits/StarBorder";
import ScrollFloat from "./reactbits/ScrollFloat";
import SplitText from "./reactbits/SplitText";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-surface border border-border p-10 sm:p-16 text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">
              {t("badge")}
            </span>
          </div>

          {/* Heading with SplitText */}
          <SplitText
            text={t("title")}
            tag="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-8 max-w-lg mx-auto leading-tight"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />

          {/* Button with Magnet + StarBorder */}
          <Magnet strength={0.2} range={150}>
            <StarBorder color="#a3e635" speed="5s">
              <Link
                href="/contact"
                title={t("button")}
                className="block px-8 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
              >
                {t("button")}
              </Link>
            </StarBorder>
          </Magnet>
        </motion.div>
      </div>
    </section>
  );
}
