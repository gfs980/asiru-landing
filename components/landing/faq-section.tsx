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

export function FAQSection({ dict, locale }: FAQSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const useDisplayFont = locale === "en";
  const count = dict.faq.items.length;

  if (isDesktop === true && !prefersReducedMotion && count > 1) {
    return (
      <FAQScrollDesktop dict={dict} useDisplayFont={useDisplayFont} />
    );
  }

  return <FAQAccordion dict={dict} useDisplayFont={useDisplayFont} />;
}

function FAQScrollDesktop({
  dict,
  useDisplayFont,
}: {
  dict: Dictionary;
  useDisplayFont: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const count = dict.faq.items.length;
  const { activeIndex, direction, segmentProgress } = useScrollSlideIndex(
    containerRef,
    count,
  );
  const item = dict.faq.items[activeIndex];

  return (
    <section className="border-t border-border bg-background">
      <div ref={containerRef} style={{ height: `${count * 70}vh` }}>
        <div className="sticky top-0 flex min-h-screen flex-col justify-center py-28">
          <div className="mx-auto w-full max-w-3xl px-6">
            <FadeIn className="text-center">
              <h2
                className={`text-3xl tracking-tight md:text-5xl ${
                  useDisplayFont
                    ? "font-display font-normal"
                    : "font-sans font-bold"
                }`}
              >
                {dict.faq.title}
              </h2>
            </FadeIn>

            <div className="mt-12">
              <ScrollSlidePanel
                slideKey={item.question}
                direction={direction}
                className="min-h-[220px]"
              >
                <div className="rounded-3xl border border-border bg-background p-8 shadow-sm md:p-10">
                  <p className="font-mono-data text-[10px] uppercase tracking-widest text-primary">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(count).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold md:text-2xl">
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

function FAQAccordion({
  dict,
  useDisplayFont,
}: {
  dict: Dictionary;
  useDisplayFont: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-border bg-background py-28">
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn className="text-center">
          <h2
            className={`text-3xl tracking-tight md:text-5xl ${
              useDisplayFont ? "font-display font-normal" : "font-sans font-bold"
            }`}
          >
            {dict.faq.title}
          </h2>
        </FadeIn>

        <div className="mt-12 space-y-3">
          {dict.faq.items.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <FadeIn key={item.question} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium">{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
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
