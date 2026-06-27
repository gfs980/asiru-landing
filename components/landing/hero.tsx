"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { HeroVisual } from "./hero-visual";
import { KineticText } from "./kinetic-text";
import { MorphingBlob } from "./morphing-blob";
import { useMediaQuery } from "./use-media-query";

type HeroProps = {
  dict: Dictionary;
  locale: Locale;
};

export function Hero({ dict, locale }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const useDisplayFont = locale === "en";

  if (isDesktop === null) {
    return <HeroShell dict={dict} locale={locale} useDisplayFont={useDisplayFont} />;
  }

  if (!isDesktop || prefersReducedMotion) {
    return (
      <HeroShell dict={dict} locale={locale} useDisplayFont={useDisplayFont} />
    );
  }

  return (
    <HeroScrollPin dict={dict} locale={locale} useDisplayFont={useDisplayFont} />
  );
}

function HeroScrollPin({
  dict,
  locale,
  useDisplayFont,
}: {
  dict: Dictionary;
  locale: Locale;
  useDisplayFont: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const demoScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const statsOpacity = useTransform(scrollYProgress, [0.4, 0.9], [1, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "140vh" }}>
      <section className="sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden bg-background pt-28 pb-16 md:pt-32 md:pb-24">
        <HeroBackground />

        <div className="relative mx-auto w-full max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 inline-flex items-center gap-2 rounded-full glass-panel-strong px-4 py-1.5"
          >
            <Sparkles size={14} className="text-accent" />
            <span className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {dict.hero.badge}
            </span>
          </motion.div>

          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <motion.div style={{ y: copyY, opacity: copyOpacity }}>
              <HeroCopy
                dict={dict}
                useDisplayFont={useDisplayFont}
                animated={false}
              />
            </motion.div>

            <motion.div
              id="demo"
              style={{ scale: demoScale }}
              className="relative lg:pl-4"
            >
              <HeroVisual dict={dict} />
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: statsOpacity }}
            className="mt-20 grid grid-cols-3 gap-8 border-t border-border/80 pt-10 md:max-w-2xl"
          >
            <HeroStats dict={dict} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function HeroShell({
  dict,
  locale,
  useDisplayFont,
}: {
  dict: Dictionary;
  locale: Locale;
  useDisplayFont: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden bg-background pt-28 pb-16 md:pt-32 md:pb-24">
      <HeroBackground />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 inline-flex items-center gap-2 rounded-full glass-panel-strong px-4 py-1.5"
        >
          <Sparkles size={14} className="text-accent" />
          <span className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {dict.hero.badge}
          </span>
        </motion.div>

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <HeroCopy dict={dict} useDisplayFont={useDisplayFont} animated />
          <motion.div
            id="demo"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:pl-4"
          >
            <HeroVisual dict={dict} />
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-20 grid grid-cols-3 gap-8 border-t border-border/80 pt-10 md:max-w-2xl"
        >
          <HeroStats dict={dict} />
        </motion.div>
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <>
      <div className="hero-glow mesh-gradient absolute inset-0" />
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <MorphingBlob />
    </>
  );
}

function HeroCopy({
  dict,
  useDisplayFont,
  animated,
}: {
  dict: Dictionary;
  useDisplayFont: boolean;
  animated: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="max-w-xl lg:max-w-none">
      <motion.h1
        initial={animated && !prefersReducedMotion ? { opacity: 0, y: 28 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={`text-[clamp(3rem,7.5vw,5.75rem)] leading-[0.95] tracking-[-0.05em] ${
          useDisplayFont ? "font-display font-normal" : "font-sans font-bold"
        }`}
      >
        {dict.hero.title}
        <br />
        <span className="gradient-text">
          <KineticText text={dict.hero.titleAccent} delay={0.4} />
        </span>
      </motion.h1>

      <motion.p
        initial={animated && !prefersReducedMotion ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.28 }}
        className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl"
      >
        {dict.hero.subtitle}
      </motion.p>

      <motion.div
        initial={animated && !prefersReducedMotion ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.42 }}
        className="mt-12 flex flex-wrap gap-4"
      >
        <a
          href="#contact"
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-white transition-all hover:bg-primary-hover hover:shadow-[0_12px_40px_var(--primary-glow)]"
        >
          {dict.hero.ctaPrimary}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
        <a
          href="#demo"
          className="inline-flex cursor-pointer items-center rounded-full border border-border bg-background/80 px-8 py-4 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-primary-light"
        >
          {dict.hero.ctaSecondary}
        </a>
      </motion.div>
    </div>
  );
}

function HeroStats({ dict }: { dict: Dictionary }) {
  return (
    <>
      {dict.hero.stats.map((stat) => (
        <div key={stat.label}>
          <div className="font-mono-data text-3xl font-semibold tracking-tight md:text-4xl">
            {stat.value}
          </div>
          <div className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
            {stat.label}
          </div>
        </div>
      ))}
    </>
  );
}
