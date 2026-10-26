import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HUB_COOKIE, HUB_SESSION_SECONDS, readHubSession } from "@/lib/hub-auth";

export async function getHubUser() {
  const jar = await cookies();
  return readHubSession(jar.get(HUB_COOKIE)?.value);
}

export async function requireHubUser() {
  const email = await getHubUser();
  if (!email) redirect("/login");
  return email;
}

export function hubCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: HUB_SESSION_SECONDS,
  };
}
