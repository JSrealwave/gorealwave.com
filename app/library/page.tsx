import type { Metadata } from "next";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { LibraryClient } from "./library-client";

export const metadata: Metadata = {
  title: "Content Library | Realwave Enablement Hub",
};

export default async function LibraryPage() {
  await auth();
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Enablement Assets"
        title="Content Library"
        lead="Shareable one-pagers, decks, and market briefs for customer conversations. Open any card for talking points, public links, and PDF download."
      />

      <Suspense fallback={<LibrarySkeleton />}>
        <LibraryClient />
      </Suspense>
    </PageContainer>
  );
}

function LibrarySkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-60 animate-pulse rounded-xl border border-card-border bg-card"
        />
      ))}
    </div>
  );
}
