"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Lock,
} from "lucide-react";
import { usePrezaToken } from "./preza-token-context";

const ease = [0.22, 1, 0.36, 1] as const;

export function PrezaTokenHeader() {
  const { dict } = usePrezaToken();

  return (
    <header className="preza-header glass-panel-strong fixed inset-x-0 top-0 z-50 border-b border-glass-border">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:h-16 md:px-8">
        <div className="flex items-center gap-3">
          <div className="gold-badge flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold">
            A7
          </div>
          <span className="hidden text-sm font-medium tracking-wide text-[var(--brand-dark)] sm:inline">
            {dict.nav.brand}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-gold" aria-hidden />
          <span className="hidden sm:inline">{dict.nav.confidential}</span>
        </div>
      </div>
    </header>
  );
}

export function PrezaTokenProgress() {
  const { scrollProgress } = usePrezaToken();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-14 z-[60] h-0.5 origin-left bg-gold md:top-16"
      style={{ transform: `scaleX(${scrollProgress})` }}
      aria-hidden
    />
  );
}

export function PrezaTokenRail() {
  const { activeIndex, totalSlides, dict, goToSlide } = usePrezaToken();
  const prefersReducedMotion = useReducedMotion();

  return (
    <aside
      className="preza-rail fixed bottom-24 left-4 z-50 hidden flex-col gap-2 xl:flex"
      aria-label={dict.nav.menu}
    >
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className="group flex cursor-pointer items-center gap-3 rounded-full py-1 pr-3 transition-colors duration-200"
            aria-label={`${dict.nav.slideLabel.replace("{current}", String(index + 1)).replace("{total}", String(totalSlides))}`}
            aria-current={isActive ? "step" : undefined}
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-8 bg-gold"
                  : "w-2 bg-border group-hover:w-4 group-hover:bg-gold-soft"
              }`}
            />
            {isActive && (
              <motion.span
                initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease }}
                className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-gold"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            )}
          </button>
        );
      })}
    </aside>
  );
}

export function PrezaTokenFooter() {
  const { activeIndex, totalSlides, dict, goNext, goPrev } = usePrezaToken();
  const prefersReducedMotion = useReducedMotion();
  const slideLabel = dict.nav.slideLabel
    .replace("{current}", String(activeIndex + 1))
    .replace("{total}", String(totalSlides));

  return (
    <footer className="preza-footer glass-panel-strong fixed inset-x-0 bottom-0 z-50 border-t border-glass-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex === 0}
          className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[var(--brand-dark)] transition-colors duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{dict.nav.prev}</span>
        </button>

        <div className="flex flex-col items-center gap-1">
          <span className="font-mono-data text-xs tracking-wider text-muted-foreground">
            {slideLabel}
          </span>
          {activeIndex < totalSlides - 1 && (
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, 4, 0], opacity: [0.5, 1, 0.5] }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-1 text-[10px] text-gold"
            >
              <ChevronDown className="h-3 w-3" />
              <span className="hidden sm:inline">{dict.nav.scrollHint}</span>
            </motion.div>
          )}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex === totalSlides - 1}
          className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[var(--brand-dark)] transition-colors duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span className="hidden sm:inline">{dict.nav.next}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
