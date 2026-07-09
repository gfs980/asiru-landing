"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SlideEyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`mb-4 font-mono-data text-[11px] uppercase tracking-[0.28em] ${
        dark ? "text-gold-soft" : "text-gold"
      }`}
    >
      {children}
    </p>
  );
}

export function SlideTitle({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[clamp(1.85rem,4.5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.02em] ${
        dark ? "text-white" : "text-[var(--brand-dark)]"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function StaggerList({
  items,
  dark = false,
  className = "",
}: {
  items: string[];
  dark?: boolean;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: i * 0.08, duration: 0.45, ease }}
          className={`flex items-start gap-3 text-sm leading-relaxed md:text-base ${
            dark ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

export function FlowPipeline({
  steps,
  dark = false,
}: {
  steps: string[];
  dark?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
      {steps.map((step, i) => (
        <div key={`${step}-${i}`} className="flex items-center gap-2 md:gap-3">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.4, ease }}
            className={`liquid-edge rounded-xl px-4 py-2.5 font-mono-data text-xs font-medium md:px-5 md:py-3 md:text-sm ${
              dark
                ? "bg-white/10 text-white"
                : "surface-elevated text-[var(--brand-dark)]"
            }`}
          >
            {step}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.06, duration: 0.3 }}
              className={`text-lg ${dark ? "text-gold-soft" : "text-gold"}`}
              aria-hidden
            >
              →
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}
