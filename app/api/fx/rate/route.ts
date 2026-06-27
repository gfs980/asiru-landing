import { NextResponse } from "next/server";
import type { FxRateResponse } from "@/lib/fx/types";

/** Static rate until bank scraping is wired up */
const STATIC_THB_TO_RUB = 2.36;
const FEE_PERCENT = 0.5;
const LOCK_MINUTES = 15;

export async function GET() {
  const payload: FxRateResponse = {
    pair: "THB/RUB",
    thbToRub: STATIC_THB_TO_RUB,
    rubToThb: 1 / STATIC_THB_TO_RUB,
    feePercent: FEE_PERCENT,
    lockMinutes: LOCK_MINUTES,
    source: "static",
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
