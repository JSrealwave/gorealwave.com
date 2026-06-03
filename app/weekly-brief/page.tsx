import type { Metadata } from "next";
import { WeeklyBriefSection } from "@/components/weekly-brief/weekly-brief-section";

export const metadata: Metadata = {
  title: "Weekly Brief",
};

export default function WeeklyBriefPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-card-border pb-6">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-teal-dark dark:text-teal">
          Seller Communications
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem] dark:text-slate-50">
          Weekly Brief
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Generate a seller-ready summary of this week&apos;s Realwave
          highlights. Phase 1 is a mock workflow — email delivery connects in
          Phase 2.
        </p>
      </div>

      <WeeklyBriefSection />

      <section className="mt-6 rounded-lg border border-card-border bg-card p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-slate-200">
          What&apos;s included in the brief
        </h2>
        <ul className="mt-4 space-y-2">
          {[
            "This week's highlighted asset and key message",
            "Newly added or updated enablement materials",
            "Priority vertical talking points (SLED, Retail, Healthcare, etc.)",
            "Suggested follow-up actions for your pipeline",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
