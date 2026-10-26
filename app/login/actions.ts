"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  HUB_COOKIE,
  isAllowedEmail,
  passwordMatches,
  safeNextPath,
  signHubSession,
} from "@/lib/hub-auth";
import { hubCookieOptions } from "@/lib/hub-session";

export async function signInHub(_prev: { error: string } | null, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(String(formData.get("next") ?? "/"));

  if (!isAllowedEmail(email) || !passwordMatches(password)) {
    return { error: "Email or password is not recognized." };
  }

  const token = await signHubSession(email);
  const jar = await cookies();
  jar.set(HUB_COOKIE, token, hubCookieOptions());
  redirect(next);
}
