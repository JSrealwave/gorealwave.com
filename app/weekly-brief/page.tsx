import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { sectionTitleClass } from "@/lib/layout";
import { WeeklyBriefSection } from "@/components/weekly-brief/weekly-brief-section";

export const metadata: Metadata = {
  title: "Weekly Brief | Realwave Enablement Hub",
};

export default async function WeeklyBriefPage() {
  await auth();
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Seller Communications"
        title="Weekly Brief"
        lead="A copy-ready summary of this week's highlight, featured assets, and next steps. Paste it into email or Slack — automated delivery comes later."
      />

      <WeeklyBriefSection />

      <section className="mt-8 rounded-xl border border-card-border bg-card p-8 shadow-sm">
        <h2 className={sectionTitleClass}>What&apos;s included in the brief</h2>
        <ul className="mt-5 space-y-3">
          {[
            "This week's highlighted asset and key message",
            "Featured one-pagers, decks, and market briefs from the library",
            "Talking points you can use on customer calls",
            "Suggested follow-ups: catalog quotes, PDF downloads, and shares",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-base text-muted">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </PageContainer>
  );
}
