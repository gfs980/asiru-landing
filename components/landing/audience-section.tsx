import {
  Building2,
  UtensilsCrossed,
  Stethoscope,
  Car,
  Plane,
  Home,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { FadeIn, StaggerContainer, StaggerItem } from "./motion";

const icons = [Building2, Home, UtensilsCrossed, Stethoscope, Car, Plane];

type AudienceSectionProps = {
  dict: Dictionary;
};

export function AudienceSection({ dict }: AudienceSectionProps) {
  return (
    <section id="for-business" className="border-y border-border bg-muted py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {dict.audience.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict.audience.subtitle}
          </p>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dict.audience.segments.map((segment, i) => {
            const Icon = icons[i] ?? Building2;
            return (
              <StaggerItem key={segment.title}>
                <div className="group cursor-default rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-silver transition-colors group-hover:bg-primary-light">
                    <Icon
                      size={20}
                      className="text-muted-foreground transition-colors group-hover:text-primary"
                    />
                  </div>
                  <h3 className="font-semibold">{segment.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {segment.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
