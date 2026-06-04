import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';

  // If user is authenticated and trying to access login page, redirect to home
  if (authCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is NOT authenticated and not on login page, redirect to login
  if (!authCookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes that should stay public (we'll handle /api/login separately)
     * - static files
     */
    '/((?!api/login|_next/static|_next/image|favicon.ico).*)',
  ],
};
