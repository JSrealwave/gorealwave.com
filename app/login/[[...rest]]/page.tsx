import { SignIn } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
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
          <SignIn
            routing="path"
            path="/login"
            appearance={{
              elements: {
                card: "bg-transparent shadow-none p-0 border-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                dividerLine: "bg-card-border",
                dividerText: "text-muted text-sm",
                socialButtonsBlockButton:
                  "border border-card-border bg-background hover:bg-background/80 text-foreground text-sm py-2.5",
                socialButtonsProviderIcon: "opacity-90",
                formButtonPrimary:
                  "bg-navy hover:bg-navy-light text-white font-semibold text-sm py-2.5 dark:bg-teal dark:text-slate-950 dark:hover:bg-teal-dark",
                formFieldInput:
                  "bg-background border border-card-border text-foreground placeholder:text-muted text-sm py-2.5",
                formFieldLabel: "text-sm text-muted",
                footerActionText: "text-muted text-sm",
                footerActionLink:
                  "text-teal-dark hover:text-teal font-medium dark:text-teal",
                footer: "hidden",
              },
              variables: {
                colorPrimary: "#00d4a6",
                colorText: "var(--foreground)",
                colorTextSecondary: "var(--muted)",
                colorBackground: "var(--card)",
                colorInputBackground: "var(--background)",
                colorInputText: "var(--foreground)",
                borderRadius: "0.5rem",
              },
            }}
          />
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <a
            href="/login/sign-up"
            className="font-medium text-teal-dark hover:text-teal dark:text-teal dark:hover:text-teal-dark"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
