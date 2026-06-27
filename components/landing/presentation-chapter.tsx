"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { ChapterId } from "@/lib/presentation/chapters";
import { getChapterLabel } from "@/lib/presentation/chapters";
import { usePresentation } from "./presentation-context";

type PresentationChapterProps = {
  id: ChapterId;
  htmlId?: string;
  children: ReactNode;
  className?: string;
  showLabel?: boolean;
};

export function PresentationChapter({
  id,
  htmlId,
  children,
  className = "",
  showLabel = false,
}: PresentationChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerChapter, activeChapter, locale } = usePresentation();
  const isActive = activeChapter === id;

  useEffect(() => {
    registerChapter(id, ref.current);
    return () => registerChapter(id, null);
  }, [id, registerChapter]);

  return (
    <div
      ref={ref}
      id={htmlId}
      data-chapter={id}
      className={`presentation-chapter relative ${className}`}
    >
      {showLabel && (
        <div
          className={`pointer-events-none absolute left-6 top-8 z-10 hidden font-mono-data text-[10px] uppercase tracking-[0.25em] transition-opacity duration-500 xl:block ${
            isActive ? "text-primary opacity-100" : "text-muted-foreground/40 opacity-60"
          }`}
        >
          {getChapterLabel(id, locale)}
        </div>
      )}
      {children}
    </div>
  );
}
