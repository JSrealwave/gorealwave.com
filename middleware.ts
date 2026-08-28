import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/login(.*)',
  '/public(.*)',
  '/datasheets(.*)',
  // PDF route enforces per-slug auth inside the handler (public slugs vs signed-in).
  '/api/pdf(.*)',
]);

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, redirectToSignIn } = await auth();

    // If the user is already signed in and hits /login (or any subpath like /login/verify),
    // send them to the app home. This must be explicit because we marked /login public.
    if (userId && req.nextUrl.pathname.startsWith('/login')) {
      const home = new URL('/', req.url);
      return NextResponse.redirect(home);
    }

    if (!isPublicRoute(req)) {
      // Unauthenticated user on a protected route → redirect to our local /login.
      // The signInUrl passed in the options below makes redirectToSignIn() target /login
      // (instead of the default hosted Clerk sign-in on accounts.dev).
      if (!userId) {
        return redirectToSignIn({ returnBackUrl: req.url });
      }
    }
  },
  {
    // This option is essential for path-based / custom sign-in pages.
    // It configures both the middleware redirect target and makes the value
    // available to server-side helpers like auth() / redirectToSignIn().
    signInUrl: '/login',
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|pdf|mp4)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk's internal frontend API / handshake routes
    '/__clerk/(.*)',
  ],
};
