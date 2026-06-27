import { Shield, Eye, Scale, BadgeCheck } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { FadeIn } from "./motion";

const icons = [Shield, Scale, Eye, BadgeCheck];

type TrustBarProps = {
  dict: Dictionary;
};

export function TrustBar({ dict }: TrustBarProps) {
  return (
    <section className="border-y border-border bg-muted py-12">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {dict.trust.title}
          </p>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.trust.items.map((item, i) => {
            const Icon = icons[i] ?? Shield;
            return (
              <FadeIn key={item} delay={i * 0.1}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="text-sm leading-snug">{item}</span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
