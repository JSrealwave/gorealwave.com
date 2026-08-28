"use client";

import { FileText } from "lucide-react";
import type { RealwaveProduct } from "@/types/products";
import { formatUsd } from "@/lib/products";
import { getProductThumbnail } from "@/lib/product-images";
import { getProductDatasheets } from "@/lib/product-datasheets";
import { ProductThumbnail } from "@/components/product-thumbnail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductModalProps {
  product: RealwaveProduct | null;
  onClose: () => void;
  onAddToQuote?: (product: RealwaveProduct) => void;
  isSelected?: boolean;
}

export function ProductModal({
  product,
  onClose,
  onAddToQuote,
  isSelected = false,
}: ProductModalProps) {
  const thumbnailUrl = product
    ? getProductThumbnail(product.partNumber)
    : undefined;
  const datasheets = product ? getProductDatasheets(product) : [];

  return (
    <Dialog
      open={product !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {product ? (
        <DialogContent>
          <DialogHeader>
            <div className="flex gap-4 pr-8">
              <ProductThumbnail
                src={thumbnailUrl}
                alt={product.name}
                size="modal"
                className="self-start"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="type">{product.category}</Badge>
                  <Badge>{product.subCategory}</Badge>
                </div>
                <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-navy dark:text-teal">
                  {product.partNumber}
                </p>
                <DialogTitle className="pt-1">{product.name}</DialogTitle>
                <DialogDescription>{product.shortDescription}</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-foreground/90 dark:text-slate-200">
              {product.fullDescription}
            </p>

            {product.notes ? (
              <p className="rounded-md border border-card-border bg-background px-4 py-3 text-sm text-muted dark:bg-slate-800/40">
                {product.notes}
              </p>
            ) : null}

            {datasheets.length > 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Datasheet
                </p>
                <div className="flex flex-wrap gap-2">
                  {datasheets.map((sheet) => (
                    <Button key={sheet.url} asChild variant="outline" size="sm">
                      <a
                        href={sheet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        {sheet.title}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-4 border-t border-card-border pt-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  ePlus price
                </p>
                <p className="text-2xl font-bold text-navy dark:text-teal">
                  {formatUsd(product.eplusPrice)}{" "}
                  <span className="text-sm font-normal text-muted">
                    / {product.unit}
                  </span>
                </p>
                {product.msrp > 0 ? (
                  <p className="text-xs text-muted line-through">
                    {formatUsd(product.msrp)} MSRP
                  </p>
                ) : null}
              </div>

              <div className="flex gap-2">
                {onAddToQuote ? (
                  <Button
                    variant={isSelected ? "outline" : "accent"}
                    onClick={() => onAddToQuote(product)}
                  >
                    {isSelected ? "Added to quote" : "Add to quote"}
                  </Button>
                ) : null}
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
