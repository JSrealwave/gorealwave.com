import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import {
  contentItems,
  getHighlightItem,
  CONTENT_CATEGORIES,
} from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  // Use Clerk auth() helper (middleware ensures this page is only reached when authenticated)
  const { userId } = await auth();

  const highlight = getHighlightItem();
  const otherItems = contentItems.filter((item) => item.id !== highlight.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-12">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-teal-dark dark:text-teal">
          Seller Portal
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-[1.75rem] dark:text-slate-50">
          Realwave Enablement Hub
        </h1>
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
          Curated one-pagers, ROI tools, talking points, and case studies for
          ePlus sellers — updated weekly.
        </p>
      </section>

      <section className="mb-12">
        <div className="overflow-hidden rounded-lg border border-navy/20 bg-navy shadow-sm dark:border-navy-light/30">
          <div className="border-b border-white/10 bg-navy px-6 py-3 sm:px-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal">
              <Sparkles className="h-3.5 w-3.5" />
              This Week&apos;s Highlight
            </div>
          </div>
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <Badge className="border-white/15 bg-white/10 text-teal normal-case tracking-normal">
                {highlight.category[0]}
              </Badge>
              <h2 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                {highlight.title}
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/75">
                {highlight.keyMessage}
              </p>
            </div>
            <Button asChild variant="accent" size="lg" className="shrink-0">
              <Link href={`/library?asset=${highlight.id}`}>
                View Highlight
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-12 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={BookOpen}
          label="Total Assets"
          value={String(contentItems.length)}
          detail="One-pagers, guides, tools & more"
        />
        <StatCard
          icon={TrendingUp}
          label="Categories"
          value={String(CONTENT_CATEGORIES.length)}
          detail="Vertical & market coverage"
        />
        <StatCard
          icon={Sparkles}
          label="Featured"
          value="Spatial Intelligence"
          detail="This week's highlight"
        />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between border-b border-card-border pb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy dark:text-slate-200">
            Enablement Library
          </h2>
          <Link
            href="/library"
            className="text-xs font-semibold uppercase tracking-wide text-navy hover:text-navy-light dark:text-teal dark:hover:text-teal-dark"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {otherItems.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href={`/library?asset=${item.id}`}
              className="group rounded-lg border border-card-border bg-card px-5 py-4 shadow-sm transition-colors hover:border-navy/25 hover:shadow-md dark:hover:border-teal/30"
            >
              <div className="mb-2.5">
                <Badge variant="type">{item.type}</Badge>
              </div>
              <h3 className="text-sm font-bold leading-snug text-navy group-hover:text-navy-light dark:text-slate-100 dark:group-hover:text-teal">
                {item.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-card-border bg-card px-5 py-4 shadow-sm">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-navy/5 dark:bg-teal/10">
        <Icon className="h-4 w-4 text-navy dark:text-teal" />
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold text-navy dark:text-slate-50">{value}</p>
      <p className="mt-0.5 text-xs text-muted">{detail}</p>
    </div>
  );
}
