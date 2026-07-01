import { defaultLocale, type Locale } from "./routes";

export const LOCALE_COOKIE_NAME = "asiru_locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function detectLocaleFromAcceptLanguage(
  acceptLanguage: string | null | undefined,
): Locale {
  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";q=");
      const quality = qPart ? Number.parseFloat(qPart) : 1;
      return {
        lang: lang.toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { lang } of languages) {
    const base = lang.split("-")[0];
    if (base === "ru") return "ru";
    if (base === "en") return "en";
  }

  return defaultLocale;
}

export function getLocaleFromCookie(
  value: string | null | undefined,
): Locale | null {
  if (!value) return null;
  return value === "ru" || value === "en" ? value : null;
}
