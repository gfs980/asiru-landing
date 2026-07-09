"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRightLeft,
  Building2,
  Droplets,
  Globe2,
  Landmark,
  Layers,
  MapPin,
  Network,
  Repeat,
  ShieldCheck,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import type { HeroSlide as HeroSlideType, PrezaTokenSlide } from "@/lib/preza-token/types";
import {
  FlowPipeline,
  SlideEyebrow,
  SlideTitle,
  StaggerList,
} from "./preza-token-slide-primitives";

const ease = [0.22, 1, 0.36, 1] as const;

const pillarIcons: Record<string, LucideIcon> = {
  droplets: Droplets,
  repeat: Repeat,
  layers: Layers,
  network: Network,
};

const factorIcons: Record<string, LucideIcon> = {
  users: Users,
  building: Building2,
  landmark: Landmark,
  store: Store,
};

type PrezaTokenSlideContentProps = {
  slide: PrezaTokenSlide;
  isInView: boolean;
};

export function PrezaTokenSlideContent({
  slide,
  isInView,
}: PrezaTokenSlideContentProps) {
  switch (slide.layout) {
    case "hero":
      return <HeroSlide slide={slide} isInView={isInView} />;
    case "pillars":
      return <PillarsSlide slide={slide} />;
    case "regions":
      return <RegionsSlide slide={slide} />;
    case "flow-evolution":
      return <FlowEvolutionSlide slide={slide} />;
    case "comparison":
      return <ComparisonSlide slide={slide} />;
    case "product-flow":
      return <ProductFlowSlide slide={slide} />;
    case "product-wallet":
      return <ProductWalletSlide slide={slide} />;
    case "product-simple":
      return <ProductSimpleSlide slide={slide} />;
    case "product-corridor":
      return <ProductCorridorSlide slide={slide} />;
    case "product-treasury":
      return <ProductTreasurySlide slide={slide} />;
    case "product-fx":
      return <ProductFxSlide slide={slide} />;
    case "equation":
      return <EquationSlide slide={slide} isInView={isInView} />;
    case "qa":
      return <QaSlide slide={slide} />;
    case "split":
      return <SplitSlide slide={slide} />;
    case "metrics":
      return <MetricsSlide slide={slide} />;
    case "compliance":
      return <ComplianceSlide slide={slide} />;
    case "value-grid":
      return <ValueGridSlide slide={slide} />;
    case "vision":
      return <VisionSlide slide={slide} />;
    default:
      return null;
  }
}

function HeroSlide({
  slide,
  isInView,
}: {
  slide: HeroSlideType;
  isInView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="text-center">
      <SlideEyebrow dark>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle dark className="mx-auto max-w-4xl">
        {slide.title}
      </SlideTitle>
      <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
        {slide.subtitle}
      </p>

      <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3">
        {slide.regions.map((region, i) => (
          <motion.span
            key={region}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease }}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm"
          >
            {region}
          </motion.span>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
        <p className="mb-5 text-sm font-medium text-gold-soft">
          {slide.integrationsTitle}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {slide.integrations.map((item) => (
            <span
              key={item}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/80 md:text-sm"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-sm italic leading-relaxed text-white/70 md:text-base">
          {slide.keyMessage}
        </p>
      </div>
    </div>
  );
}

function PillarsSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "pillars" }>;
}) {
  return (
    <div>
      <SlideEyebrow>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle>{slide.title}</SlideTitle>
      <p className="mt-4 text-muted-foreground">{slide.intro}</p>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {slide.pillars.map((pillar, i) => {
          const Icon = pillarIcons[pillar.icon] ?? TrendingUp;
          return (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45, ease }}
              className="surface-card rounded-2xl p-5 text-center"
            >
              <div className="gold-badge mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-medium text-[var(--brand-dark)]">{pillar.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="surface-silver rounded-2xl p-5 md:p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {slide.contrast.limited}
          </p>
        </div>
        <div className="statement-band rounded-2xl p-5 text-white md:p-6">
          <p className="text-sm leading-relaxed text-white/85">
            {slide.contrast.integrated}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="font-display text-xl text-[var(--brand-dark)]">
          {slide.opportunityTitle}
        </h3>
        <p className="mt-2 text-muted-foreground">{slide.opportunity}</p>
        <StaggerList items={slide.needs} className="mt-4" />
        <p className="mt-6 font-medium text-[var(--brand-dark)]">{slide.role}</p>
      </div>
    </div>
  );
}

function RegionsSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "regions" }>;
}) {
  const regionIcons: LucideIcon[] = [Landmark, Globe2, MapPin];

  return (
    <div>
      <SlideEyebrow>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle>{slide.title}</SlideTitle>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {slide.regions.map((region, i) => {
          const Icon = regionIcons[i] ?? Globe2;
          return (
            <motion.article
              key={region.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease }}
              className="surface-card flex flex-col rounded-2xl p-6"
            >
              <div className="gold-badge mb-4 flex h-10 w-10 items-center justify-center rounded-xl">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg text-[var(--brand-dark)]">
                {region.name}
              </h3>
              <StaggerList items={region.items} className="mt-4" />
              {"useCases" in region && region.useCases && (
                <div className="mt-auto border-t border-border pt-4">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gold">
                    Сценарии
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {region.useCases.map((uc) => (
                      <span
                        key={uc}
                        className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>

      <p className="mt-10 text-center text-base font-medium text-[var(--brand-dark)] md:text-lg">
        {slide.keyMessage}
      </p>
    </div>
  );
}

function FlowEvolutionSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "flow-evolution" }>;
}) {
  return (
    <div>
      <SlideEyebrow>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle>{slide.title}</SlideTitle>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="surface-silver rounded-2xl p-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {slide.currentLabel}
          </p>
          <FlowPipeline steps={slide.currentFlow} />
        </div>
        <div className="liquid-edge statement-band rounded-2xl p-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-gold-soft">
            {slide.futureLabel}
          </p>
          <FlowPipeline steps={slide.futureFlow} dark />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {slide.examples.map((ex, i) => (
          <motion.div
            key={ex.route}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4, ease }}
            className="surface-card flex flex-col gap-2 rounded-xl p-4 md:flex-row md:items-center md:justify-between"
          >
            <span className="font-medium text-[var(--brand-dark)]">{ex.route}</span>
            <span className="font-mono-data text-sm text-gold">{ex.flow}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-3 font-display text-lg text-[var(--brand-dark)]">
          {slide.impactTitle}
        </h3>
        <StaggerList items={slide.impact} />
      </div>
    </div>
  );
}

function ComparisonSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "comparison" }>;
}) {
  return (
    <div>
      <SlideEyebrow>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle>{slide.title}</SlideTitle>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-red-200/60 bg-red-50/50 p-6">
          <h3 className="mb-4 font-display text-lg text-[var(--brand-dark)]">
            {slide.problemsTitle}
          </h3>
          <StaggerList items={slide.problems} />
        </div>
        <div className="statement-band rounded-2xl p-6 text-white">
          <h3 className="mb-4 font-display text-lg">{slide.solutionsTitle}</h3>
          <StaggerList items={slide.solutions} dark />
        </div>
      </div>

      <p className="mt-8 text-center text-base font-medium leading-relaxed text-[var(--brand-dark)] md:text-lg">
        {slide.conclusion}
      </p>
    </div>
  );
}

function ProductFlowSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "product-flow" }>;
}) {
  return (
    <div>
      <ProductBadge number={slide.productNumber} label={slide.eyebrow} />
      <SlideTitle className="mt-3">{slide.title}</SlideTitle>

      {"targets" in slide && slide.targets && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-gold">{slide.targetsTitle}</p>
          <div className="flex flex-wrap gap-2">
            {slide.targets.map((t) => (
              <span
                key={t}
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {"description" in slide && slide.description && (
        <p className="mt-4 text-muted-foreground">{slide.description}</p>
      )}

      {"exampleTitle" in slide && slide.exampleTitle && (
        <p className="mt-8 font-medium text-[var(--brand-dark)]">
          {slide.exampleTitle}
        </p>
      )}

      {"holds" in slide && slide.holds && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <InfoCard title={slide.holdsTitle!} items={slide.holds} />
          <InfoCard title={slide.needsTitle!} items={slide.needs!} />
        </div>
      )}

      {"traditionalFlow" in slide && slide.traditionalFlow && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="surface-silver rounded-xl p-5">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
              {slide.traditionalLabel}
            </p>
            <p className="font-mono-data text-sm text-muted-foreground">
              {slide.traditionalFlow}
            </p>
          </div>
          <div className="statement-band rounded-xl p-5">
            <p className="mb-3 text-xs uppercase tracking-wider text-gold-soft">
              {slide.newLabel}
            </p>
            <FlowPipeline steps={slide.newFlow} dark />
          </div>
        </div>
      )}

      {"newFlow" in slide && !("traditionalFlow" in slide) && slide.newFlow && (
        <div className="mt-8">
          <FlowPipeline steps={slide.newFlow} />
        </div>
      )}

      {"benefitsBusiness" in slide &&
        slide.benefitsBusiness &&
        slide.benefitsA7A5 && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <BenefitCard title="Для бизнеса" items={slide.benefitsBusiness} />
          <BenefitCard title="Для A7A5" items={slide.benefitsA7A5} dark />
        </div>
      )}

      {"useCases" in slide && slide.useCases && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-gold">{slide.useCasesTitle}</p>
          <StaggerList items={slide.useCases} />
        </div>
      )}

      {"impact" in slide && typeof slide.impact === "string" && (
        <p className="mt-8 border-l-2 border-gold pl-4 text-base font-medium text-[var(--brand-dark)]">
          {slide.impact}
        </p>
      )}
    </div>
  );
}

function ProductWalletSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "product-wallet" }>;
}) {
  return (
    <div>
      <ProductBadge number={slide.productNumber} label={slide.eyebrow} />
      <SlideTitle className="mt-3">{slide.title}</SlideTitle>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <InfoCard title={slide.assetsTitle} items={slide.assets} />
        <InfoCard title={slide.capabilitiesTitle} items={slide.capabilities} />
        <InfoCard title={slide.targetsTitle} items={slide.targets} />
      </div>

      <p className="mt-8 text-center font-medium text-[var(--brand-dark)]">
        {slide.impact}
      </p>
    </div>
  );
}

function ProductSimpleSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "product-simple" }>;
}) {
  return (
    <div>
      <ProductBadge number={slide.productNumber} label={slide.eyebrow} />
      <SlideTitle className="mt-3">{slide.title}</SlideTitle>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ArrowCard title={slide.acceptTitle} items={slide.accept} />
        <ArrowCard title={slide.receiveTitle} items={slide.receive} highlight />
      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium text-gold">{slide.examplesTitle}</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {slide.examples.map((ex) => (
            <div
              key={ex}
              className="surface-card rounded-xl p-4 text-center text-sm text-muted-foreground"
            >
              {ex}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center font-medium text-[var(--brand-dark)]">
        {slide.impact}
      </p>
    </div>
  );
}

function ProductCorridorSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "product-corridor" }>;
}) {
  return (
    <div>
      <ProductBadge number={slide.productNumber} label={slide.eyebrow} />
      <SlideTitle className="mt-3">{slide.title}</SlideTitle>
      <p className="mt-4 text-lg text-gold">{slide.highlight}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {slide.markets.map((m) => (
          <span
            key={m}
            className="rounded-full border border-gold/30 bg-gold-light px-4 py-1.5 text-sm font-medium text-[var(--brand-dark)]"
          >
            {m}
          </span>
        ))}
      </div>

      <StaggerList items={slide.useCases} className="mt-6" />
      <div className="mt-8">
        <FlowPipeline steps={slide.flow} />
      </div>
      <p className="mt-8 text-center font-medium text-[var(--brand-dark)]">
        {slide.conclusion}
      </p>
    </div>
  );
}

function ProductTreasurySlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "product-treasury" }>;
}) {
  return (
    <div>
      <ProductBadge number={slide.productNumber} label={slide.eyebrow} />
      <SlideTitle className="mt-3">{slide.title}</SlideTitle>
      <p className="mt-4 text-muted-foreground">{slide.description}</p>

      <div className="mt-8 surface-card rounded-2xl p-6 md:p-8">
        <p className="mb-4 text-sm font-medium text-gold">{slide.accountTitle}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {slide.currencies.map((c) => (
            <span
              key={c}
              className="font-mono-data rounded-lg bg-muted px-3 py-1.5 text-sm"
            >
              {c}
            </span>
          ))}
        </div>
        <StaggerList items={slide.capabilities} />
      </div>

      <p className="mt-6 text-center font-medium text-[var(--brand-dark)]">
        {slide.impact}
      </p>
    </div>
  );
}

function ProductFxSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "product-fx" }>;
}) {
  return (
    <div>
      <ProductBadge number={slide.productNumber} label={slide.eyebrow} />
      <SlideTitle className="mt-3">{slide.title}</SlideTitle>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-medium text-gold">{slide.pairsTitle}</p>
          <div className="space-y-3">
            {slide.pairs.map((pair) => (
              <div
                key={pair}
                className="surface-card flex items-center gap-3 rounded-xl p-4"
              >
                <ArrowRightLeft className="h-4 w-4 text-gold" />
                <span className="font-mono-data text-sm">{pair}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-gold">{slide.benefitsTitle}</p>
          <StaggerList items={slide.benefits} />
        </div>
      </div>

      <p className="mt-8 text-center font-medium text-[var(--brand-dark)]">
        {slide.conclusion}
      </p>
    </div>
  );
}

function EquationSlide({
  slide,
  isInView,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "equation" }>;
  isInView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="text-center">
      <SlideEyebrow dark>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle dark>{slide.title}</SlideTitle>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {slide.factors.map((factor, i) => {
          const Icon = factorIcons[factor.icon] ?? Users;
          return (
            <div key={factor.label} className="flex items-center gap-3 md:gap-4">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.15, duration: 0.45, ease }}
                className="w-36 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm md:w-40"
              >
                <Icon className="mx-auto mb-2 h-5 w-5 text-gold-soft" />
                <p className="text-sm font-medium text-white">{factor.label}</p>
                <p className="mt-1 text-xs text-white/60">{factor.detail}</p>
              </motion.div>
              {i < slide.factors.length - 1 && (
                <span className="text-xl text-gold-soft" aria-hidden>
                  +
                </span>
              )}
            </div>
          );
        })}
      </div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.5, ease }}
        className="mx-auto mt-10 max-w-md"
      >
        <p className="text-2xl text-gold-soft" aria-hidden>
          =
        </p>
        <p className="mt-2 font-display text-2xl text-white md:text-3xl">
          {slide.result}
        </p>
        <p className="mt-4 text-sm text-white/70">{slide.objective}</p>
      </motion.div>
    </div>
  );
}

function QaSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "qa" }>;
}) {
  return (
    <div>
      <SlideEyebrow>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle>{slide.title}</SlideTitle>

      <div className="mt-10 surface-card rounded-2xl p-6 md:p-8">
        <p className="font-display text-xl italic text-[var(--brand-dark)] md:text-2xl">
          «{slide.question}»
        </p>
      </div>

      <div className="mt-8">
        <StaggerList items={slide.answers} />
      </div>

      <p className="mt-8 border-l-4 border-gold pl-5 text-base font-medium leading-relaxed text-[var(--brand-dark)] md:text-lg">
        {slide.conclusion}
      </p>
    </div>
  );
}

function SplitSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "split" }>;
}) {
  return (
    <div>
      <SlideEyebrow>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle>{slide.title}</SlideTitle>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="surface-silver rounded-2xl p-6">
          <h3 className="mb-4 font-display text-lg text-[var(--brand-dark)]">
            {slide.leftTitle}
          </h3>
          <StaggerList items={slide.leftItems} />
        </div>
        <div className="statement-band rounded-2xl p-6 text-white">
          <h3 className="mb-4 font-display text-lg">{slide.rightTitle}</h3>
          <StaggerList items={slide.rightItems} dark />
        </div>
      </div>

      <p className="mt-8 text-center font-medium text-[var(--brand-dark)]">
        {slide.sharedGoal}
      </p>
    </div>
  );
}

function MetricsSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "metrics" }>;
}) {
  return (
    <div>
      <SlideEyebrow>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle>{slide.title}</SlideTitle>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <MetricPhase title={slide.phase1Title} items={slide.phase1} />
        <MetricPhase title={slide.objectivesTitle} items={slide.objectives} highlight />
        <div className="surface-card flex items-center justify-center rounded-2xl p-6 text-center">
          <p className="font-display text-lg leading-snug text-[var(--brand-dark)]">
            {slide.longTerm}
          </p>
        </div>
      </div>
    </div>
  );
}

function ComplianceSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "compliance" }>;
}) {
  return (
    <div>
      <SlideEyebrow>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle>{slide.title}</SlideTitle>
      <p className="mt-4 text-muted-foreground">{slide.intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {slide.items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4, ease }}
            className="surface-card flex items-start gap-3 rounded-xl p-4"
          >
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <span className="text-sm text-muted-foreground md:text-base">{item}</span>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center font-medium text-[var(--brand-dark)]">
        {slide.goal}
      </p>
    </div>
  );
}

function ValueGridSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "value-grid" }>;
}) {
  return (
    <div>
      <SlideEyebrow>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle>{slide.title}</SlideTitle>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slide.values.map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45, ease }}
            className={`surface-card rounded-2xl p-5 ${
              i === slide.values.length - 1 && slide.values.length % 2 !== 0
                ? "sm:col-span-2 lg:col-span-1"
                : ""
            }`}
          >
            <h3 className="font-display text-lg text-gold">{value.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function VisionSlide({
  slide,
}: {
  slide: Extract<PrezaTokenSlide, { layout: "vision" }>;
}) {
  return (
    <div className="text-center">
      <SlideEyebrow dark>{slide.eyebrow}</SlideEyebrow>
      <SlideTitle dark className="mx-auto max-w-4xl">
        {slide.title}
      </SlideTitle>

      <div className="mx-auto mt-10 max-w-3xl space-y-6">
        {slide.quotes.map((quote, i) => (
          <motion.p
            key={quote}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5, ease }}
            className="text-base leading-relaxed text-white/80 md:text-lg"
          >
            {quote}
          </motion.p>
        ))}
      </div>

      <div className="gold-rule mx-auto mt-12 w-20" />

      <p className="mx-auto mt-8 max-w-3xl text-sm italic leading-relaxed text-gold-soft md:text-base">
        {slide.coreMessage}
      </p>
    </div>
  );
}

function ProductBadge({ number, label }: { number: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="gold-badge flex h-9 w-9 items-center justify-center rounded-lg font-mono-data text-sm font-bold">
        {number}
      </span>
      <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-gold">
        {label}
      </span>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="surface-card rounded-xl p-5">
      <p className="mb-3 text-sm font-medium text-gold">{title}</p>
      <StaggerList items={items} />
    </div>
  );
}

function BenefitCard({
  title,
  items,
  dark = false,
}: {
  title: string;
  items: string[];
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 ${
        dark ? "statement-band text-white" : "surface-silver"
      }`}
    >
      <p
        className={`mb-3 text-sm font-medium ${
          dark ? "text-gold-soft" : "text-gold"
        }`}
      >
        {title}
      </p>
      <StaggerList items={items} dark={dark} />
    </div>
  );
}

function ArrowCard({
  title,
  items,
  highlight = false,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 ${
        highlight ? "statement-band text-white" : "surface-card"
      }`}
    >
      <p
        className={`mb-3 text-sm font-medium ${
          highlight ? "text-gold-soft" : "text-gold"
        }`}
      >
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={`font-mono-data text-sm ${
              highlight ? "text-white/90" : "text-[var(--brand-dark)]"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricPhase({
  title,
  items,
  highlight = false,
}: {
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 ${
        highlight ? "statement-band text-white" : "surface-card"
      }`}
    >
      <h3
        className={`mb-4 font-display text-lg ${
          highlight ? "text-gold-soft" : "text-[var(--brand-dark)]"
        }`}
      >
        {title}
      </h3>
      <StaggerList items={items} dark={highlight} />
    </div>
  );
}
