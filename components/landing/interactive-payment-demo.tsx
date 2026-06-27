"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  QrCode,
  Wallet,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type InteractivePaymentDemoProps = {
  dict: Dictionary;
};

const STEP_COUNT = 4;

export function InteractivePaymentDemo({ dict }: InteractivePaymentDemoProps) {
  const demo = dict.hero.demo;
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const advance = useCallback(() => {
    setStep((s) => (s + 1) % STEP_COUNT);
  }, []);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;
    const timer = setInterval(advance, 3500);
    return () => clearInterval(timer);
  }, [autoPlay, advance, prefersReducedMotion]);

  const goTo = (index: number) => {
    setAutoPlay(false);
    setStep(index);
  };

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="mb-4 flex gap-2">
        {demo.steps.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => goTo(i)}
            className={`flex-1 cursor-pointer rounded-full py-2 text-center text-[10px] font-medium uppercase tracking-wider transition-all sm:text-xs ${
              step === i
                ? "bg-primary text-white shadow-md"
                : "bg-silver text-muted-foreground hover:bg-primary-light"
            }`}
          >
            <span className="font-mono-data mr-1 opacity-70">0{i + 1}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <div className="liquid-edge surface-elevated relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/50 via-background/85 to-silver/90" />

        <div className="relative p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
                A
              </div>
              <span className="text-sm font-medium">{demo.dashboard}</span>
            </div>
            <span className="font-mono-data rounded-full bg-silver px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              {demo.live}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepPanel key="invoice">
                <p className="text-sm text-muted-foreground">{demo.invoiceLabel}</p>
                <p className="font-mono-data mt-1 text-xs text-muted-foreground">
                  #AS-2847
                </p>
                <p className="mt-4 font-mono-data text-4xl font-medium tracking-tight">
                  ฿ 124,500
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {demo.rateLock}
                </p>
                <button
                  type="button"
                  onClick={advance}
                  className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  {demo.generateQr}
                  <ChevronRight size={16} />
                </button>
              </StepPanel>
            )}

            {step === 1 && (
              <StepPanel key="qr">
                <div className="flex flex-col items-center py-2">
                  <div className="flex h-40 w-40 items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-white p-4 shadow-inner">
                    <QrCode size={120} className="text-foreground" strokeWidth={1} />
                  </div>
                  <p className="font-mono-data mt-6 text-2xl font-medium">₽ 385,000</p>
                  <p className="mt-1 text-sm text-muted-foreground">{demo.clientPays}</p>
                </div>
                <button
                  type="button"
                  onClick={advance}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border bg-background py-3.5 text-sm font-medium transition-colors hover:bg-primary-light"
                >
                  {demo.simulatePay}
                  <Wallet size={16} className="text-primary" />
                </button>
              </StepPanel>
            )}

            {step === 2 && (
              <StepPanel key="processing">
                <p className="text-sm text-muted-foreground">{demo.processing}</p>
                <div className="mt-6 space-y-4">
                  {demo.processSteps.map((label, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.4, duration: 0.35 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          i < 2 ? "bg-primary" : "bg-border animate-pulse"
                        }`}
                      />
                      <span className="text-sm">{label}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 h-2 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                  />
                </div>
              </StepPanel>
            )}

            {step === 3 && (
              <StepPanel key="done">
                <div className="flex flex-col items-center py-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
                  >
                    <CheckCircle2 size={32} className="text-green-600" />
                  </motion.div>
                  <p className="mt-4 text-lg font-semibold">{demo.confirmed}</p>
                  <p className="font-mono-data mt-2 text-3xl font-medium text-primary">
                    ฿ 124,500
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {demo.credited}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAutoPlay(true);
                    setStep(0);
                  }}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-medium text-white hover:bg-primary-hover"
                >
                  {demo.replay}
                  <ArrowRight size={16} />
                </button>
              </StepPanel>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {demo.hint}
      </p>
    </div>
  );
}

function StepPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
