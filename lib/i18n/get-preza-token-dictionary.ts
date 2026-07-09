import type { PrezaTokenDictionary } from "@/lib/preza-token/types";

export async function getPrezaTokenDictionary(): Promise<PrezaTokenDictionary> {
  const module = await import("@/messages/preza-token.ru.json");
  return module.default as PrezaTokenDictionary;
}

export type { PrezaTokenDictionary, PrezaTokenSlide } from "@/lib/preza-token/types";
