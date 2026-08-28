import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "SLED One-Pager",
};

export default async function SledPage() {
  await auth();

  return (
    <PageContainer>
      <PageHeader
        eyebrow="SLED"
        title="SLED One-Pager"
        lead="One-pager and key talking points for SLED opportunities."
      />

      <div className="rounded-xl border border-card-border bg-card p-12 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-navy/5 dark:bg-teal/10">
          <span className="text-2xl">📄</span>
        </div>
        <h2 className="text-xl font-semibold text-navy dark:text-slate-100">
          SLED one-pager coming soon
        </h2>
        <p className="mt-3 text-base text-muted">
          The full SLED one-pager content and embedded viewer will be added here.
        </p>
        <p className="mt-2 text-sm text-muted/70">
          (Placeholder route — protected by Clerk authentication)
        </p>
      </div>
    </PageContainer>
  );
}
