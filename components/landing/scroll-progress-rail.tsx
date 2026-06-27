"use client";

import { presentationChapters } from "@/lib/presentation/chapters";
import { getChapterLabel } from "@/lib/presentation/chapters";
import { usePresentation } from "./presentation-context";

export function ScrollProgressRail() {
  const { activeChapter, scrollProgress, locale, scrollToChapter } =
    usePresentation();

  return (
    <aside
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      aria-label="Presentation progress"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-0">
        <div className="relative flex flex-col items-center">
          <div className="absolute top-2 bottom-2 w-px bg-border" />
          <ProgressFill progress={scrollProgress} />

          {presentationChapters.map((chapter) => {
            const isActive = activeChapter === chapter.id;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => scrollToChapter(chapter.id)}
                className="group relative flex cursor-pointer items-center gap-3 py-2"
                aria-label={getChapterLabel(chapter.id, locale)}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={`relative z-10 block rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-3 w-3 bg-primary shadow-[0_0_12px_var(--primary-glow)]"
                      : "h-2 w-2 bg-border group-hover:bg-primary/40"
                  }`}
                />
                <span
                  className={`absolute left-6 whitespace-nowrap rounded-md px-2 py-1 font-mono-data text-[10px] uppercase tracking-widest transition-all ${
                    isActive
                      ? "translate-x-0 opacity-100 text-primary"
                      : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-70 text-muted-foreground"
                  }`}
                >
                  {getChapterLabel(chapter.id, locale)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 font-mono-data text-[9px] tabular-nums text-muted-foreground">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>
    </aside>
  );
}

function ProgressFill({ progress }: { progress: number }) {
  return (
    <div
      className="absolute top-2 w-px origin-top bg-primary transition-[height] duration-150"
      style={{ height: `${progress * 100}%` }}
    />
  );
}
