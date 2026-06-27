import { NextRequest, NextResponse } from "next/server";
import { legacyHomeSlugs } from "@/lib/i18n/routes";

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
