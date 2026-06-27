import type { Locale } from "@/lib/i18n/routes";

export type ChapterId =
  | "hook"
  | "proof"
  | "trust"
  | "problem"
  | "calculate"
  | "journey"
  | "cases"
  | "statement"
  | "audience"
  | "features"
  | "compare"
  | "about"
  | "faq"
  | "cta";

export type Chapter = {
  id: ChapterId;
  label: Record<Locale, string>;
};

export const presentationChapters: Chapter[] = [
  { id: "hook", label: { en: "Intro", ru: "Вступление" } },
  { id: "proof", label: { en: "Proof", ru: "Доверие" } },
  { id: "trust", label: { en: "Compliance", ru: "Комплаенс" } },
  { id: "problem", label: { en: "Problem", ru: "Проблема" } },
  { id: "calculate", label: { en: "Calculator", ru: "Калькулятор" } },
  { id: "journey", label: { en: "Journey", ru: "Путь платежа" } },
  { id: "cases", label: { en: "Cases", ru: "Кейсы" } },
  { id: "statement", label: { en: "Impact", ru: "Результат" } },
  { id: "audience", label: { en: "Audience", ru: "Для кого" } },
  { id: "features", label: { en: "Features", ru: "Возможности" } },
  { id: "compare", label: { en: "Compare", ru: "Сравнение" } },
  { id: "about", label: { en: "About", ru: "О нас" } },
  { id: "faq", label: { en: "FAQ", ru: "Вопросы" } },
  { id: "cta", label: { en: "Start", ru: "Старт" } },
];

export function getChapterLabel(id: ChapterId, locale: Locale): string {
  return presentationChapters.find((c) => c.id === id)?.label[locale] ?? id;
}
