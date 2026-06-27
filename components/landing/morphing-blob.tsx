"use client";

import { motion, useReducedMotion } from "framer-motion";

export function MorphingBlob() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.svg
        className="absolute -right-[15%] top-[10%] h-[min(70vw,520px)] w-[min(70vw,520px)] opacity-70"
        viewBox="0 0 500 500"
        fill="none"
        animate={{ rotate: [0, 4, -3, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="blob-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(55, 108, 213, 0.35)" />
            <stop offset="50%" stopColor="rgba(6, 102, 235, 0.2)" />
            <stop offset="100%" stopColor="rgba(227, 235, 252, 0.5)" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#blob-grad)"
          animate={{
            d: [
              "M415,305 Q445,205 365,125 Q285,45 185,85 Q85,125 65,225 Q45,325 145,385 Q245,445 345,385 Q445,325 415,305 Z",
              "M395,285 Q465,195 375,105 Q285,35 175,95 Q65,155 75,255 Q85,355 175,395 Q265,435 365,375 Q465,315 395,285 Z",
              "M415,305 Q445,205 365,125 Q285,45 185,85 Q85,125 65,225 Q45,325 145,385 Q245,445 345,385 Q445,325 415,305 Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
      <motion.div
        className="absolute left-[5%] top-[20%] h-64 w-64 rounded-full bg-accent/8 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
