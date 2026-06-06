import type { Metadata } from "next";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { LibraryClient } from "./library-client";

export const metadata: Metadata = {
  title: "Content Library",
};

export default async function LibraryPage() {
  await auth(); // ensure protected (redundant with middleware but uses the helper)
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-card-border pb-6">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-teal-dark dark:text-teal">
          Enablement Assets
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem] dark:text-slate-50">
          Content Library
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Search and filter enablement assets by type and vertical. Click any
          card to preview key messaging and talking points.
        </p>
      </div>

      <Suspense fallback={<LibrarySkeleton />}>
        <LibraryClient />
      </Suspense>
    </div>
  );
}

function LibrarySkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-56 animate-pulse rounded-lg border border-card-border bg-card"
        />
      ))}
    </div>
  );
}
