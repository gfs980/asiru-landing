"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import paymentFlowAnimation from "@/lib/lottie/payment-flow.json";
// Regenerate: npm run generate:lottie

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full animate-pulse rounded-full bg-primary/10"
      aria-hidden
    />
  ),
});

type HeroLottieProps = {
  className?: string;
};

export function HeroLottie({ className = "" }: HeroLottieProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
      data-testid="hero-lottie"
    >
      <Lottie
        animationData={paymentFlowAnimation}
        loop
        autoplay
        className="h-full w-full"
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
}
