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
    <section className="bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-border bg-primary-light p-10 md:p-16"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.005 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/60 blur-[80px]" />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                {dict.cta.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {dict.cta.subtitle}
              </p>

              <form
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder={dict.cta.emailPlaceholder}
                  className="rounded-full border border-border bg-background px-6 py-3.5 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  aria-label={dict.cta.emailPlaceholder}
                />
                <button
                  type="submit"
                  className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-primary-hover hover:shadow-[0_8px_24px_var(--primary-glow)]"
                >
                  {dict.cta.button}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </form>

              <p className="mt-4 text-xs text-muted-foreground">
                {dict.cta.note}
              </p>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
