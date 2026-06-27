"use client";

import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { HeroLottie } from "./hero-lottie";
import { InteractivePaymentDemo } from "./interactive-payment-demo";

type HeroVisualProps = {
  dict: Dictionary;
  className?: string;
};

/**
 * Lottie orbit sits in a larger frame so RUB → QR → THB flow is visible
 * around the interactive demo card (not buried under its opaque background).
 */
export function HeroVisual({ dict, className = "" }: HeroVisualProps) {
  return (
    <div
      className={`relative mx-auto flex w-full max-w-[34rem] items-center justify-center ${className}`}
    >
      {/* Ambient payment-flow animation — sized larger than the demo card */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <HeroLottie className="h-[min(100vw,28rem)] w-[min(100vw,28rem)] opacity-80 sm:h-[26rem] sm:w-[26rem]" />
      </div>

      {/* Interactive demo on top; slightly narrower so Lottie shows at the sides */}
      <div className="relative z-10 w-full max-w-md pt-6">
        <InteractivePaymentDemo dict={dict} />
      </div>
    </div>
  );
}
