import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary("ru");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
    },
    alternates: {
      languages: {
        en: "/",
        ru: "/ru",
      },
    },
  };
}

export default function RuHomePage() {
  return <LandingPage locale="ru" />;
}
