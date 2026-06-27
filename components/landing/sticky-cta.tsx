"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type StickyCtaProps = {
  dict: Dictionary;
};

export function StickyCta({ dict }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const hero = document.querySelector('[data-chapter="hook"]');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-20% 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReducedMotion ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2"
        >
          <div className="glass-panel-strong flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 shadow-lg">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {dict.presentation.stickyCtaTitle}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {dict.presentation.stickyCtaSubtitle}
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              {dict.nav.cta}
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
