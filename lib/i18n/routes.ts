export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const pageRoutes = {
  home: {
    en: "how-to-pay-with-rubles-in-thailand",
    ru: "kak-oplatit-rublyami-v-tailande",
  },
} as const;

export type PageKey = keyof typeof pageRoutes;

/** @deprecated SEO slugs — middleware redirects these to `/` and `/ru` */
export const legacyHomeSlugs = pageRoutes.home;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getSlug(page: PageKey, locale: Locale): string {
  return pageRoutes[page][locale];
}

export function getPageFromSlug(locale: Locale, slug: string): PageKey | null {
  for (const [page, slugs] of Object.entries(pageRoutes)) {
    if (slugs[locale] === slug) return page as PageKey;
  }
  return null;
}

export function getLocalizedPath(page: PageKey, locale: Locale): string {
  if (page === "home") {
    return locale === defaultLocale ? "/" : `/${locale}`;
  }
  return locale === defaultLocale
    ? `/${getSlug(page, locale)}`
    : `/${locale}/${getSlug(page, locale)}`;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment === "ru" ? "ru" : defaultLocale;
}
