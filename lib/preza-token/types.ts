export type SlideLayout =
  | "hero"
  | "pillars"
  | "regions"
  | "flow-evolution"
  | "comparison"
  | "product-flow"
  | "product-wallet"
  | "product-simple"
  | "product-corridor"
  | "product-treasury"
  | "product-fx"
  | "equation"
  | "qa"
  | "split"
  | "metrics"
  | "compliance"
  | "value-grid"
  | "vision";

type BaseSlide = {
  id: string;
  eyebrow: string;
  title: string;
};

export type HeroSlide = BaseSlide & {
  layout: "hero";
  subtitle: string;
  regions: string[];
  integrationsTitle: string;
  integrations: string[];
  keyMessage: string;
};

export type PillarsSlide = BaseSlide & {
  layout: "pillars";
  intro: string;
  pillars: { label: string; icon: string }[];
  contrast: { limited: string; integrated: string };
  opportunityTitle: string;
  opportunity: string;
  needs: string[];
  role: string;
};

export type RegionBlock = {
  name: string;
  icon: string;
  items: string[];
  useCases?: string[];
};

export type RegionsSlide = BaseSlide & {
  layout: "regions";
  regions: RegionBlock[];
  keyMessage: string;
};

export type FlowEvolutionSlide = BaseSlide & {
  layout: "flow-evolution";
  currentLabel: string;
  currentFlow: string[];
  futureLabel: string;
  futureFlow: string[];
  examples: { route: string; flow: string }[];
  impactTitle: string;
  impact: string[];
};

export type ComparisonSlide = BaseSlide & {
  layout: "comparison";
  problemsTitle: string;
  problems: string[];
  solutionsTitle: string;
  solutions: string[];
  conclusion: string;
};

export type ProductFlowSlide = BaseSlide & {
  layout: "product-flow";
  productNumber: number;
  targetsTitle?: string;
  targets?: string[];
  description?: string;
  exampleTitle?: string;
  traditionalLabel?: string;
  traditionalFlow?: string;
  newLabel?: string;
  newFlow: string[];
  benefitsBusiness?: string[];
  benefitsA7A5?: string[];
  holdsTitle?: string;
  holds?: string[];
  needsTitle?: string;
  needs?: string[];
  useCasesTitle?: string;
  useCases?: string[];
  impact?: string;
};

export type ProductWalletSlide = BaseSlide & {
  layout: "product-wallet";
  productNumber: number;
  assetsTitle: string;
  assets: string[];
  capabilitiesTitle: string;
  capabilities: string[];
  targetsTitle: string;
  targets: string[];
  impact: string;
};

export type ProductSimpleSlide = BaseSlide & {
  layout: "product-simple";
  productNumber: number;
  acceptTitle: string;
  accept: string[];
  receiveTitle: string;
  receive: string[];
  examplesTitle: string;
  examples: string[];
  impact: string;
};

export type ProductCorridorSlide = BaseSlide & {
  layout: "product-corridor";
  productNumber: number;
  highlight: string;
  markets: string[];
  useCases: string[];
  flow: string[];
  conclusion: string;
};

export type ProductTreasurySlide = BaseSlide & {
  layout: "product-treasury";
  productNumber: number;
  description: string;
  accountTitle: string;
  currencies: string[];
  capabilities: string[];
  impact: string;
};

export type ProductFxSlide = BaseSlide & {
  layout: "product-fx";
  productNumber: number;
  pairsTitle: string;
  pairs: string[];
  benefitsTitle: string;
  benefits: string[];
  conclusion: string;
};

export type EquationSlide = BaseSlide & {
  layout: "equation";
  factors: { label: string; detail: string; icon: string }[];
  result: string;
  objective: string;
};

export type QaSlide = BaseSlide & {
  layout: "qa";
  question: string;
  answers: string[];
  conclusion: string;
};

export type SplitSlide = BaseSlide & {
  layout: "split";
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
  sharedGoal: string;
};

export type MetricsSlide = BaseSlide & {
  layout: "metrics";
  phase1Title: string;
  phase1: string[];
  objectivesTitle: string;
  objectives: string[];
  longTerm: string;
};

export type ComplianceSlide = BaseSlide & {
  layout: "compliance";
  intro: string;
  items: string[];
  goal: string;
};

export type ValueGridSlide = BaseSlide & {
  layout: "value-grid";
  values: { title: string; description: string }[];
};

export type VisionSlide = BaseSlide & {
  layout: "vision";
  quotes: string[];
  coreMessage: string;
};

export type PrezaTokenSlide =
  | HeroSlide
  | PillarsSlide
  | RegionsSlide
  | FlowEvolutionSlide
  | ComparisonSlide
  | ProductFlowSlide
  | ProductWalletSlide
  | ProductSimpleSlide
  | ProductCorridorSlide
  | ProductTreasurySlide
  | ProductFxSlide
  | EquationSlide
  | QaSlide
  | SplitSlide
  | MetricsSlide
  | ComplianceSlide
  | ValueGridSlide
  | VisionSlide;

export type PrezaTokenDictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    brand: string;
    confidential: string;
    slideLabel: string;
    prev: string;
    next: string;
    scrollHint: string;
    menu: string;
  };
  slides: PrezaTokenSlide[];
};
