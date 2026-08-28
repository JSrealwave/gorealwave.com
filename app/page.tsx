import Link from "next/link";
import { ArrowRight, BookOpen, Mail, Package, Sparkles } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { contentItems, getHighlightItem } from "@/lib/content";
import { products } from "@/lib/products";
import {
  isProductThumbnailItem,
} from "@/lib/product-images";
import { ProductThumbnail } from "@/components/product-thumbnail";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { sectionTitleClass } from "@/lib/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  await auth();

  const highlight = getHighlightItem();
  const otherItems = contentItems.filter((item) => item.id !== highlight.id);
  // Prefer shareable one-pagers, then items with thumbnails, then the rest.
  const libraryPreview = [
    ...otherItems.filter((item) => Boolean(item.publicUrl)),
    ...otherItems.filter((item) => !item.publicUrl && item.thumbnailUrl),
    ...otherItems.filter((item) => !item.publicUrl && !item.thumbnailUrl),
  ].slice(0, 4);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Seller Portal"
        title="Realwave Enablement Hub"
        lead="One-pagers, decks, market briefs, and ePlus product pricing for Realwave sellers — updated weekly."
      />

      <section className="mb-14">
        <div className="overflow-hidden rounded-xl border border-navy/20 bg-navy shadow-sm dark:border-navy-light/30">
          <div className="border-b border-white/10 bg-navy px-6 py-4 sm:px-10">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-teal">
              <Sparkles className="h-4 w-4" />
              This Week&apos;s Highlight
            </div>
          </div>
          <div className="space-y-5 p-6 sm:p-10">
            {highlight.thumbnailUrl ? (
              <div className="h-40 max-w-2xl overflow-hidden rounded-lg border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element -- static public cover */}
                <img
                  src={highlight.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
            <Badge className="border-white/15 bg-white/10 text-teal normal-case tracking-normal">
              {highlight.type}
            </Badge>
            <h2 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
              {highlight.title}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-white/75 lg:max-w-3xl">
              {highlight.keyMessage}
            </p>
            <Button asChild variant="accent" size="lg">
              <Link
                href={
                  highlight.publicUrl ?? `/library?asset=${highlight.id}`
                }
              >
                View Highlight
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <HubLink
          href="/library"
          icon={BookOpen}
          label="Content Library"
          value={`${contentItems.length} assets`}
          detail="One-pagers, decks, and market briefs"
        />
        <HubLink
          href="/products"
          icon={Package}
          label="Product Catalog"
          value={`${products.length} SKUs`}
          detail="ePlus pricing and quote builder"
        />
        <HubLink
          href="/weekly-brief"
          icon={Mail}
          label="Weekly Brief"
          value="Copy-ready"
          detail="This week's talking points"
        />
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between border-b border-card-border pb-4">
          <h2 className={sectionTitleClass}>Enablement Library</h2>
          <Link
            href="/library"
            className="text-sm font-semibold uppercase tracking-wide text-navy hover:text-navy-light dark:text-teal dark:hover:text-teal-dark"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {libraryPreview.map((item) => {
            const isProduct = isProductThumbnailItem(item);

            return (
            <Link
              key={item.id}
              href={`/library?asset=${item.id}`}
              className="group rounded-xl border border-card-border bg-card px-6 py-5 shadow-sm transition-colors hover:border-navy/25 hover:shadow-md dark:hover:border-teal/30"
            >
              {isProduct ? (
                <div className="flex gap-3">
                  <ProductThumbnail
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="self-start"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-2">
                      <Badge variant="type">{item.type}</Badge>
                    </div>
                    <h3 className="text-base font-bold leading-snug text-navy group-hover:text-navy-light dark:text-slate-100 dark:group-hover:text-teal">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {item.thumbnailUrl ? (
                    <div className="mb-3 h-24 overflow-hidden rounded-lg border border-card-border">
                      {/* eslint-disable-next-line @next/next/no-img-element -- static public cover */}
                      <img
                        src={item.thumbnailUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="mb-3">
                    <Badge variant="type">{item.type}</Badge>
                  </div>
                  <h3 className="text-base font-bold leading-snug text-navy group-hover:text-navy-light dark:text-slate-100 dark:group-hover:text-teal">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </>
              )}
            </Link>
            );
          })}
        </div>
      </section>
    </PageContainer>
  );
}

function HubLink({
  href,
  icon: Icon,
  label,
  value,
  detail,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-card-border bg-card px-6 py-5 shadow-sm transition-colors hover:border-navy/25 hover:shadow-md dark:hover:border-teal/30"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 dark:bg-teal/10">
        <Icon className="h-5 w-5 text-navy dark:text-teal" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-bold text-navy dark:text-slate-50">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted">{detail}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-navy group-hover:text-navy-light dark:text-teal">
        Open →
      </p>
    </Link>
  );
}
