import { NextRequest, NextResponse } from "next/server";
import {
  detectLocaleFromAcceptLanguage,
  getLocaleFromCookie,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
} from "@/lib/i18n/detect-locale";
import { defaultLocale, legacyHomeSlugs, type Locale } from "@/lib/i18n/routes";

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

function redirectWithLocale(
  request: NextRequest,
  pathname: string,
  locale: Locale,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const response = NextResponse.redirect(url, 307);
  setLocaleCookie(response, locale);
  return response;
}

function resolvePreferredLocale(request: NextRequest): Locale {
  const cookieLocale = getLocaleFromCookie(
    request.cookies.get(LOCALE_COOKIE_NAME)?.value,
  );
  if (cookieLocale) return cookieLocale;

  return detectLocaleFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
}

function handleHomeLocale(request: NextRequest, pathname: string) {
  const langParam = request.nextUrl.searchParams.get("lang");
  if (langParam === "en" || langParam === "ru") {
    const url = request.nextUrl.clone();
    url.searchParams.delete("lang");
    url.pathname = langParam === "ru" ? "/ru" : "/";
    const response = NextResponse.redirect(url, 307);
    setLocaleCookie(response, langParam);
    return response;
  }

  if (pathname === "/ru" || pathname === "/ru/") {
    const response = NextResponse.next();
    setLocaleCookie(response, "ru");
    return response;
  }

  const preferredLocale = resolvePreferredLocale(request);

  if (preferredLocale === "ru") {
    return redirectWithLocale(request, "/ru", "ru");
  }

  const response = NextResponse.next();
  setLocaleCookie(response, defaultLocale);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Legacy locale-prefixed home URLs → new index routes
  if (
    pathname === `/en/${legacyHomeSlugs.en}` ||
    pathname === `/en/${legacyHomeSlugs.en}/`
  ) {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  if (
    pathname === `/ru/${legacyHomeSlugs.ru}` ||
    pathname === `/ru/${legacyHomeSlugs.ru}/`
  ) {
    return NextResponse.redirect(new URL("/ru", request.url), 308);
  }

  // Bare /en → English home at /
  if (pathname === "/en" || pathname === "/en/") {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  if (pathname === "/" || pathname === "" || pathname === "/ru" || pathname === "/ru/") {
    return handleHomeLocale(request, pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
