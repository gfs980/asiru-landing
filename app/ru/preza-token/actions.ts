"use server";

import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  PREZA_TOKEN_PASSWORD,
  PREZA_TOKEN_COOKIE,
  createPrezaTokenCookieValue,
  getPrezaTokenCookieOptions,
} from "@/lib/preza-token/auth";

export async function authenticatePrezaToken(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string" || password !== PREZA_TOKEN_PASSWORD) {
    notFound();
  }

  const cookieStore = await cookies();
  cookieStore.set(
    PREZA_TOKEN_COOKIE,
    createPrezaTokenCookieValue(),
    getPrezaTokenCookieOptions(),
  );

  redirect("/ru/preza-token");
}
