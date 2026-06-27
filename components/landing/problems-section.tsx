"use client";

import { useRef } from "react";
import { AlertTriangle, Ban, CheckCircle2 } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { FadeIn } from "./motion";
import { ScrollSegmentProgress } from "./scroll-slide-panel";
import { useMediaQuery } from "./use-media-query";
import { useScrollSlideIndex } from "./use-scroll-slide-index";

const icons = [AlertTriangle, Ban, CheckCircle2];

type ProblemsSectionProps = {
  dict: Dictionary;
};

export function ProblemsSection({ dict }: ProblemsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const count = dict.problems.items.length;

  if (isDesktop === null) {
    return <ProblemsStatic dict={dict} />;
  }

  if (isDesktop && !prefersReducedMotion && count > 1) {
    return <ProblemsScrollDesktop dict={dict} count={count} />;
  }

  return <ProblemsStatic dict={dict} />;
}

function ProblemsScrollDesktop({
  dict,
  count,
}: {
  dict: Dictionary;
  count: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeIndex, segmentProgress } = useScrollSlideIndex(
    containerRef,
    count,
  );

  return (
    <section className="bg-background">
      <div ref={containerRef} style={{ height: `${count * 80}vh` }}>
        <div className="sticky top-0 flex min-h-screen flex-col justify-center py-28">
          <div className="mx-auto w-full max-w-7xl px-6">
            <ProblemsHeader dict={dict} />

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {dict.problems.items.map((item, i) => {
                const Icon = icons[i] ?? AlertTriangle;
                const isSolution = i === 2;
                const active = activeIndex === i;

                return (
                  <div
                    key={item.title}
                    className={`h-full rounded-2xl border p-8 transition-all duration-500 ${
                      active
                        ? isSolution
                          ? "scale-100 border-primary/40 bg-primary-light shadow-lg"
                          : "scale-100 border-border bg-background shadow-md"
                        : "scale-[0.97] border-border/60 opacity-40"
                    }`}
                  >
                    <div
                      className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                        isSolution && active ? "bg-primary/15" : "bg-silver"
                      }`}
                    >
                      <Icon
                        size={22}
                        className={
                          isSolution && active
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <ScrollSegmentProgress
              progress={segmentProgress}
              className="mx-auto mt-12 max-w-xs"
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

function ProblemsStatic({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ProblemsHeader dict={dict} />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {dict.problems.items.map((item, i) => {
            const Icon = icons[i] ?? AlertTriangle;
            const isSolution = i === 2;

            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div
                  className={`group h-full rounded-2xl border p-8 transition-all duration-300 ${
                    isSolution
                      ? "border-primary/30 bg-primary-light shadow-md"
                      : "surface-card"
                  }`}
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                      isSolution ? "bg-primary/15" : "bg-silver"
                    }`}
                  >
                    <Icon
                      size={22}
                      className={
                        isSolution ? "text-primary" : "text-muted-foreground"
                      }
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProblemsHeader({ dict }: { dict: Dictionary }) {
  return (
    <FadeIn className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
        {dict.problems.title}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        {dict.problems.subtitle}
      </p>
    </FadeIn>
  );
}
