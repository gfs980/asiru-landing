"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { PrezaTokenDictionary } from "@/lib/preza-token/types";

type PrezaTokenContextValue = {
  activeIndex: number;
  totalSlides: number;
  scrollProgress: number;
  dict: PrezaTokenDictionary;
  goToSlide: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  registerSlide: (index: number, element: HTMLElement | null) => void;
};

const PrezaTokenContext = createContext<PrezaTokenContextValue | null>(null);

export function usePrezaToken() {
  const ctx = useContext(PrezaTokenContext);
  if (!ctx) {
    throw new Error("usePrezaToken must be used within PrezaTokenProvider");
  }
  return ctx;
}

type PrezaTokenProviderProps = {
  children: ReactNode;
  dict: PrezaTokenDictionary;
};

export function PrezaTokenProvider({ children, dict }: PrezaTokenProviderProps) {
  const totalSlides = dict.slides.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const registry = useRef<Map<number, HTMLElement>>(new Map());
  const isScrolling = useRef(false);

  const registerSlide = useCallback(
    (index: number, element: HTMLElement | null) => {
      if (element) registry.current.set(index, element);
      else registry.current.delete(index);
    },
    [],
  );

  const goToSlide = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(totalSlides - 1, index));
      const el = registry.current.get(clamped);
      if (!el) return;

      isScrolling.current = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveIndex(clamped);
      window.setTimeout(() => {
        isScrolling.current = false;
      }, 800);
    },
    [totalSlides],
  );

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

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
    const elements = Array.from(registry.current.values());
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const target = visible[0]?.target;
        if (target instanceof HTMLElement) {
          const index = Number(target.dataset.slideIndex);
          if (!Number.isNaN(index)) setActiveIndex(index);
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.35, 0.6, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [totalSlides]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, goToSlide, totalSlides]);

  const value = useMemo(
    () => ({
      activeIndex,
      totalSlides,
      scrollProgress,
      dict,
      goToSlide,
      goNext,
      goPrev,
      registerSlide,
    }),
    [
      activeIndex,
      totalSlides,
      scrollProgress,
      dict,
      goToSlide,
      goNext,
      goPrev,
      registerSlide,
    ],
  );

  return (
    <PrezaTokenContext.Provider value={value}>
      {children}
    </PrezaTokenContext.Provider>
  );
}
