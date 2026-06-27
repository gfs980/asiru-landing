"use client";

import { Activity } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type LiveTickerProps = {
  dict: Dictionary;
};

export function LiveTicker({ dict }: LiveTickerProps) {
  const ticker = dict.liveTicker;
  const doubled = [...ticker.items, ...ticker.items];

  return (
    <div className="border-b border-border bg-background py-3">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6">
        <div className="flex shrink-0 items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <Activity size={14} className="text-primary" />
          <span className="font-mono-data text-[10px] uppercase tracking-widest text-muted-foreground">
            {ticker.label}
          </span>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
            {doubled.map((item, i) => (
              <div
                key={`${item.text}-${i}`}
                className="flex shrink-0 items-center gap-3 whitespace-nowrap"
              >
                <span className="text-sm text-foreground">{item.text}</span>
                <span className="font-mono-data text-[10px] text-muted-foreground">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
