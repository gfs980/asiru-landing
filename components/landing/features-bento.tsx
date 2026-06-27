"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  QrCode,
  Eye,
  Zap,
  LayoutDashboard,
  Globe,
  Headphones,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { FadeIn } from "./motion";

const icons = [QrCode, Eye, Zap, LayoutDashboard, Globe, Headphones];

/** Bento cell spans: 4-column desktop grid */
const spans = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
];

type FeaturesBentoProps = {
  dict: Dictionary;
  locale: Locale;
};

export function FeaturesBento({ dict, locale }: FeaturesBentoProps) {
  const prefersReducedMotion = useReducedMotion();
  const useDisplayFont = locale === "en";

  return (
    <section id="features" className="bg-muted py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-3xl tracking-tight md:text-5xl ${
              useDisplayFont ? "font-display font-normal" : "font-sans font-bold"
            }`}
          >
            {dict.features.title}
          </h2>
          {dict.features.subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.features.subtitle}
            </p>
          )}
        </FadeIn>

        <div className="mt-16 grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
          {dict.features.items.map((feature, i) => {
            const Icon = icons[i] ?? QrCode;
            const isHero = i === 0;

            return (
              <motion.div
                key={feature.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: prefersReducedMotion ? 0 : i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.02, y: -2 }
                }
                className={`liquid-edge group surface-card flex flex-col rounded-3xl p-6 transition-shadow hover:shadow-lg ${spans[i] ?? ""}`}
              >
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                    isHero
                      ? "bg-primary text-white"
                      : "bg-primary-light text-primary group-hover:bg-primary group-hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <h3
                  className={`font-semibold leading-snug ${
                    isHero ? "text-xl md:text-2xl" : "text-base"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`mt-2 flex-1 leading-relaxed text-muted-foreground ${
                    isHero ? "text-base" : "text-sm"
                  }`}
                >
                  {feature.description}
                </p>

                {isHero && (
                  <div className="mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-border bg-silver p-4">
                    <div className="grid grid-cols-5 gap-0.5">
                      {Array.from({ length: 25 }).map((_, j) => (
                        <div
                          key={j}
                          className={`h-1.5 w-1.5 rounded-sm ${
                            j % 2 === 0 ? "bg-foreground" : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono-data text-xs text-muted-foreground">
                      QR · SBP · RUB
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
