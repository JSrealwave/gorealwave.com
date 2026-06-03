"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  contentItems,
  CONTENT_CATEGORIES,
  CONTENT_TYPES,
  type ContentItem,
} from "@/lib/content";
import { ContentCard } from "@/components/content/content-card";
import { ContentModal } from "@/components/content/content-modal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ContentLibrary() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<
    ContentItem["type"] | "All"
  >("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

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

  const selectedItem =
    contentItems.find((item) => item.id === selectedItemId) ?? null;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-card-border bg-card p-5 shadow-sm">
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
                onClick={() => setSelectedType("All")}
              >
                All Types
              </FilterChip>
              {CONTENT_TYPES.map((type) => (
                <FilterChip
                  key={type}
                  active={selectedType === type}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </FilterChip>
              ))}
            </FilterRow>

            <FilterRow label="Category">
              <FilterChip
                active={selectedCategory === "All"}
                onClick={() => setSelectedCategory("All")}
              >
                All Categories
              </FilterChip>
              {CONTENT_CATEGORIES.map((category) => (
                <FilterChip
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
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
              setSelectedType("All");
              setSelectedCategory("All");
            }}
            className="text-xs font-semibold uppercase tracking-wide text-navy hover:text-navy-light dark:text-teal dark:hover:text-teal-dark"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onViewDetails={() => setSelectedItemId(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-card-border bg-card px-6 py-14 text-center">
          <p className="text-sm font-bold text-navy dark:text-slate-100">No assets found</p>
          <p className="mt-1 text-sm text-muted">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      <ContentModal
        item={selectedItem}
        open={selectedItem !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedItemId(null);
        }}
      />
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
