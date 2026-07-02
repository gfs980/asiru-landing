"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { FadeIn } from "./motion";

type CTASectionProps = {
  dict: Dictionary;
  locale: Locale;
};

export function CTASection({ dict }: CTASectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <motion.div
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--brand-dark)] to-[#1c2a54] p-10 shadow-[0_30px_80px_rgba(19,28,58,0.3)] md:p-16"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.005 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grain-overlay opacity-30" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--gold-glow)] blur-[90px]" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />

            <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
              <h2 className="font-display text-3xl font-medium tracking-[-0.01em] text-white md:text-5xl">
                {dict.cta.title}
              </h2>
              <div className="gold-rule mt-6 w-14" />
              <p className="mt-6 text-lg text-white/70">
                {dict.cta.subtitle}
              </p>

              <form
                className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder={dict.cta.emailPlaceholder}
                  className="rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm text-white placeholder:text-white/50 outline-none backdrop-blur-sm transition-colors focus:border-[var(--gold-soft)] focus:ring-2 focus:ring-[var(--gold-glow)] sm:min-w-[280px]"
                  aria-label={dict.cta.emailPlaceholder}
                />
                <button
                  type="submit"
                  className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-[var(--brand-dark)] transition-all hover:shadow-[0_12px_32px_rgba(255,255,255,0.25)]"
                >
                  {dict.cta.button}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>

              <p className="mt-4 text-xs text-white/50">
                {dict.cta.note}
              </p>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
