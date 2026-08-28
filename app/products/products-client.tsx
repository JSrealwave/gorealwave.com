"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, Copy, FileText, Search } from "lucide-react";
import { getProductDatasheets } from "@/lib/product-datasheets";
import type { RealwaveProduct } from "@/types/products";
import {
  formatQuoteText,
  formatUsd,
  getProductByPartNumber,
  PRODUCT_CATEGORIES,
  products,
  type ProductCategoryFilter,
} from "@/lib/products";
import { getProductThumbnail } from "@/lib/product-images";
import { ProductThumbnail } from "@/components/product-thumbnail";
import { ProductModal } from "@/components/product-modal";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<RealwaveProduct[]>([]);
  const [showQuote, setShowQuote] = useState(false);
  const [copied, setCopied] = useState(false);

  const categoryParam = searchParams.get("category");
  const skuParam = searchParams.get("sku");
  const activeCategory: ProductCategoryFilter =
    categoryParam &&
    PRODUCT_CATEGORIES.includes(categoryParam as ProductCategoryFilter)
      ? (categoryParam as ProductCategoryFilter)
      : "All";

  const selectedProduct = skuParam
    ? (getProductByPartNumber(skuParam) ?? null)
    : null;

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

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.partNumber.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const toggleSelect = (product: RealwaveProduct) => {
    setSelectedItems((prev) =>
      prev.some((item) => item.partNumber === product.partNumber)
        ? prev.filter((item) => item.partNumber !== product.partNumber)
        : [...prev, product]
    );
  };

  const copyQuoteToClipboard = async () => {
    if (selectedItems.length === 0) return;

    try {
      await navigator.clipboard.writeText(formatQuoteText(selectedItems));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const quoteTotal = selectedItems.reduce(
    (sum, item) => sum + item.eplusPrice,
    0
  );

  return (
    <div className={cn("space-y-6", selectedItems.length > 0 && "pb-32")}>
      <div className="rounded-xl border border-card-border bg-card p-6 shadow-sm lg:p-7">
        <div className="space-y-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search by part number, name, or description..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-col gap-2 border-t border-card-border pt-4 sm:flex-row sm:items-center">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted sm:w-20">
              Line
            </span>
            <div className="flex flex-wrap gap-2">
              {PRODUCT_CATEGORIES.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => updateParams({ category })}
                  >
                    <Badge
                      variant={active ? "navy" : "outline"}
                      className={cn(
                        "cursor-pointer normal-case tracking-normal transition-colors hover:border-navy/30",
                        active &&
                          "border-navy bg-navy text-white dark:border-navy-light dark:bg-navy-light dark:text-white"
                      )}
                    >
                      {category === "All" ? "All lines" : category}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          Showing{" "}
          <span className="font-bold text-navy dark:text-slate-100">
            {filteredProducts.length}
          </span>{" "}
          {filteredProducts.length === 1 ? "SKU" : "SKUs"}
        </p>
        {(searchTerm || activeCategory !== "All") && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              updateParams({ category: null });
            }}
            className="text-xs font-semibold uppercase tracking-wide text-navy hover:text-navy-light dark:text-teal dark:hover:text-teal-dark"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => {
            const isSelected = selectedItems.some(
              (item) => item.partNumber === product.partNumber
            );
            const thumbnailUrl = getProductThumbnail(product.partNumber);
            const datasheets = getProductDatasheets(product);

            return (
              <article
                key={product.partNumber}
                className="group flex flex-col rounded-xl border border-card-border bg-card p-6 shadow-sm transition-colors hover:border-navy/25 hover:shadow-md dark:hover:border-teal/25"
              >
                <div className="mb-4 flex gap-4">
                  <ProductThumbnail
                    src={thumbnailUrl}
                    alt={product.name}
                    className="self-start"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] tracking-[0.16em] text-navy dark:text-teal">
                      {product.partNumber}
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-snug text-navy dark:text-slate-100">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge variant="type">{product.category}</Badge>
                      <Badge>{product.subCategory}</Badge>
                    </div>
                  </div>
                </div>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                  {product.shortDescription}
                </p>

                <div className="mb-4 flex items-end justify-between gap-3 border-t border-card-border pt-4">
                  <div>
                    <p className="text-lg font-bold text-navy dark:text-teal">
                      {formatUsd(product.eplusPrice)}
                    </p>
                    <p className="text-xs text-muted">/ {product.unit}</p>
                  </div>
                  {product.msrp > 0 ? (
                    <p className="text-xs text-muted line-through">
                      {formatUsd(product.msrp)} MSRP
                    </p>
                  ) : null}
                </div>

                {product.notes ? (
                  <p className="mb-4 line-clamp-2 text-xs italic text-muted">
                    {product.notes}
                  </p>
                ) : null}

                <div className="mt-auto flex gap-2">
                  <Button
                    variant={isSelected ? "accent" : "default"}
                    size="sm"
                    className="min-w-0 flex-1"
                    onClick={() => toggleSelect(product)}
                  >
                    {isSelected ? "Added to quote" : "Add to quote"}
                  </Button>
                  {datasheets[0] ? (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="shrink-0 px-3"
                      title={datasheets[0].title}
                    >
                      <a
                        href={datasheets[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={datasheets[0].title}
                      >
                        <FileText className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : null}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateParams({ sku: product.partNumber })}
                  >
                    Details
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-card-border bg-card px-6 py-14 text-center">
          <p className="text-sm font-bold text-navy dark:text-slate-100">
            No products match
          </p>
          <p className="mt-1 text-sm text-muted">
            Try a different search or product line.
          </p>
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-card-border bg-card/95 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 xl:px-12">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="text-sm font-semibold text-navy dark:text-slate-100">
                {selectedItems.length}{" "}
                {selectedItems.length === 1 ? "item" : "items"} ·{" "}
                {formatUsd(quoteTotal)} ePlus
              </p>
              <button
                type="button"
                onClick={() => setShowQuote((open) => !open)}
                className="text-xs font-semibold uppercase tracking-wide text-navy hover:text-navy-light dark:text-teal dark:hover:text-teal-dark"
              >
                {showQuote ? "Hide preview" : "Show preview"}
              </button>
            </div>

            <div className="flex gap-2">
              <Button variant="accent" size="sm" onClick={copyQuoteToClipboard}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy quote
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedItems([]);
                  setShowQuote(false);
                }}
              >
                Clear
              </Button>
            </div>
          </div>

          {showQuote ? (
            <div className="mx-auto w-full max-w-[1400px] border-t border-card-border px-5 py-4 font-mono text-xs leading-relaxed text-muted sm:px-8 lg:px-10 xl:px-12">
              <pre className="whitespace-pre-wrap">
                {formatQuoteText(selectedItems)}
              </pre>
            </div>
          ) : null}
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => updateParams({ sku: null })}
        onAddToQuote={toggleSelect}
        isSelected={
          selectedProduct
            ? selectedItems.some(
                (item) => item.partNumber === selectedProduct.partNumber
              )
            : false
        }
      />
    </div>
  );
}
