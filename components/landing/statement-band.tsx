"use client";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { CountUp } from "./count-up";
import { FadeIn } from "./motion";

type StatementBandProps = {
  dict: Dictionary;
  locale: Locale;
};

export function StatementBand({ dict, locale }: StatementBandProps) {
  const band = dict.statementBand;
  const useDisplayFont = locale === "en";

  return (
    <section className="statement-band relative overflow-hidden py-24 md:py-32">
      <div className="statement-band-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="right">
            <blockquote
              className={`text-3xl leading-[1.15] tracking-tight text-white md:text-4xl lg:text-5xl ${
                useDisplayFont ? "font-display font-normal" : "font-sans font-bold"
              }`}
            >
              &ldquo;{band.quote}&rdquo;
            </blockquote>
          </FadeIn>

          <FadeIn direction="left" delay={0.15} className="lg:text-right">
            <div className="font-mono-data text-6xl font-semibold tracking-tight text-white md:text-7xl">
              <CountUp end={band.highlightCount} suffix={band.highlightSuffix} />
            </div>
            <p className="mt-3 text-lg text-white/70">{band.highlightLabel}</p>
            <a
              href="#contact"
              className="mt-8 inline-flex cursor-pointer rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#172554] transition-transform hover:scale-[1.02]"
            >
              {band.cta}
            </a>
            <p className="mt-6 font-mono-data text-[10px] uppercase tracking-widest text-white/40">
              {band.footnote}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
