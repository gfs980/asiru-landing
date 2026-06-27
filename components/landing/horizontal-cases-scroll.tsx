"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Building2,
  Hotel,
  Stethoscope,
  UtensilsCrossed,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { PresentationChapter } from "./presentation-chapter";
import { ScrollSegmentProgress, ScrollSlidePanel } from "./scroll-slide-panel";
import { useScrollSlideIndex } from "./use-scroll-slide-index";

const icons = {
  hotel: Hotel,
  property: Building2,
  restaurant: UtensilsCrossed,
  medical: Stethoscope,
} as const;

const accents = [
  "from-blue-600/10 to-primary-light",
  "from-indigo-600/10 to-primary-light",
  "from-sky-600/10 to-primary-light",
  "from-violet-600/10 to-primary-light",
];

type HorizontalCasesScrollProps = {
  dict: Dictionary;
  locale: Locale;
};

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function HorizontalCasesScroll({
  dict,
  locale,
}: HorizontalCasesScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  if (isDesktop === null) {
    return (
      <PresentationChapter id="cases" htmlId="cases">
        <div className="bg-background py-28" aria-hidden />
      </PresentationChapter>
    );
  }

  if (!isDesktop || prefersReducedMotion) {
    return <CasesVerticalLayout dict={dict} locale={locale} />;
  }

  return <CasesScrollDesktop dict={dict} locale={locale} />;
}

type CasesScrollDesktopProps = {
  dict: Dictionary;
  locale: Locale;
};

function CasesScrollDesktop({ dict, locale }: CasesScrollDesktopProps) {
  const cs = dict.caseStudies;
  const useDisplayFont = locale === "en";
  const containerRef = useRef<HTMLDivElement>(null);
  const count = cs.items.length;

  const { activeIndex, direction, segmentProgress } = useScrollSlideIndex(
    containerRef,
    count,
  );

  const item = cs.items[activeIndex];

  return (
    <PresentationChapter id="cases" htmlId="cases">
      <div
        ref={containerRef}
        className="bg-background"
        style={{ height: `${count * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <CasesHeader cs={cs} useDisplayFont={useDisplayFont} />
          <div className="relative mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-6 pb-10">
            <ScrollSlidePanel
              slideKey={item.id}
              direction={direction}
              className="relative min-h-0 flex-1 rounded-3xl"
            >
              <CaseCard item={item} index={activeIndex} cs={cs} slide />
            </ScrollSlidePanel>

            <CaseDots count={count} active={activeIndex} />
            <ScrollSegmentProgress progress={segmentProgress} className="mt-4" />
            <p className="mt-3 text-center font-mono-data text-[10px] uppercase tracking-widest text-muted-foreground">
              {dict.presentation.scrollHint}
            </p>
          </div>
        </div>
      </div>
    </PresentationChapter>
  );
}

function CasesVerticalLayout({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const cs = dict.caseStudies;
  const useDisplayFont = locale === "en";

  return (
    <PresentationChapter id="cases" htmlId="cases">
      <div className="bg-background py-28">
        <div className="mx-auto max-w-7xl px-6">
          <CasesHeader cs={cs} useDisplayFont={useDisplayFont} />
          <div className="mt-12 space-y-6">
            {cs.items.map((item, i) => (
              <CaseCard key={item.id} item={item} index={i} cs={cs} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="#contact"
              className="inline-flex cursor-pointer rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              {cs.cta}
            </a>
          </div>
        </div>
      </div>
    </PresentationChapter>
  );
}

function CasesHeader({
  cs,
  useDisplayFont,
}: {
  cs: Dictionary["caseStudies"];
  useDisplayFont: boolean;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-28 pb-8 lg:pt-24">
      <h2
        className={`text-3xl tracking-tight md:text-5xl ${
          useDisplayFont ? "font-display font-normal" : "font-sans font-bold"
        }`}
      >
        {cs.title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {cs.subtitle}
      </p>
    </div>
  );
}

function CaseDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i === active ? "w-8 bg-primary" : "w-1.5 bg-border"
          }`}
        />
      ))}
    </div>
  );
}

type CaseItem = Dictionary["caseStudies"]["items"][number];

function CaseCard({
  item,
  index,
  cs,
  slide = false,
}: {
  item: CaseItem;
  index: number;
  cs: Dictionary["caseStudies"];
  slide?: boolean;
}) {
  const Icon = icons[item.id as keyof typeof icons] ?? Building2;

  return (
    <article
      className={`flex flex-col rounded-3xl border border-border bg-gradient-to-br p-8 md:p-10 ${
        accents[index % accents.length]
      } ${slide ? "h-full" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono-data text-[10px] uppercase tracking-widest text-primary">
            {item.category}
          </span>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            {item.title}
          </h3>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background/80 shadow-sm">
          <Icon size={22} className="text-primary" />
        </div>
      </div>

      <div className="mt-8 grid flex-1 gap-6 md:grid-cols-3">
        <div>
          <p className="font-mono-data text-[10px] uppercase tracking-widest text-muted-foreground">
            {cs.problemLabel}
          </p>
          <p className="mt-2 text-sm leading-relaxed">{item.problem}</p>
        </div>
        <div>
          <p className="font-mono-data text-[10px] uppercase tracking-widest text-muted-foreground">
            {cs.solutionLabel}
          </p>
          <p className="mt-2 text-sm leading-relaxed">{item.solution}</p>
        </div>
        <div>
          <p className="font-mono-data text-[10px] uppercase tracking-widest text-muted-foreground">
            {cs.resultLabel}
          </p>
          <p className="mt-2 text-sm leading-relaxed">{item.result}</p>
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between border-t border-border/60 pt-6">
        <div>
          <div className="font-mono-data text-4xl font-semibold text-primary">
            {item.metric}
          </div>
          <div className="text-sm text-muted-foreground">{item.metricLabel}</div>
        </div>
        <a
          href="#contact"
          className="cursor-pointer text-sm font-medium text-primary hover:underline"
        >
          {cs.cta} →
        </a>
      </div>
    </article>
  );
}
