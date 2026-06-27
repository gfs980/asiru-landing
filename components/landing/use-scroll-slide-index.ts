"use client";

import { useRef, useState, type RefObject } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

/**
 * Maps vertical scroll progress through a tall container to discrete slide indices.
 * Only use inside a component that always mounts `containerRef` on its root element.
 */
export function useScrollSlideIndex(
  containerRef: RefObject<HTMLElement | null>,
  slideCount: number,
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prevIndex = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (slideCount <= 1) {
      setActiveIndex(0);
      return;
    }

    const index = Math.min(slideCount - 1, Math.floor(v * slideCount));

    if (index !== prevIndex.current) {
      setDirection(index > prevIndex.current ? 1 : -1);
      prevIndex.current = index;
    }
    setActiveIndex(index);
  });

  const segmentProgress = (activeIndex + 1) / slideCount;

  return { activeIndex, direction, segmentProgress };
}
