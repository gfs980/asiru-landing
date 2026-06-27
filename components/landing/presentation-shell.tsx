"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/routes";
import { PresentationProvider, usePresentation } from "./presentation-context";
import { ScrollProgressRail } from "./scroll-progress-rail";
import { StickyCta } from "./sticky-cta";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type PresentationShellProps = {
  children: ReactNode;
  locale: Locale;
  dict: Dictionary;
};

export function PresentationShell({
  children,
  locale,
  dict,
}: PresentationShellProps) {
  return (
    <PresentationProvider locale={locale}>
      <TopScrollBar />
      <ScrollProgressRail />
      <StickyCta dict={dict} />
      {children}
    </PresentationProvider>
  );
}

function TopScrollBar() {
  const { scrollProgress } = usePresentation();
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      style={{ transform: `scaleX(${scrollProgress})` }}
      aria-hidden
    />
  );
}
