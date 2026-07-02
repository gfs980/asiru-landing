"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";

type BecomePartnerSectionProps = {
  dict: Dictionary;
  locale: Locale;
};

export function BecomePartnerSection({
  dict,
}: BecomePartnerSectionProps) {
  const section = dict.becomePartner;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[62vw] md:block">
        <div className="relative h-full min-h-[640px]">
          <Image
            src="/images/villa-hero.webp"
            alt=""
            fill
            sizes="62vw"
            className="object-cover object-center"
          />
          <WorldMapDots />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 via-30% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
        </div>
      </div>
      <div className="grain-overlay z-0" />

      <div className="relative z-10 mx-auto flex min-h-[640px] max-w-7xl items-center px-6 py-24 md:py-28">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1] tracking-[-0.02em] text-[var(--brand-dark)]">
            {section.title}
          </h2>

          <p className="mt-6 font-display text-xl font-medium italic leading-snug text-primary md:text-2xl">
            {section.subtitle}
          </p>
          <span className="gold-rule mt-5 block w-14" />

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {section.description}
          </p>

          <a
            href="#contact"
            className="btn-premium group mt-10 inline-flex cursor-pointer items-center gap-3 rounded-full px-8 py-4 text-sm font-medium md:text-base"
          >
            {section.cta}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function WorldMapDots() {
  return (
    <div className="absolute inset-0 opacity-70" aria-hidden>
      <svg
        viewBox="0 0 700 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="partner-map-dots"
            x="0"
            y="0"
            width="11"
            height="11"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.3" fill="#a9b6cc" />
          </pattern>
        </defs>

        <ellipse
          cx="360"
          cy="200"
          rx="330"
          ry="180"
          fill="url(#partner-map-dots)"
          opacity="0.5"
        />

        <path
          d="M 120 250 C 260 120, 420 120, 560 210"
          stroke="#b0894e"
          strokeWidth="1.4"
          strokeDasharray="2 7"
          fill="none"
        />
        <path
          d="M 180 300 C 320 210, 470 220, 600 150"
          stroke="#b0894e"
          strokeWidth="1.4"
          strokeDasharray="2 7"
          fill="none"
        />

        {[
          [120, 250],
          [560, 210],
          [180, 300],
          [600, 150],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="6" fill="#b0894e" opacity="0.18" />
            <circle cx={cx} cy={cy} r="3" fill="#b0894e" />
          </g>
        ))}
      </svg>
    </div>
  );
}