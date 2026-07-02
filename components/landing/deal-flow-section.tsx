"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  Building2,
  FileCheck,
  Globe,
  Landmark,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/routes";
import { PresentationChapter } from "./presentation-chapter";

type DealFlowSectionProps = {
  dict: Dictionary;
  locale: Locale;
};

const stakeholderIcons: LucideIcon[] = [UserRound, Building2, Users];
const partnerIcons: LucideIcon[] = [Landmark, Globe, ShieldCheck];

export function DealFlowSection({ dict }: DealFlowSectionProps) {
  const section = dict.howItWorks;

  return (
    <PresentationChapter id="journey" htmlId="how-it-works" showLabel>
      <section className="relative overflow-hidden bg-muted py-24 md:py-32">
        <div className="grain-overlay" />
        <div className="relative mx-auto max-w-7xl px-6">
          <header className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--brand-dark)]">
              {section.title}
              <br />
              {section.titleAccent}
            </h2>
            <div className="gold-rule mt-6 w-14" />
            <div className="mt-6 space-y-1 text-base text-muted-foreground md:text-lg">
              {section.subtitleLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </header>

          <div className="mx-auto mt-16 max-w-3xl md:mt-20">
            {section.stakeholders.map((item, index) => {
              const Icon = stakeholderIcons[index] ?? UserRound;

              return (
                <div key={item.label}>
                  <FlowNode label={item.label} icon={Icon} />
                  <FlowArrow />
                </div>
              );
            })}

            {/* ASIRU hub + partners panel */}
            <div className="surface-card rounded-3xl px-6 py-8 md:px-10 md:py-10">
              <div className="flex justify-center">
                <Image
                  src="/logo.png"
                  alt={section.hub}
                  width={900}
                  height={209}
                  className="h-9 w-auto md:h-10"
                />
              </div>

              <BranchConnector count={section.partners.length} />

              <div className="mt-10 grid gap-8 md:mt-0 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
                {section.partners.map((partner, index) => {
                  const Icon = partnerIcons[index] ?? ShieldCheck;

                  return (
                    <PartnerColumn
                      key={partner.title}
                      title={partner.title}
                      description={partner.description}
                      icon={Icon}
                    />
                  );
                })}
              </div>
            </div>

            <FlowArrow />

            <FlowNode label={section.outcome} icon={FileCheck} highlight />

            <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-muted-foreground md:mt-14 md:text-lg">
              {section.summary}
            </p>
          </div>
        </div>
      </section>
    </PresentationChapter>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center py-3 md:py-4" aria-hidden>
      <ArrowDown size={22} strokeWidth={1.75} className="text-primary/60" />
    </div>
  );
}

function FlowNode({
  label,
  icon: Icon,
  highlight = false,
}: {
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
}) {
  return (
    <div
      className={`surface-card flex items-center gap-5 rounded-2xl px-6 py-5 md:px-8 md:py-6 ${
        highlight ? "ring-1 ring-[var(--gold-soft)]/50" : ""
      }`}
    >
      <span className="gold-badge flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
        <Icon size={22} strokeWidth={1.4} />
      </span>
      <h3 className="font-display text-lg font-medium text-[var(--brand-dark)] md:text-xl">
        {label}
      </h3>
    </div>
  );
}

function PartnerColumn({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center px-4 text-center md:px-6">
      <span className="gold-badge flex h-14 w-14 items-center justify-center rounded-full">
        <Icon size={24} strokeWidth={1.4} />
      </span>
      <h3 className="mt-5 font-display text-lg font-medium text-[var(--brand-dark)]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/** Dashed line that branches from the hub down to each partner column (desktop only). */
function BranchConnector({ count }: { count: number }) {
  const points = Array.from({ length: count }, (_, i) =>
    count === 1 ? 50 : ((i + 0.5) / count) * 100,
  );

  return (
    <div className="relative mx-auto my-8 hidden h-9 max-w-[85%] md:block" aria-hidden>
      {/* vertical stub from the logo */}
      <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-primary/40" />
      {/* horizontal dashed line spanning the branch points */}
      <div
        className="absolute top-4 border-t border-dashed border-primary/40"
        style={{ left: `${points[0]}%`, right: `${100 - points[points.length - 1]}%` }}
      />
      {points.map((pct) => (
        <div
          key={pct}
          className="absolute top-4"
          style={{ left: `${pct}%` }}
        >
          <span className="absolute -top-1 left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
          <span className="absolute top-0 left-0 h-5 w-px -translate-x-1/2 bg-primary/40" />
        </div>
      ))}
    </div>
  );
}
