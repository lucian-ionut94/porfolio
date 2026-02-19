"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  title: string;
  content: ReactNode;
}

interface StepperProps {
  steps: Step[];
  onComplete?: () => void;
  className?: string;
  nextLabel?: string;
  prevLabel?: string;
  completeLabel?: string;
  onBeforeNext?: (current: number) => boolean;
}

export default function Stepper({
  steps,
  onComplete,
  className = "",
  nextLabel = "Next",
  prevLabel = "Back",
  completeLabel = "Submit",
  onBeforeNext,
}: StepperProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    if (onBeforeNext && !onBeforeNext(current)) return;
    if (current < steps.length - 1) {
      setDirection(1);
      setCurrent((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const prev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((prev) => prev - 1);
    }
  };

  const isLast = current === steps.length - 1;

  return (
    <div className={className}>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((step, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                i <= current
                  ? "bg-primary text-background"
                  : "bg-surface-lighter text-muted"
              }`}
            >
              {i < current ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 rounded-full transition-colors duration-300 ${
                  i < current ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step title */}
      <h3 className="text-lg font-semibold text-foreground mb-6">
        {steps[current].title}
      </h3>

      {/* Step content with animation */}
      <div className="relative overflow-hidden min-h-[200px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction * 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {steps[current].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prev}
          disabled={current === 0}
          className="px-5 py-2 text-sm font-medium text-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {prevLabel}
        </button>
        <button
          onClick={next}
          className="px-6 py-2.5 rounded-full bg-primary text-background text-sm font-medium hover:bg-primary-light transition-colors duration-300"
        >
          {isLast ? completeLabel : nextLabel}
        </button>
      </div>
    </div>
  );
}
