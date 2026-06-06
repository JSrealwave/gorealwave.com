import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "SLED One-Pager",
};

export default async function SledPage() {
  // Use Clerk's auth() helper in this server component (guaranteed by middleware)
  const { userId } = await auth();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-card-border pb-6">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-teal-dark dark:text-teal">
          SLED
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem] dark:text-slate-50">
          SLED One-Pager
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          One-pager and key talking points for SLED opportunities.
        </p>
      </div>

      <div className="rounded-lg border border-card-border bg-card p-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 dark:bg-teal/10">
          <span className="text-xl">📄</span>
        </div>
        <h2 className="text-lg font-semibold text-navy dark:text-slate-100">
          SLED one-pager coming soon
        </h2>
        <p className="mt-2 text-sm text-muted">
          The full SLED one-pager content and embedded viewer will be added here.
        </p>
        <p className="mt-1 text-xs text-muted/70">
          (Placeholder route — protected by Clerk authentication)
        </p>
      </div>
    </div>
  );
}
