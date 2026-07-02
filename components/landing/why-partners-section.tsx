"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  Handshake,
  Percent,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { PresentationChapter } from "./presentation-chapter";

type WhyPartnersSectionProps = {
  dict: Dictionary;
  locale: Locale;
};

const benefitIcons: LucideIcon[] = [
  TrendingUp,
  Handshake,
  Users,
  Globe,
  ShieldCheck,
  Percent,
];

export function WhyPartnersSection({ dict }: WhyPartnersSectionProps) {
  const section = dict.whyPartners;
  const prefersReducedMotion = useReducedMotion();

  return (
    <PresentationChapter id="why" htmlId="why" showLabel>
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center">
            <h2 className="mx-auto max-w-3xl text-center font-display text-[clamp(1.9rem,4.2vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.02em] text-[var(--brand-dark)]">
              {section.title}
            </h2>
            <div className="gold-rule mt-6 w-14" />
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-6">
            {section.benefits.map((benefit, index) => {
              const Icon = benefitIcons[index] ?? TrendingUp;

              return (
                <motion.div
                  key={benefit.title}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.55,
                    delay: prefersReducedMotion ? 0 : index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="surface-card flex flex-col items-center rounded-3xl px-6 py-10 text-center"
                >
                  <span className="gold-badge flex h-16 w-16 items-center justify-center rounded-full">
                    <Icon size={26} strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-6 font-display text-lg font-medium leading-snug text-[var(--brand-dark)] md:text-xl">
                    {benefit.title}
                  </h3>
                  <span className="gold-rule mt-4 w-8" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="relative mt-6 flex items-center gap-5 overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand-dark)] to-[#1c2a54] px-6 py-8 shadow-[0_20px_50px_rgba(19,28,58,0.22)] md:mt-8 md:gap-7 md:px-12 md:py-10">
            <div className="grain-overlay opacity-30" />
            <span className="gold-badge relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full md:h-16 md:w-16">
              <Handshake size={28} strokeWidth={1.4} />
            </span>
            <p className="relative font-display text-lg font-medium leading-snug text-white md:text-2xl">
              {section.quote}
            </p>
          </div>
        </div>
      </section>
    </PresentationChapter>
  );
}
