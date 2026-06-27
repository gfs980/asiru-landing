"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { FadeIn } from "./motion";

type AboutSectionProps = {
  dict: Dictionary;
  locale: Locale;
};

export function AboutSection({ dict, locale }: AboutSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const useDisplayFont = locale === "en";

  return (
    <section className="relative overflow-hidden bg-muted py-28">
      <div className="hero-glow absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <FadeIn direction="right">
            <h2
              className={`text-3xl tracking-tight md:text-5xl ${
                useDisplayFont ? "font-display font-normal" : "font-sans font-bold"
              }`}
            >
              {dict.about.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {dict.about.description}
            </p>
          </FadeIn>

          <div className="relative">
            <div
              className="absolute bottom-4 left-[11px] top-4 w-px bg-border"
              aria-hidden
            />
            <ul className="space-y-8">
              {dict.about.highlights.map((item, i) => (
                <TimelineItem
                  key={item}
                  index={i}
                  label={item}
                  prefersReducedMotion={!!prefersReducedMotion}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  index,
  label,
  prefersReducedMotion,
}: {
  index: number;
  label: string;
  prefersReducedMotion: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);

  if (prefersReducedMotion) {
    return (
      <li className="flex items-start gap-4 pl-0">
        <TimelineDot active />
        <span className="leading-relaxed">{label}</span>
      </li>
    );
  }

  return (
    <motion.li
      ref={ref}
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <TimelineDot active />
      <span className="leading-relaxed">{label}</span>
    </motion.li>
  );
}

function TimelineDot({ active }: { active: boolean }) {
  return (
    <div
      className={`relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
        active
          ? "border-primary bg-primary-light"
          : "border-border bg-background"
      }`}
    >
      <Check size={12} className="text-primary" />
    </div>
  );
}
