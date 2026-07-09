"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { PrezaTokenSlide } from "@/lib/preza-token/types";
import { PrezaTokenSlideContent } from "./preza-token-slide-content";
import { usePrezaToken } from "./preza-token-context";

const ease = [0.22, 1, 0.36, 1] as const;

type PrezaTokenSlideFrameProps = {
  index: number;
  slide: PrezaTokenSlide;
};

export function PrezaTokenSlideFrame({ index, slide }: PrezaTokenSlideFrameProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.45, once: false });
  const prefersReducedMotion = useReducedMotion();
  const { registerSlide } = usePrezaToken();

  useEffect(() => {
    registerSlide(index, ref.current);
    return () => registerSlide(index, null);
  }, [index, registerSlide]);

  const isDark =
    slide.layout === "hero" ||
    slide.layout === "vision" ||
    slide.layout === "equation";

  return (
    <section
      ref={ref}
      data-slide-index={index}
      className={`preza-slide relative flex min-h-svh snap-start snap-always items-center overflow-hidden px-5 pb-28 pt-24 md:px-10 md:pb-32 md:pt-28 ${
        isDark ? "preza-slide-dark" : "preza-slide-light"
      }`}
    >
      {isDark ? <DarkBackdrop layout={slide.layout} /> : <LightBackdrop />}

      <motion.div
        initial={false}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 32 }
        }
        transition={{ duration: 0.65, ease }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <PrezaTokenSlideContent slide={slide} isInView={isInView} />
      </motion.div>
    </section>
  );
}

function LightBackdrop() {
  return (
    <>
      <div className="mesh-gradient absolute inset-0" />
      <div className="grid-pattern absolute inset-0 opacity-40" />
      <div className="grain-overlay" />
    </>
  );
}

function DarkBackdrop({ layout }: { layout: PrezaTokenSlide["layout"] }) {
  return (
    <>
      <div className="statement-band absolute inset-0" />
      <div className="statement-band-glow absolute inset-0" />
      {layout === "hero" && (
        <motion.div
          className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <div className="grain-overlay opacity-30" />
    </>
  );
}
