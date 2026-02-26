"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import MagicBento from "./reactbits/MagicBento";
import Magnet from "./reactbits/Magnet";
import CTASection from "./CTASection";
import ShinyText from "./reactbits/ShinyText";
import { Breadcrumb } from "./Breadcrumb";
import type { Experience } from "@/lib/queries/experiences";

const techLogos = [
  { name: "HTML", color: "#E34F26" },
  { name: "CSS", color: "#1572B6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "PHP", color: "#777BB4" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "React.js", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "WordPress", color: "#21759B" },
  { name: "OpenCart", color: "#7DC6D4" },
  { name: "Bootstrap", color: "#7952B3" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Photoshop", color: "#31A8FF" },
  { name: "GitHub", color: "#ffffff" },
  { name: "Vercel", color: "#ffffff" },
];


const processSteps = [
  {
    key: "discovery",
    num: "01",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    key: "wireframe",
    num: "02",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      </svg>
    ),
  },
  {
    key: "design",
    num: "03",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    key: "development",
    num: "04",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    key: "qa",
    num: "05",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

function ProcessSlider({ t }: { t: ReturnType<typeof useTranslations<"aboutPage">> }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const directionRef = useRef(1); // 1 = forward, -1 = backward

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const getCardWidth = () => {
      const card = wrapper.querySelector("[data-card]") as HTMLElement | null;
      return card ? card.offsetWidth + 16 : 316;
    };

    // Autoplay: scroll one card forward, bounce back at edges
    const startAutoplay = () => {
      timerRef.current = setInterval(() => {
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
        if (wrapper.scrollLeft >= maxScroll - 2) directionRef.current = -1;
        if (wrapper.scrollLeft <= 2) directionRef.current = 1;
        wrapper.scrollBy({ left: directionRef.current * getCardWidth(), behavior: "smooth" });
      }, 5000);
    };
    startAutoplay();

    // Drag with mouse
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      scrollLeft.current = wrapper.scrollLeft;
      wrapper.setPointerCapture(e.pointerId);
      wrapper.style.scrollSnapType = "none";
      if (timerRef.current) clearInterval(timerRef.current);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const diff = e.clientX - startX.current;
      wrapper.scrollLeft = scrollLeft.current - diff;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      wrapper.releasePointerCapture(e.pointerId);
      wrapper.style.scrollSnapType = "x mandatory";
      startAutoplay();
    };

    wrapper.addEventListener("pointerdown", onPointerDown);
    wrapper.addEventListener("pointermove", onPointerMove);
    wrapper.addEventListener("pointerup", onPointerUp);
    wrapper.addEventListener("pointercancel", onPointerUp);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      wrapper.removeEventListener("pointerdown", onPointerDown);
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerup", onPointerUp);
      wrapper.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
      ref={wrapperRef}
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {processSteps.map((step) => (
        <div
          key={step.key}
          data-card
          className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start rounded-2xl border border-zinc-800 bg-transparent p-6 flex flex-col gap-5"
        >
          <div className="w-12 h-12 rounded-[100px] bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            {step.icon}
          </div>
          <div>
            <h3 className="text-[20px] font-semibold text-[#fff] mb-2">
              {step.num}. {t(`process_steps.${step.key}`)}
            </h3>
            <p className="text-[13px] text-[#a9a9bd] leading-relaxed">
              {t(`process_steps.${step.key}_desc`)}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

const kbRows = [
  ["Q", "W", "E", "R", "T"],
  ["A", "S", "D", "F", "G"],
  ["Z", "X", "C", "V", "B"],
];

function KeyboardVisual() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const allKeys = kbRows.flat();
    const interval = setInterval(() => {
      setActiveKey(allKeys[Math.floor(Math.random() * allKeys.length)]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2.5 opacity-50">
      {/* Connection line */}
      <div className="w-px h-10 bg-zinc-700 mb-1" />
      {kbRows.map((row, ri) => (
        <div key={ri} className="flex gap-2.5">
          {row.map((key) => (
            <div
              key={key}
              className="w-14 h-14 rounded-xl border flex items-center justify-center text-sm font-mono transition-all duration-300"
              style={{
                borderColor: activeKey === key ? "#a3e635" : "#262626",
                background: activeKey === key ? "rgba(163,230,53,0.1)" : "#0a0a0a",
                color: activeKey === key ? "#a3e635" : "#555",
                boxShadow: activeKey === key ? "0 0 16px rgba(163,230,53,0.2)" : "none",
              }}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function TechMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const first = firstRef.current;
    if (!container || !first) return;

    container.appendChild(container.children[0].cloneNode(true));
    container.appendChild(container.children[0].cloneNode(true));

    let offset = 0;
    const speed = 0.2;
    let rafId: number;

    const tick = () => {
      offset += speed;
      if (offset > first.clientWidth) {
        offset = 0;
      }
      first.style.marginLeft = `-${offset}px`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative mb-20 py-6 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <div ref={containerRef} className="flex whitespace-nowrap">
        <div ref={firstRef} className="flex shrink-0">
          {techLogos.map((tech) => (
            <div
              key={tech.name}
              className="inline-flex items-center gap-3 mx-3 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 cursor-default shrink-0"
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: tech.color }}
              />
              <span className="text-sm font-medium text-zinc-300 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RotatingBadge() {
  return (
    <Link
      href="/contact"
      className="group bg-zinc-900 border border-zinc-800 hover:border-lime-400/30 absolute right-3 bottom-3 sm:-right-[20px] sm:-bottom-[20px] aspect-square w-[28%] sm:w-[35%] min-w-[90px] sm:min-w-[110px] max-w-[120px] sm:max-w-[150px] rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
      aria-label="Let's Talk"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id="tc"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        {/* textLength=232 = circumference of r=37 circle, fills path exactly */}
        <text fontSize="9" fill="white" fontFamily="sans-serif" fontWeight="500">
          <textPath href="#tc" textLength="232" lengthAdjust="spacing">
            {"LET'S TALK \u2022 LET'S TALK \u2022 "}
          </textPath>
        </text>
      </svg>

      <div className="w-[42%] h-[42%] rounded-full border border-zinc-700 group-hover:border-lime-400/40 flex items-center justify-center transition-colors duration-300 z-10">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white group-hover:text-lime-400 transition-colors duration-300"
          aria-hidden="true"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </div>
    </Link>
  );
}


interface AboutPageContentProps {
  experiences?: Experience[];
  aboutImage?: string;
}

export default function AboutPageContent({ experiences = [], aboutImage }: AboutPageContentProps) {
  const t = useTranslations("aboutPage");
  const locale = useLocale();

  const bentoCards = [
    {
      label: t("bento.skills.title"),
      title: t("bento.skills.title"),
      description: t("bento.skills.description"),
    },
    {
      label: t("bento.journey.title"),
      title: t("bento.journey.title"),
      description: t("bento.journey.description"),
    },
    {
      label: t("bento.tools.title"),
      title: t("bento.tools.title"),
      description: t("bento.tools.description"),
    },
    {
      label: t("bento.approach.title"),
      title: t("bento.approach.title"),
      description: t("bento.approach.description"),
      visual: <KeyboardVisual />,
    },
    {
      label: t("bento.marketplace.title"),
      title: t("bento.marketplace.title"),
      description: t("bento.marketplace.description"),
    },
    {
      label: t("bento.collaboration.title"),
      title: t("bento.collaboration.title"),
      description: t("bento.collaboration.description"),
    },
  ];

  return (
    <div className="pt-24 pb-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Breadcrumb currentPage={t("title")} />
        {/* Hero section — photo 1/3 left, text 2/3 right */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 items-center lg:items-stretch gap-12 lg:gap-16 mb-20">
          {/* Left 1/3: Photo + Rotating badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-[380px] lg:max-w-none col-span-1 overflow-visible"
          >
            {/* Photo */}
            <div className="w-full aspect-[3/4] rounded-2xl bg-zinc-800 overflow-hidden">
              {aboutImage ? (
                <img
                  src={aboutImage}
                  alt="Lucian Ionuț — Developer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                  <span className="text-6xl font-display font-bold text-zinc-600">
                    LI
                  </span>
                </div>
              )}
            </div>

            {/* Rotating text badge — bottom right */}
            <RotatingBadge />
          </motion.div>

          {/* Right 2/3: Heading + Description + Button */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-2 flex flex-col justify-center"
          >
            <h1 className="font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight mb-8">
              {t("hero_heading_1")}
              <span className="text-primary">{t("hero_highlight")}</span>
              {t("hero_heading_2")}
            </h1>

            <p className="font-sans text-[16px] text-[#a9a9bd] leading-relaxed mb-10 max-w-lg">
              {t("hero_description")}
            </p>

            <div className="self-start">
              <Magnet strength={0.15} range={120}>
                <a
                  href="https://www.linkedin.com/in/lucian-ardeleanu-04977a140/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block rounded-full border border-white/80 px-8 py-3 text-sm font-semibold text-foreground overflow-hidden transition-transform duration-[400ms] hover:scale-x-[1.02] hover:duration-[600ms]"
                >
                  <span className="absolute inset-x-0 bottom-0 h-full bg-white rounded-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0,1)] translate-y-full group-hover:translate-y-0" />
                  <span className="relative block text-center transition-colors duration-500 group-hover:text-black">
                    LinkedIn
                  </span>
                </a>
              </Magnet>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Tech Stack Marquee — full width, requestAnimationFrame */}
      <TechMarquee />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Design Process Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
            <ShinyText
              text={t("process_label")}
              className="text-xs font-semibold uppercase tracking-[0.1em] text-muted"
              speed={4}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display text-[2.5rem] sm:text-[3rem] font-medium leading-[1.1] tracking-tight mb-4"
          >
            {t("process_title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-[15px] text-[#a9a9bd] leading-relaxed mb-10"
          >
            {t("process_description")}
          </motion.p>

          {/* Slider with autoplay */}
          <ProcessSlider t={t} />
        </div>

        {/* Experience Section — 1/3 left, 2/3 right */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
          {/* Left 1/3: Label + Title + Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
              <ShinyText
                text={`${t("experience_label_1")} ${t("experience_label_2")}`}
                className="text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                speed={4}
              />
            </div>

            <h2 className="font-display text-[2.5rem] sm:text-[3rem] font-medium leading-[1.1] tracking-tight mb-4">
              {t("experience_title")}
            </h2>

            <p className="font-sans text-[15px] text-[#a9a9bd] leading-relaxed max-w-sm">
              {t("experience_description")}
            </p>
          </motion.div>

          {/* Right 2/3: Experience list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="col-span-2"
          >
            <div className="divide-y divide-zinc-800">
              {experiences.map((exp, i) => (
                <div
                  key={exp.id ?? i}
                  className="flex items-center gap-4 py-5 first:pt-0"
                >
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: exp.logo_url ? "transparent" : exp.color }}
                  >
                    {exp.logo_url ? (
                      <img
                        src={exp.logo_url}
                        alt={exp.company}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-white text-xs font-bold">
                        {exp.company
                          .split(" ")
                          .map((w: string) => w[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-semibold text-[#fff]">
                      {locale === "ro" ? exp.role_ro || exp.role_en : exp.role_en}
                    </p>
                    <p className="text-[13px] text-[#a9a9bd]">@{exp.company}</p>
                  </div>
                  <span className="text-[13px] text-[#a9a9bd] whitespace-nowrap">
                    {locale === "ro" ? exp.period_ro || exp.period_en : exp.period_en}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bento grid */}
        <MagicBento
          cards={bentoCards}
          textAutoHide
          enableStars
          enableSpotlight
          enableBorderGlow
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="163, 230, 53"
        />
      </div>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
