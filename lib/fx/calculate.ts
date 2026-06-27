import type { FxQuote, FxRateResponse } from "./types";

export function quoteFromThb(
  receiveThb: number,
  rate: FxRateResponse,
): FxQuote {
  const subtotalRub = receiveThb * rate.thbToRub;
  const feeRub = subtotalRub * (rate.feePercent / 100);
  const clientPaysRub = subtotalRub + feeRub;

  return {
    receiveThb,
    clientPaysRub,
    feeRub,
    subtotalRub,
    rate,
  };
}

export function quoteFromRub(
  clientPaysRub: number,
  rate: FxRateResponse,
): FxQuote {
  const subtotalRub = clientPaysRub / (1 + rate.feePercent / 100);
  const feeRub = clientPaysRub - subtotalRub;
  const receiveThb = subtotalRub / rate.thbToRub;

  return {
    receiveThb,
    clientPaysRub,
    feeRub,
    subtotalRub,
    rate,
  };
}

export function formatThb(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatRub(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
}
