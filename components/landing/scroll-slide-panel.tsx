"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

const slideEase = [0.22, 1, 0.36, 1] as const;

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
  }),
};

type ScrollSlidePanelProps = {
  slideKey: string | number;
  direction: number;
  className?: string;
  children: ReactNode;
};

export function ScrollSlidePanel({
  slideKey,
  direction,
  className = "",
  children,
}: ScrollSlidePanelProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slideKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: slideEase }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type ScrollSegmentProgressProps = {
  progress: number;
  className?: string;
};

export function ScrollSegmentProgress({
  progress,
  className = "",
}: ScrollSegmentProgressProps) {
  return (
    <div
      className={`h-1 overflow-hidden rounded-full bg-border ${className}`}
    >
      <motion.div
        className="h-full rounded-full bg-primary"
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.45, ease: slideEase }}
      />
    </div>
  );
}
