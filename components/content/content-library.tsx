"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Package, Search } from "lucide-react";
import {
  contentItems,
  getItemById,
  getUsedCategories,
  getUsedContentTypes,
  type ContentItem,
} from "@/lib/content";
import { products } from "@/lib/products";
import { getDeckSlides } from "@/lib/decks/registry";
import { ContentCard } from "@/components/content/content-card";
import { ContentModal } from "@/components/content/content-modal";
import { DeckModal } from "@/components/decks/DeckModal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContentLibrary() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [deckItemId, setDeckItemId] = useState<string | null>(null);

  const types = getUsedContentTypes();
  const categories = getUsedCategories();

  const typeParam = searchParams.get("type");
  const categoryParam = searchParams.get("category");
  const assetParam = searchParams.get("asset");

  const selectedType: ContentItem["type"] | "All" = types.includes(
    typeParam as ContentItem["type"]
  )
    ? (typeParam as ContentItem["type"])
    : "All";

  const selectedCategory = categories.includes(categoryParam ?? "")
    ? (categoryParam as string)
    : "All";

  function updateParams(patch: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (!value || value === "All") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return contentItems.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.some((cat) => cat.toLowerCase().includes(query));

      const matchesType = selectedType === "All" || item.type === selectedType;

      const matchesCategory =
        selectedCategory === "All" ||
        item.category.includes(selectedCategory);

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [search, selectedType, selectedCategory]);

  const selectedItem = assetParam ? getItemById(assetParam) ?? null : null;
  const deckItem = deckItemId ? getItemById(deckItemId) : null;
  const deckSlides = deckItem ? getDeckSlides(deckItem) : undefined;

  return (
    <div className="space-y-6">
      <Link
        href="/products"
        className="flex flex-col gap-4 rounded-xl border border-card-border bg-card p-5 shadow-sm transition-colors hover:border-navy/25 hover:shadow-md dark:hover:border-teal/25 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/5 dark:bg-teal/10">
            <Package className="h-5 w-5 text-navy dark:text-teal" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Product catalog
            </p>
            <p className="mt-0.5 font-bold text-navy dark:text-slate-100">
              {products.length} SKUs with ePlus pricing
            </p>
            <p className="mt-1 text-sm text-muted">
              Hardware, analytics, and RealVue subscriptions live on the catalog
              page — not mixed into this library.
            </p>
          </div>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <span>
            Open catalog
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Button>
      </Link>

      <div className="rounded-xl border border-card-border bg-card p-6 shadow-sm lg:p-7">
        <div className="space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search by title, description, or category..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3 border-t border-card-border pt-4">
            <FilterRow label="Type">
              <FilterChip
                active={selectedType === "All"}
                onClick={() => updateParams({ type: null })}
              >
                All Types
              </FilterChip>
              {types.map((type) => (
                <FilterChip
                  key={type}
                  active={selectedType === type}
                  onClick={() => updateParams({ type })}
                >
                  {type}
                </FilterChip>
              ))}
            </FilterRow>

            <FilterRow label="Category">
              <FilterChip
                active={selectedCategory === "All"}
                onClick={() => updateParams({ category: null })}
              >
                All Categories
              </FilterChip>
              {categories.map((category) => (
                <FilterChip
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => updateParams({ category })}
                >
                  {category}
                </FilterChip>
              ))}
            </FilterRow>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          Showing{" "}
          <span className="font-bold text-navy dark:text-slate-100">
            {filteredItems.length}
          </span>{" "}
          {filteredItems.length === 1 ? "asset" : "assets"}
        </p>
        {(search || selectedType !== "All" || selectedCategory !== "All") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              updateParams({ type: null, category: null });
            }}
            className="text-xs font-semibold uppercase tracking-wide text-navy hover:text-navy-light dark:text-teal dark:hover:text-teal-dark"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredItems.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onViewDetails={() => updateParams({ asset: item.id })}
              onReviewDeck={
                getDeckSlides(item) ? () => setDeckItemId(item.id) : undefined
              }
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-card-border bg-card px-6 py-14 text-center">
          <p className="text-sm font-bold text-navy dark:text-slate-100">
            No assets found
          </p>
          <p className="mt-1 text-sm text-muted">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      <ContentModal
        item={selectedItem}
        open={selectedItem !== null}
        onOpenChange={(open) => {
          if (!open) updateParams({ asset: null });
        }}
        onReviewDeck={
          selectedItem && getDeckSlides(selectedItem)
            ? () => setDeckItemId(selectedItem.id)
            : undefined
        }
      />

      {deckSlides ? (
        <DeckModal
          open={deckItemId !== null}
          onOpenChange={(open) => {
            if (!open) setDeckItemId(null);
          }}
          slides={deckSlides}
          deckTitle={deckItem?.title ?? "Deck"}
          syncUrl
        />
      ) : null}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted sm:w-20">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick}>
      <Badge
        variant={active ? "navy" : "outline"}
        className={cn(
          "cursor-pointer normal-case tracking-normal transition-colors hover:border-navy/30",
          active &&
            "border-navy bg-navy text-white dark:border-navy-light dark:bg-navy-light dark:text-white"
        )}
      >
        {children}
      </Badge>
    </button>
  );
}
