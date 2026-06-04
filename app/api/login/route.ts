import { NextRequest, NextResponse } from "next/server";

const CORRECT_PASSWORD =
  process.env.SITE_PASSWORD || "your-secure-password-here";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password === CORRECT_PASSWORD) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
