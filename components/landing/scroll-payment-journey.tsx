"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRightLeft,
  FileText,
  LayoutDashboard,
  QrCode,
  Wallet,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { PresentationChapter } from "./presentation-chapter";
import { ScrollSegmentProgress, ScrollSlidePanel } from "./scroll-slide-panel";
import { useScrollSlideIndex } from "./use-scroll-slide-index";

const stepIcons = [FileText, QrCode, Wallet, LayoutDashboard];

type ScrollPaymentJourneyProps = {
  dict: Dictionary;
  locale: Locale;
};

export function ScrollPaymentJourney({ dict, locale }: ScrollPaymentJourneyProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <JourneyStatic dict={dict} locale={locale} />;
  }

  return <JourneyScrollDesktop dict={dict} locale={locale} />;
}

function JourneyStatic({
  dict,
  locale,
}: ScrollPaymentJourneyProps) {
  const useDisplayFont = locale === "en";
  const steps = dict.howItWorks.steps;

  return (
    <PresentationChapter id="journey">
      <section id="how-it-works" className="bg-background py-28">
        <div className="mx-auto max-w-7xl px-6">
          <JourneyHeader dict={dict} useDisplayFont={useDisplayFont} />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <div key={step.step} className="surface-card rounded-2xl p-8">
                <span className="font-mono-data text-sm text-primary">
                  {step.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PresentationChapter>
  );
}

function JourneyScrollDesktop({ dict, locale }: ScrollPaymentJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const useDisplayFont = locale === "en";

  const steps = dict.howItWorks.steps;
  const flowSteps = dict.flow.steps;
  const stepCount = steps.length;

  const { activeIndex: currentStep, direction, segmentProgress } =
    useScrollSlideIndex(containerRef, stepCount);

  const bridgeFill = currentStep / Math.max(stepCount - 1, 1);

  return (
    <PresentationChapter id="journey">
      <section
        ref={containerRef}
        id="how-it-works"
        className="relative"
        style={{ height: `${stepCount * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-background">
          <div className="mesh-gradient absolute inset-0 opacity-40" />
          <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col px-6 pb-8 pt-24">
            <JourneyHeader dict={dict} useDisplayFont={useDisplayFont} />

            <div className="mt-8 hidden items-center justify-between gap-4 lg:flex">
              {flowSteps.map((node, i) => {
                const active = bridgeFill >= i / Math.max(flowSteps.length - 1, 1);
                return (
                  <div key={node.label} className="flex flex-1 items-center gap-4">
                    <div
                      className={`flex flex-1 flex-col items-center rounded-2xl border px-4 py-3 text-center backdrop-blur-sm transition-all duration-500 ${
                        active
                          ? "scale-100 border-primary/30 bg-primary-light/80 opacity-100"
                          : "scale-[0.97] border-border bg-background/80 opacity-40"
                      }`}
                    >
                      <span className="text-xs font-medium">{node.label}</span>
                      <span className="mt-1 text-[10px] text-muted-foreground">
                        {node.detail}
                      </span>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <ArrowRightLeft
                        size={16}
                        className="shrink-0 text-primary/40"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex min-h-0 flex-1 flex-col gap-8 lg:mt-10 lg:flex-row lg:gap-16">
              <div className="flex flex-col justify-center lg:w-[42%]">
                <div className="mb-6 font-mono-data text-[10px] uppercase tracking-[0.3em] text-primary">
                  {dict.presentation.stepLabel}{" "}
                  <span>{steps[currentStep]?.step}</span>
                </div>

                <div className="space-y-3">
                  {steps.map((step, i) => {
                    const Icon = stepIcons[i] ?? FileText;
                    const active = currentStep === i;
                    return (
                      <div
                        key={step.step}
                        className={`flex items-start gap-4 rounded-2xl border px-5 py-4 transition-all duration-500 ${
                          active
                            ? "border-primary/35 bg-primary-light/90 shadow-sm"
                            : "border-border bg-background/60 opacity-60"
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <div>
                          <span className="font-mono-data text-xs text-muted-foreground">
                            {step.step}
                          </span>
                          <h3 className="font-semibold">{step.title}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <ScrollSlidePanel
                slideKey={steps[currentStep].step}
                direction={direction}
                className="relative min-h-[280px] flex-1 rounded-3xl border border-border bg-muted/50 lg:min-h-0"
              >
                <div className="flex h-full flex-col justify-center p-8 md:p-12">
                  <StepVisual index={currentStep} step={steps[currentStep].step} />
                  <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                    {steps[currentStep].description}
                  </p>
                </div>
              </ScrollSlidePanel>
            </div>

            <ScrollSegmentProgress progress={segmentProgress} className="mt-6" />
            <p className="mt-3 text-center font-mono-data text-[10px] uppercase tracking-widest text-muted-foreground">
              {dict.presentation.scrollHint}
            </p>
          </div>
        </div>
      </section>
    </PresentationChapter>
  );
}

function JourneyHeader({
  dict,
  useDisplayFont,
}: {
  dict: Dictionary;
  useDisplayFont: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {dict.flow.title}
      </p>
      <h2
        className={`mt-3 text-3xl tracking-tight md:text-5xl ${
          useDisplayFont ? "font-display font-normal" : "font-sans font-bold"
        }`}
      >
        {dict.howItWorks.title}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        {dict.howItWorks.subtitle}
      </p>
    </div>
  );
}

function StepVisual({ index, step }: { index: number; step: string }) {
  const visuals = [
    <InvoiceVisual key="inv" step={step} />,
    <QrVisual key="qr" />,
    <SettlementVisual key="settle" />,
    <DashboardVisual key="dash" />,
  ];
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {visuals[index]}
    </motion.div>
  );
}

function InvoiceVisual({ step }: { step: string }) {
  return (
    <div className="surface-elevated max-w-sm rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono-data text-xs text-muted-foreground">
          {step}
        </span>
        <FileText size={18} className="text-primary" />
      </div>
      <div className="mt-6 font-mono-data text-4xl font-semibold">฿124,500</div>
      <div className="mt-2 text-sm text-muted-foreground">→ ₽ 293,820</div>
      <div className="mt-6 h-2 w-full rounded-full bg-silver">
        <div className="h-full w-2/3 rounded-full bg-primary" />
      </div>
    </div>
  );
}

function QrVisual() {
  return (
    <div className="flex items-center gap-8">
      <div className="surface-elevated grid grid-cols-7 gap-1 rounded-2xl p-6">
        {Array.from({ length: 49 }).map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-sm ${
              i % 3 === 0 ? "bg-foreground" : "bg-border"
            }`}
          />
        ))}
      </div>
      <div>
        <QrCode size={32} className="text-primary" />
        <p className="mt-2 text-sm font-medium">SBP · RUB</p>
      </div>
    </div>
  );
}

function SettlementVisual() {
  return (
    <div className="flex items-center gap-6">
      <div className="rounded-2xl bg-primary/10 p-6">
        <span className="text-2xl">₽</span>
      </div>
      <motion.div
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowRightLeft className="text-primary" />
      </motion.div>
      <div className="rounded-2xl bg-accent/10 p-6">
        <span className="text-2xl">฿</span>
      </div>
      <Wallet size={28} className="text-primary" />
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="surface-elevated max-w-md rounded-2xl p-6">
      <div className="flex items-center gap-2">
        <LayoutDashboard size={18} className="text-primary" />
        <span className="text-sm font-medium">Transaction log</span>
      </div>
      <div className="mt-6 space-y-3">
        {["RUB received", "FX locked", "THB sent", "Receipt exported"].map(
          (row, i) => (
            <div
              key={row}
              className="flex items-center justify-between rounded-lg bg-silver px-3 py-2 text-sm"
            >
              <span>{row}</span>
              <span className="font-mono-data text-xs text-primary">
                ✓ 0{i + 1}:42
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
