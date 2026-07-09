import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const PREZA_TOKEN_PASSWORD = "asiru-qwerty";
export const PREZA_TOKEN_COOKIE = "preza-token-auth";
const PREZA_TOKEN_COOKIE_VALUE = "granted";

export const PREZA_TOKEN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function isPrezaTokenAuthed(
  cookieStore: Pick<RequestCookies, "get">,
): boolean {
  return cookieStore.get(PREZA_TOKEN_COOKIE)?.value === PREZA_TOKEN_COOKIE_VALUE;
}

export function getPrezaTokenCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/ru/preza-token",
    maxAge: PREZA_TOKEN_COOKIE_MAX_AGE,
  };
}

export function createPrezaTokenCookieValue() {
  return PREZA_TOKEN_COOKIE_VALUE;
}
