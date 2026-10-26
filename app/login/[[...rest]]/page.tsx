import { ThemeToggle } from "@/components/theme-toggle";
import { safeNextPath } from "@/lib/hub-auth";
import { LoginForm } from "../login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next = safeNextPath(params.next);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a
            href="https://gorealwave.com"
            className="mx-auto mb-5 inline-flex"
            aria-label="Realwave home"
          >
            <img
              src="/assets/logo-wordmark.png"
              alt="Realwave"
              className="h-9 w-auto dark:invert"
            />
          </a>
          <p className="mt-1 text-sm text-muted">Enablement Hub</p>
          <p className="mt-4 text-sm text-muted">
            Sign in to access internal seller tools and assets.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card p-6 shadow-sm sm:p-8">
          <LoginForm next={next} />
        </div>
      </div>
    </div>
  );
}
