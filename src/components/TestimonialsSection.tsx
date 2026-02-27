"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "./reactbits/ShinyText";
import SplitText from "./reactbits/SplitText";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  text_ro: string;
  text_en: string;
  avatar_url?: string;
  link_url?: string;
  sort_order: number;
}

const staticTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Client Name",
    title: "CEO @ Company",
    text_ro: "Am colaborat cu Lucian pentru dezvoltarea site-ului nostru și rezultatele au fost excepționale. Profesionalism și calitate la cel mai înalt nivel.",
    text_en: "I collaborated with Lucian on developing our website and the results were exceptional. Professionalism and quality at the highest level.",
    avatar_url: "",
    link_url: "",
    sort_order: 0,
  },
  {
    id: "2",
    name: "Client Name",
    title: "Founder @ Startup",
    text_ro: "Lucian a transformat viziunea noastră într-o aplicație web modernă și performantă. Recomand cu încredere serviciile sale.",
    text_en: "Lucian transformed our vision into a modern and performant web application. I confidently recommend his services.",
    avatar_url: "",
    link_url: "",
    sort_order: 1,
  },
  {
    id: "3",
    name: "Client Name",
    title: "Marketing Director",
    text_ro: "Un dezvoltator excepțional care înțelege atât partea tehnică cât și nevoile de business. Tema WordPress creată de Lucian a crescut conversiile cu 40%.",
    text_en: "An exceptional developer who understands both the technical side and business needs. The WordPress theme created by Lucian increased conversions by 40%.",
    avatar_url: "",
    link_url: "",
    sort_order: 2,
  },
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({ testimonials: propTestimonials }: TestimonialsSectionProps) {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(propTestimonials ?? staticTestimonials);

  // Fetch from DB if no props given
  useEffect(() => {
    if (propTestimonials && propTestimonials.length > 0) {
      setTestimonials(propTestimonials);
      return;
    }
    fetch("/api/testimonials")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data);
      })
      .catch(() => {});
  }, [propTestimonials]);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = useCallback(() =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1)), [testimonials.length]);

  const getText = (testimonial: Testimonial) =>
    locale === "ro" ? testimonial.text_ro : testimonial.text_en;

  const linkedInLink = SOCIAL_LINKS.find((s) => s.name === "LinkedIn");

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, current]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section label with ShinyText */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
          <ShinyText
            text={t("label")}
            className="text-xs font-semibold uppercase tracking-[0.1em] text-muted"
            speed={4}
          />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-start">
          {/* Left - Title */}
          <div>
            <SplitText
              text={t("title")}
              tag="h2"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium mb-4 tracking-tight"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm text-muted leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>
            {linkedInLink && (
              <a
                href={linkedInLink.href}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="underline-link font-sans text-[14px] text-white hover:text-white transition-colors inline-flex items-center gap-1.5 mt-4"
              >
                {t("check_linkedin")}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
              </a>
            )}
          </div>

          {/* Right - Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-border bg-surface p-6 md:p-8"
              >
                {/* Author with progress circle border */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative h-fit w-fit min-w-fit rounded-full p-1">
                    {/* Avatar */}
                    {testimonials[current].avatar_url ? (
                      <img
                        src={testimonials[current].avatar_url}
                        alt={testimonials[current].name}
                        width={64}
                        height={64}
                        className="h-16 w-16 min-w-fit rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 min-w-fit rounded-full bg-surface-lighter flex items-center justify-center text-xl font-bold text-primary">
                        {testimonials[current].name[0]}
                      </div>
                    )}
                    {/* Progress border SVG */}
                    <svg
                      key={current}
                      width="76"
                      height="76"
                      viewBox="0 0 150 150"
                      className="absolute -top-[2px] -left-[2px]"
                    >
                      <circle cx="75" cy="75" r="70" fill="none" strokeWidth="4" className="stroke-border" />
                      <circle
                        cx="75" cy="75" r="70" fill="none"
                        strokeDasharray="440"
                        strokeDashoffset="440"
                        strokeLinecap="round"
                        strokeWidth="4"
                        transform="rotate(-90 75 75)"
                        className="stroke-primary"
                      >
                        <animate attributeName="stroke-dashoffset" dur="6s" from="440" to="0" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-[16px] font-semibold" style={{ color: "#fff" }}>
                      {testimonials[current].name}
                    </p>
                    <p className="font-sans text-muted" style={{ fontSize: "14px" }}>
                      {testimonials[current].title}
                    </p>
                    {testimonials[current].link_url && (
                      <a
                        href={testimonials[current].link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`LinkedIn — ${testimonials[current].name}`}
                        className="inline-flex items-center gap-1 text-[12px] text-primary hover:text-primary/80 mt-0.5"
                      >
                        LinkedIn <ArrowUpRight />
                      </a>
                    )}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-[#e5e5e5] leading-relaxed italic">
                  &ldquo;{getText(testimonials[current])}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom: Navigation */}
        <div className="flex items-center justify-end mt-8">
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary/30 transition-all"
              aria-label="Previous testimonial"
            >
              <ArrowLeft />
            </button>
            <span className="text-xs text-muted font-mono">
              {current + 1} / {testimonials.length}
            </span>
            <button
              onClick={next}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-primary/30 transition-all"
              aria-label="Next testimonial"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
