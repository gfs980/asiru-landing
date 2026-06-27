"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ChapterId } from "@/lib/presentation/chapters";
import { presentationChapters } from "@/lib/presentation/chapters";
import type { Locale } from "@/lib/i18n/routes";

type PresentationContextValue = {
  activeChapter: ChapterId;
  scrollProgress: number;
  locale: Locale;
  registerChapter: (id: ChapterId, element: HTMLElement | null) => void;
  scrollToChapter: (id: ChapterId) => void;
};

const PresentationContext = createContext<PresentationContextValue | null>(null);

export function usePresentation() {
  const ctx = useContext(PresentationContext);
  if (!ctx) {
    throw new Error("usePresentation must be used within PresentationProvider");
  }
  return ctx;
}

type PresentationProviderProps = {
  children: ReactNode;
  locale: Locale;
};

export function PresentationProvider({
  children,
  locale,
}: PresentationProviderProps) {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("hook");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [registry, setRegistry] = useState<Map<ChapterId, HTMLElement>>(
    () => new Map(),
  );

  const registerChapter = useCallback(
    (id: ChapterId, element: HTMLElement | null) => {
      setRegistry((prev) => {
        const next = new Map(prev);
        if (element) next.set(id, element);
        else next.delete(id);
        return next;
      });
    },
    [],
  );

  const scrollToChapter = useCallback(
    (id: ChapterId) => {
      const el = registry.get(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [registry],
  );

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = presentationChapters
      .map((c) => registry.get(c.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target instanceof HTMLElement) {
          const id = visible[0].target.dataset.chapter as ChapterId | undefined;
          if (id) setActiveChapter(id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [registry]);

  const value = useMemo(
    () => ({
      activeChapter,
      scrollProgress,
      locale,
      registerChapter,
      scrollToChapter,
    }),
    [activeChapter, scrollProgress, locale, registerChapter, scrollToChapter],
  );

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
}
