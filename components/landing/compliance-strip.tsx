"use client";

import {
  BadgeCheck,
  FileCheck,
  Lock,
  Scale,
  Shield,
  Users,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Shield, Scale, Lock, FileCheck, BadgeCheck, Users];

type ComplianceStripProps = {
  dict: Dictionary;
};

export function ComplianceStrip({ dict }: ComplianceStripProps) {
  const badges = dict.compliance.badges;
  const doubled = [...badges, ...badges];

  return (
    <div className="overflow-hidden border-y border-border bg-silver py-4">
      <div className="flex">
        <div className="animate-marquee flex shrink-0 items-center gap-6 pr-6">
          {doubled.map((badge, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={`${badge}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background px-4 py-2 shadow-sm"
              >
                <Icon size={14} className="text-primary" />
                <span className="text-xs font-medium tracking-wide">
                  {badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
