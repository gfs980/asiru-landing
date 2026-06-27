"use client";

import { Check, Minus, X } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { PresentationChapter } from "./presentation-chapter";
import { FadeIn } from "./motion";

type ComparisonTableProps = {
  dict: Dictionary;
  locale: Locale;
};

type CellValue = "yes" | "no" | "partial";

function CellIcon({ value }: { value: CellValue }) {
  if (value === "yes") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
        <Check size={14} className="text-primary" />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/10">
        <Minus size={14} className="text-amber-600" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10">
      <X size={14} className="text-red-500" />
    </span>
  );
}

export function ComparisonTable({ dict, locale }: ComparisonTableProps) {
  const c = dict.comparison;
  const useDisplayFont = locale === "en";
  const columns: { key: "asiru" | "banks" | "grey"; label: string }[] = [
    { key: "asiru", label: c.columns.asiru },
    { key: "banks", label: c.columns.banks },
    { key: "grey", label: c.columns.grey },
  ];

  return (
    <PresentationChapter id="compare">
      <section className="bg-background py-28">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2
              className={`text-3xl tracking-tight md:text-5xl ${
                useDisplayFont ? "font-display font-normal" : "font-sans font-bold"
              }`}
            >
              {c.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{c.subtitle}</p>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-14 overflow-hidden rounded-3xl border border-border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="px-6 py-4 font-medium text-muted-foreground">
                      {c.featureHeader}
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className={`px-6 py-4 text-center font-semibold ${
                          col.key === "asiru" ? "bg-primary-light text-primary" : ""
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-border last:border-0 ${
                        i % 2 === 0 ? "bg-background" : "bg-muted/40"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium">{row.feature}</td>
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-6 py-4 text-center ${
                            col.key === "asiru" ? "bg-primary-light/30" : ""
                          }`}
                        >
                          <CellIcon value={row[col.key] as CellValue} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={0.25} className="mt-8 text-center">
            <a
              href="#contact"
              className="inline-flex cursor-pointer rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              {c.cta}
            </a>
          </FadeIn>
        </div>
      </section>
    </PresentationChapter>
  );
}
