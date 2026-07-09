import type { Metadata } from "next";
import { cookies } from "next/headers";
import { PrezaTokenGate } from "@/components/preza-token/preza-token-gate";
import { getPrezaTokenDictionary } from "@/lib/i18n/get-preza-token-dictionary";
import { isPrezaTokenAuthed } from "@/lib/preza-token/auth";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const authed = isPrezaTokenAuthed(await cookies());

  if (!authed) {
    return {
      title: "Asiru",
      robots: { index: false, follow: false },
    };
  }

  const dict = await getPrezaTokenDictionary();
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function PrezaTokenPage() {
  const authed = isPrezaTokenAuthed(await cookies());

  if (!authed) {
    return <PrezaTokenGate />;
  }

  const dict = await getPrezaTokenDictionary();
  const { PrezaTokenPresentation } = await import(
    "@/components/preza-token/preza-token-presentation"
  );

  return <PrezaTokenPresentation dict={dict} />;
}
