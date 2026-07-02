import type { Locale } from "@/lib/i18n/routes";

export type ChapterId = "hook" | "journey" | "why" | "faq" | "cta";

export type Chapter = {
  id: ChapterId;
  label: Record<Locale, string>;
};

export const presentationChapters: Chapter[] = [
  { id: "hook", label: { en: "Intro", ru: "Вступление" } },
  { id: "journey", label: { en: "Deal flow", ru: "Сделка" } },
  { id: "why", label: { en: "Why Asiru", ru: "Почему Asiru" } },
  { id: "faq", label: { en: "FAQ", ru: "Вопросы" } },
  { id: "cta", label: { en: "Start", ru: "Старт" } },
];

export function getChapterLabel(id: ChapterId, locale: Locale): string {
  return presentationChapters.find((c) => c.id === id)?.label[locale] ?? id;
}
