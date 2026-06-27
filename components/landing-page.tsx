import type { Locale } from "@/lib/i18n/routes";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { AboutSection } from "@/components/landing/about-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { ComparisonTable } from "@/components/landing/comparison-table";
import { ComplianceStrip } from "@/components/landing/compliance-strip";
import { CTASection } from "@/components/landing/cta-section";
import { FAQSection } from "@/components/landing/faq-section";
import { FeaturesBento } from "@/components/landing/features-bento";
import { StatementBand } from "@/components/landing/statement-band";
import { Footer } from "@/components/landing/footer";
import { FxCalculator } from "@/components/landing/fx-calculator";
import { Header } from "@/components/landing/header";
import { LiveTicker } from "@/components/landing/live-ticker";
import { Hero } from "@/components/landing/hero";
import { HorizontalCasesScroll } from "@/components/landing/horizontal-cases-scroll";
import { PresentationChapter } from "@/components/landing/presentation-chapter";
import { PresentationShell } from "@/components/landing/presentation-shell";
import { ProblemsSection } from "@/components/landing/problems-section";
import { ScrollPaymentJourney } from "@/components/landing/scroll-payment-journey";
import { SocialProofSection } from "@/components/landing/social-proof-section";
import { TrustBar } from "@/components/landing/trust-bar";

type LandingPageProps = {
  locale: Locale;
};

export async function LandingPage({ locale }: LandingPageProps) {
  const dict = await getDictionary(locale);

  return (
    <PresentationShell dict={dict} locale={locale}>
      <Header dict={dict} locale={locale} />
      <main className="presentation-main">
        <PresentationChapter id="hook" showLabel>
          <Hero dict={dict} locale={locale} />
        </PresentationChapter>

        <PresentationChapter id="proof" showLabel>
          <SocialProofSection dict={dict} />
          <LiveTicker dict={dict} />
        </PresentationChapter>

        <PresentationChapter id="trust" showLabel>
          <ComplianceStrip dict={dict} />
          <TrustBar dict={dict} />
        </PresentationChapter>

        <PresentationChapter id="problem" htmlId="product" showLabel>
          <ProblemsSection dict={dict} />
        </PresentationChapter>

        <PresentationChapter id="calculate" htmlId="calculator" showLabel>
          <FxCalculator dict={dict} locale={locale} />
        </PresentationChapter>

        <ScrollPaymentJourney dict={dict} locale={locale} />

        <HorizontalCasesScroll dict={dict} locale={locale} />

        <PresentationChapter id="statement" showLabel>
          <StatementBand dict={dict} locale={locale} />
        </PresentationChapter>

        <PresentationChapter id="audience" showLabel>
          <AudienceSection dict={dict} />
        </PresentationChapter>

        <PresentationChapter id="features" showLabel>
          <FeaturesBento dict={dict} locale={locale} />
        </PresentationChapter>

        <ComparisonTable dict={dict} locale={locale} />

        <PresentationChapter id="about" showLabel>
          <AboutSection dict={dict} locale={locale} />
        </PresentationChapter>

        <PresentationChapter id="faq" showLabel>
          <FAQSection dict={dict} locale={locale} />
        </PresentationChapter>

        <PresentationChapter id="cta" htmlId="contact" showLabel>
          <CTASection dict={dict} locale={locale} />
        </PresentationChapter>
      </main>
      <Footer dict={dict} locale={locale} />
    </PresentationShell>
  );
}
