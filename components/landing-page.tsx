import type { Locale } from "@/lib/i18n/routes";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { CTASection } from "@/components/landing/cta-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { PresentationChapter } from "@/components/landing/presentation-chapter";
import { PresentationShell } from "@/components/landing/presentation-shell";
import { DealFlowSection } from "@/components/landing/deal-flow-section";
import { WhyPartnersSection } from "@/components/landing/why-partners-section";
import { BecomePartnerSection } from "@/components/landing/become-partner-section";

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

        <DealFlowSection dict={dict} locale={locale} />

        <WhyPartnersSection dict={dict} locale={locale} />

        <PresentationChapter id="faq" htmlId="faq" showLabel>
          <FAQSection dict={dict} locale={locale} />
        </PresentationChapter>

        <BecomePartnerSection dict={dict} locale={locale} />

        <PresentationChapter id="cta" htmlId="contact" showLabel>
          <CTASection dict={dict} locale={locale} />
        </PresentationChapter>
      </main>
      <Footer dict={dict} locale={locale} />
    </PresentationShell>
  );
}
