"use client";

import { Star } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { CountUp } from "./count-up";
import { FadeIn, StaggerContainer, StaggerItem } from "./motion";

type SocialProofSectionProps = {
  dict: Dictionary;
};

export function SocialProofSection({ dict }: SocialProofSectionProps) {
  const sp = dict.socialProof;
  const doubledLogos = [...sp.logos, ...sp.logos];

  return (
    <section className="overflow-hidden border-y border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="font-mono-data text-lg font-semibold">
              {sp.rating}
            </span>
            <span className="text-sm text-muted-foreground">{sp.ratingLabel}</span>
          </div>

          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            {sp.ratingSubtext}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {sp.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="font-mono-data text-3xl font-semibold tracking-tight text-foreground sm:text-4xl metric-pulse">
                  {metric.count !== undefined ? (
                    <CountUp end={metric.count} suffix={metric.suffix} />
                  ) : (
                    metric.value
                  )}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12">
              {doubledLogos.map((logo, i) => (
                <span
                  key={`${logo}-${i}`}
                  className="whitespace-nowrap text-sm font-medium tracking-wide text-muted-foreground/70"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>

        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-3">
          {sp.testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <blockquote className="surface-card flex h-full flex-col rounded-2xl p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-border pt-4">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
