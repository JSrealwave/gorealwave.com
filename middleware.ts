import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { HUB_COOKIE, readHubSession, safeNextPath } from "@/lib/hub-auth";

function isPublicPath(pathname: string) {
  return (
    pathname.startsWith("/login") ||
    pathname.startsWith("/public") ||
    pathname.startsWith("/datasheets") ||
    pathname.startsWith("/api/pdf")
  );
}

export async function middleware(req: NextRequest) {
  const email = await readHubSession(req.cookies.get(HUB_COOKIE)?.value);
  const { pathname, search } = req.nextUrl;

  if (email && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!email && !isPublicPath(pathname)) {
    const login = new URL("/login", req.url);
    const next = safeNextPath(`${pathname}${search}`);
    if (next !== "/") login.searchParams.set("next", next);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|pdf|mp4)).*)",
    "/(api|trpc)(.*)",
  ],
};
