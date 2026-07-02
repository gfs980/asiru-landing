"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { FadeIn } from "./motion";
import { ScrollSegmentProgress, ScrollSlidePanel } from "./scroll-slide-panel";
import { useMediaQuery } from "./use-media-query";
import { useScrollSlideIndex } from "./use-scroll-slide-index";

type FAQSectionProps = {
  dict: Dictionary;
  locale: Locale;
};

export function FAQSection({ dict }: FAQSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const count = dict.faq.items.length;

  if (isDesktop === true && !prefersReducedMotion && count > 1) {
    return <FAQScrollDesktop dict={dict} />;
  }

  return <FAQAccordion dict={dict} />;
}

function FAQScrollDesktop({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const count = dict.faq.items.length;
  const { activeIndex, direction, segmentProgress } = useScrollSlideIndex(
    containerRef,
    count,
  );
  const item = dict.faq.items[activeIndex];

  return (
    <section className="relative border-t border-border bg-muted">
      <div className="grain-overlay" />
      <div ref={containerRef} style={{ height: `${count * 70}vh` }}>
        <div className="sticky top-0 flex min-h-screen flex-col justify-center py-28">
          <div className="mx-auto w-full max-w-3xl px-6">
            <FadeIn className="flex flex-col items-center text-center">
              <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-[var(--brand-dark)] md:text-5xl">
                {dict.faq.title}
              </h2>
              <div className="gold-rule mt-6 w-14" />
            </FadeIn>

            <div className="mt-12">
              <ScrollSlidePanel
                slideKey={item.question}
                direction={direction}
                className="min-h-[220px]"
              >
                <div className="surface-card rounded-3xl p-8 md:p-10">
                  <p className="font-mono-data text-[10px] uppercase tracking-widest text-gold">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(count).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-medium text-[var(--brand-dark)] md:text-2xl">
                    {item.question}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </ScrollSlidePanel>
            </div>

            <ScrollSegmentProgress
              progress={segmentProgress}
              className="mx-auto mt-10 max-w-xs"
            />
            <p className="mt-3 text-center font-mono-data text-[10px] uppercase tracking-widest text-muted-foreground">
              {dict.presentation.scrollHint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQAccordion({ dict }: { dict: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative border-t border-border bg-muted py-28">
      <div className="grain-overlay" />
      <div className="relative mx-auto max-w-3xl px-6">
        <FadeIn className="flex flex-col items-center text-center">
          <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-[var(--brand-dark)] md:text-5xl">
            {dict.faq.title}
          </h2>
          <div className="gold-rule mt-6 w-14" />
        </FadeIn>

        <div className="mt-12 space-y-3">
          {dict.faq.items.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <FadeIn key={item.question} delay={i * 0.05}>
                <div className="surface-card overflow-hidden rounded-2xl">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-[var(--brand-dark)]">{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-gold transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <p className="border-t border-border px-6 py-5 text-sm leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
