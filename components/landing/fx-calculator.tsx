"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeftRight, Clock, Loader2, RefreshCw } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import {
  formatRub,
  formatThb,
  quoteFromRub,
  quoteFromThb,
} from "@/lib/fx/calculate";
import type { FxRateResponse } from "@/lib/fx/types";
import { FadeIn } from "./motion";

type FxCalculatorProps = {
  dict: Dictionary;
  locale: Locale;
};

type ActiveField = "thb" | "rub";

export function FxCalculator({ dict, locale }: FxCalculatorProps) {
  const c = dict.calculator;
  const localeTag = locale === "ru" ? "ru-RU" : "en-US";
  const useDisplayFont = locale === "en";

  const [rate, setRate] = useState<FxRateResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lockSeconds, setLockSeconds] = useState(0);
  const [activeField, setActiveField] = useState<ActiveField>("thb");
  const [amount, setAmount] = useState("124500");

  const fetchRate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/fx/rate");
      if (!res.ok) throw new Error("Failed to fetch rate");
      const data: FxRateResponse = await res.json();
      setRate(data);
      setLockSeconds(data.lockMinutes * 60);
    } catch {
      setError(c.error);
    } finally {
      setLoading(false);
    }
  }, [c.error]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  useEffect(() => {
    if (!rate) return;
    const timer = setInterval(() => {
      setLockSeconds((s) => {
        if (s <= 1) {
          void fetchRate();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [rate?.updatedAt, fetchRate, rate]);

  const parsedAmount = parseFloat(amount.replace(/,/g, "")) || 0;

  const quote = useMemo(() => {
    if (!rate || parsedAmount <= 0) return null;
    return activeField === "thb"
      ? quoteFromThb(parsedAmount, rate)
      : quoteFromRub(parsedAmount, rate);
  }, [rate, activeField, parsedAmount]);

  const thbDisplay =
    activeField === "thb"
      ? amount
      : quote
        ? quote.receiveThb.toFixed(2)
        : "";

  const rubDisplay =
    activeField === "rub"
      ? amount
      : quote
        ? Math.round(quote.clientPaysRub).toString()
        : "";

  const lockDisplay = `${String(Math.floor(lockSeconds / 60)).padStart(2, "0")}:${String(lockSeconds % 60).padStart(2, "0")}`;

  const swap = () => {
    if (!quote) return;
    if (activeField === "thb") {
      setActiveField("rub");
      setAmount(Math.round(quote.clientPaysRub).toString());
    } else {
      setActiveField("thb");
      setAmount(quote.receiveThb.toFixed(2));
    }
  };

  return (
    <section id="calculator" className="bg-muted py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-3xl tracking-tight md:text-5xl ${
              useDisplayFont ? "font-display font-normal" : "font-sans font-bold"
            }`}
          >
            {c.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.subtitle}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-12 max-w-xl">
          <div className="surface-elevated overflow-hidden rounded-3xl">
            <div className="flex items-center justify-between border-b border-border bg-primary-light/50 px-6 py-4">
              <div className="flex items-center gap-2 text-sm">
                {loading ? (
                  <Loader2 size={16} className="animate-spin text-primary" />
                ) : (
                  <Clock size={16} className="text-primary" />
                )}
                <span className="text-muted-foreground">{c.rateLock}</span>
                <span className="font-mono-data font-semibold text-foreground">
                  {loading ? "—" : lockDisplay}
                </span>
              </div>
              <button
                type="button"
                onClick={fetchRate}
                disabled={loading}
                className="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                {c.refresh}
              </button>
            </div>

            <div className="space-y-4 p-6">
              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <div>
                <label
                  htmlFor="calc-thb"
                  className="font-mono-data text-[11px] uppercase tracking-widest text-muted-foreground"
                >
                  {c.receiveLabel}
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                  <span className="text-lg text-muted-foreground">฿</span>
                  <input
                    id="calc-thb"
                    type="text"
                    inputMode="decimal"
                    value={thbDisplay}
                    onChange={(e) => {
                      setActiveField("thb");
                      setAmount(e.target.value);
                    }}
                    className="w-full bg-transparent font-mono-data text-2xl font-medium outline-none"
                    aria-label={c.receiveLabel}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={swap}
                  disabled={!quote}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:border-primary hover:bg-primary-light disabled:opacity-40"
                  aria-label={c.swap}
                >
                  <ArrowLeftRight size={18} className="text-primary" />
                </button>
              </div>

              <div>
                <label
                  htmlFor="calc-rub"
                  className="font-mono-data text-[11px] uppercase tracking-widest text-muted-foreground"
                >
                  {c.clientPaysLabel}
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                  <span className="text-lg text-muted-foreground">₽</span>
                  <input
                    id="calc-rub"
                    type="text"
                    inputMode="numeric"
                    value={rubDisplay}
                    onChange={(e) => {
                      setActiveField("rub");
                      setAmount(e.target.value);
                    }}
                    className="w-full bg-transparent font-mono-data text-2xl font-medium outline-none"
                    aria-label={c.clientPaysLabel}
                  />
                </div>
              </div>

              {rate && (
                <div className="rounded-2xl bg-silver px-4 py-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{c.liveRate}</span>
                    <span className="font-mono-data text-foreground">
                      1 ฿ = {rate.thbToRub.toFixed(2)} ₽
                    </span>
                  </div>
                  {quote && (
                    <>
                      <div className="mt-2 flex justify-between text-muted-foreground">
                        <span>{c.feeLabel}</span>
                        <span className="font-mono-data">
                          {formatRub(quote.feeRub, localeTag)} ({rate.feePercent}%)
                        </span>
                      </div>
                      <div className="mt-3 flex justify-between border-t border-border pt-3 font-medium">
                        <span>{c.youReceive}</span>
                        <span className="font-mono-data text-primary">
                          {formatThb(quote.receiveThb, localeTag)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}

              <p className="text-center text-xs text-muted-foreground">{c.disclaimer}</p>

              <a
                href="#contact"
                className="flex w-full cursor-pointer items-center justify-center rounded-2xl bg-primary py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                {c.cta}
              </a>
            </div>
          </div>

          {rate && (
            <p className="mt-4 text-center font-mono-data text-[10px] uppercase tracking-widest text-muted-foreground">
              {c.source}: {rate.source} ·{" "}
              {new Date(rate.updatedAt).toLocaleString(localeTag)}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
