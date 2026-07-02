"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  FileCheck,
  Globe2,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";

type HeroProps = {
  dict: Dictionary;
  locale: Locale;
};

const featureIcons: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  globe: Globe2,
  legal: FileCheck,
  coordinator: UserRound,
};

export function Hero({ dict }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-svh overflow-hidden bg-white">
      <div className="grain-overlay z-0" />

      {/* Mobile: full-screen villa background */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <Image
          src="/images/villa.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/45" />
      </div>

      {/* Desktop: side villa background */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[min(52vw,780px)] lg:block">
        <div className="relative h-full min-h-svh">
          <Image
            src="/images/villa.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 via-20% to-transparent" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl items-center px-6 py-28 lg:items-center lg:py-32">
        <div className="max-w-2xl lg:max-w-[46%] xl:max-w-2xl">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.1rem,5vw,3.65rem)] font-medium leading-[1.06] tracking-[-0.02em] text-[var(--brand-dark)]"
          >
            {dict.hero.title}
          </motion.h1>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="gold-rule mt-7 w-16 origin-left"
          />

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem]"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.ul
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-11 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:max-w-3xl"
          >
            {dict.hero.features.map((feature) => {
              const Icon = featureIcons[feature.icon] ?? ShieldCheck;

              return (
                <li key={feature.icon} className="flex flex-col items-center text-center">
                  <span className="gold-badge flex h-14 w-14 items-center justify-center rounded-full">
                    <Icon size={22} strokeWidth={1.4} />
                  </span>
                  <span className="mt-3 text-xs leading-snug text-foreground/80 sm:text-[13px]">
                    {feature.text}
                  </span>
                </li>
              );
            })}
          </motion.ul>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-11 flex justify-center lg:justify-start"
          >
            <a
              href="#contact"
              className="btn-premium group inline-flex cursor-pointer items-center gap-2.5 rounded-full px-8 py-4 text-sm font-medium"
            >
              {dict.hero.ctaPrimary}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
