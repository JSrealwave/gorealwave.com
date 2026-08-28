"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, FileDown, FileText, Play } from "lucide-react";
import type { ContentItem } from "@/lib/content";
import {
  getFileActionLabel,
  getItemFileUrl,
  getItemPdfSlug,
  getPublicPdfPreviewUrl,
  isDeckItem,
  isFileAsset,
  isFullPageItem,
} from "@/lib/content";
import {
  isProductThumbnailItem,
} from "@/lib/product-images";
import { ProductThumbnail } from "@/components/product-thumbnail";
import { getPdfDownloadUrl } from "@/lib/pdf/one-pager-registry";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ContentModalProps {
  item: ContentItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Opens the interactive deck viewer (Deck items). */
  onReviewDeck?: () => void;
}

export function ContentModal({
  item,
  open,
  onOpenChange,
  onReviewDeck,
}: ContentModalProps) {
  const [copiedLibrary, setCopiedLibrary] = useState(false);
  const [copiedPublic, setCopiedPublic] = useState(false);

  if (!item) return null;

  const isDeck = isDeckItem(item);
  const isRealOnePager = isFullPageItem(item) && !isDeck;
  const isShareable = isFullPageItem(item);
  const pdfSlug = getItemPdfSlug(item);
  const pdfPreviewUrl = getPublicPdfPreviewUrl(item);
  const fileUrl = getItemFileUrl(item);
  const fileLabel = getFileActionLabel(item);
  const isProduct = isProductThumbnailItem(item);
  const isVideo = item.type === "Video";
  const isDrawing = item.type === "Drawing";

  const libraryShareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/library?asset=${item.id}`
      : `/library?asset=${item.id}`;

  const publicShareUrl =
    item.publicUrl && typeof window !== "undefined"
      ? `${window.location.origin}${item.publicUrl}`
      : item.publicUrl ?? "";

  async function handleCopyLibraryLink() {
    try {
      await navigator.clipboard.writeText(libraryShareUrl);
      setCopiedLibrary(true);
      window.setTimeout(() => setCopiedLibrary(false), 2000);
    } catch {
      setCopiedLibrary(false);
    }
  }

  async function handleCopyPublicLink() {
    if (!publicShareUrl) return;

    try {
      await navigator.clipboard.writeText(publicShareUrl);
      setCopiedPublic(true);
      window.setTimeout(() => setCopiedPublic(false), 2000);
    } catch {
      setCopiedPublic(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          {item.thumbnailUrl && !isProduct && !isVideo ? (
            isDeck && onReviewDeck ? (
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onReviewDeck();
                }}
                className="relative mb-2 block w-full overflow-hidden rounded-lg border border-card-border text-left transition hover:border-navy/30 dark:hover:border-teal/40"
                aria-label={`Review deck: ${item.title}`}
                title="Review Deck"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static public cover */}
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="h-36 w-full object-cover"
                />
              </button>
            ) : (
              <div className="mb-2 overflow-hidden rounded-lg border border-card-border">
                {/* eslint-disable-next-line @next/next/no-img-element -- static public cover */}
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="h-36 w-full object-cover"
                />
              </div>
            )
          ) : null}
          <div className="flex gap-4 pr-8">
            {isProduct ? (
              <ProductThumbnail
                src={item.thumbnailUrl}
                alt={item.title}
                size="modal"
                className="self-start"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="type">{item.type}</Badge>
                {item.category.map((cat) => (
                  <Badge key={cat}>{cat}</Badge>
                ))}
              </div>
              <DialogTitle className="pt-2">{item.title}</DialogTitle>
              <DialogDescription>{item.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {isVideo && fileUrl ? (
            <video
              className="w-full overflow-hidden rounded-lg border border-card-border bg-black"
              src={fileUrl}
              poster={item.thumbnailUrl}
              controls
              preload="metadata"
            >
              Your browser does not support embedded video.
            </video>
          ) : null}

          {isDrawing && fileUrl ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg border border-card-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- static public drawing */}
              <img
                src={fileUrl}
                alt={item.title}
                className="h-auto w-full bg-slate-950 object-contain"
              />
            </a>
          ) : null}

          <div className="rounded-md border border-card-border border-l-[3px] border-l-teal bg-background px-4 py-3 dark:bg-slate-800/40">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-navy dark:text-teal">
              Key Message
            </p>
            <p className="text-sm leading-relaxed text-foreground/90 dark:text-slate-200">
              {item.keyMessage}
            </p>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Highlights
            </p>
            <ul className="space-y-2">
              {item.highlights.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-sm leading-relaxed text-foreground/80 dark:text-slate-300"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 border-t border-card-border pt-4">
            {isFileAsset(item) && fileUrl && !(isDeck && onReviewDeck) ? (
              <>
                <Button asChild variant="accent" className="w-full sm:w-auto">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={item.type === "Datasheet" || item.type === "Brochure"}
                  >
                    {isVideo ? (
                      <Play className="h-4 w-4 fill-current" />
                    ) : (
                      <FileDown className="h-4 w-4" />
                    )}
                    {fileLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>

                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Button
                    variant="outline"
                    onClick={handleCopyLibraryLink}
                    className="sm:flex-1"
                  >
                    {copiedLibrary ? (
                      <>
                        <Check className="h-4 w-4" />
                        Link Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Link
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : isDeck && onReviewDeck ? (
              <>
                <Button
                  variant="accent"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    onOpenChange(false);
                    onReviewDeck();
                  }}
                >
                  <Play className="h-4 w-4 fill-current" />
                  Review Deck
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {item.publicUrl ? (
                    <Button asChild variant="outline" className="sm:flex-1">
                      <Link
                        href={item.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Deck Page
                      </Link>
                    </Button>
                  ) : null}

                  {pdfPreviewUrl || fileUrl ? (
                    <Button asChild variant="outline" className="sm:flex-1">
                      <a
                        href={fileUrl ?? pdfPreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        Preview PDF
                      </a>
                    </Button>
                  ) : null}

                  {item.publicUrl ? (
                    <Button
                      variant="outline"
                      onClick={handleCopyPublicLink}
                      className="sm:flex-1"
                    >
                      {copiedPublic ? (
                        <>
                          <Check className="h-4 w-4" />
                          Public Link Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Public Link
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={handleCopyLibraryLink}
                      className="sm:flex-1"
                    >
                      {copiedLibrary ? (
                        <>
                          <Check className="h-4 w-4" />
                          Link Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Link
                        </>
                      )}
                    </Button>
                  )}

                  {pdfSlug ? (
                    <Button asChild variant="outline" className="sm:flex-1">
                      <a href={getPdfDownloadUrl(pdfSlug)} download>
                        <FileDown className="h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                  ) : fileUrl ? (
                    <Button asChild variant="outline" className="sm:flex-1">
                      <a href={fileUrl} download>
                        <FileDown className="h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                  ) : null}
                </div>
              </>
            ) : isRealOnePager && item.publicUrl ? (
              <>
                <Button asChild variant="accent" className="w-full sm:w-auto">
                  <Link
                    href={item.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onOpenChange(false)}
                  >
                    {item.type === "Market Brief"
                      ? "View Full Brief"
                      : "View Full One-Pager"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {pdfPreviewUrl ? (
                    <Button asChild variant="outline" className="sm:flex-1">
                      <a
                        href={pdfPreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        Preview PDF
                      </a>
                    </Button>
                  ) : null}

                  <Button
                    variant="outline"
                    onClick={handleCopyPublicLink}
                    className="sm:flex-1"
                  >
                    {copiedPublic ? (
                      <>
                        <Check className="h-4 w-4" />
                        Public Link Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Public Link
                      </>
                    )}
                  </Button>

                  {pdfSlug ? (
                    <Button asChild variant="outline" className="sm:flex-1">
                      <a href={getPdfDownloadUrl(pdfSlug)} download>
                        <FileDown className="h-4 w-4" />
                        Download PDF
                      </a>
                    </Button>
                  ) : null}
                </div>
              </>
            ) : isShareable && item.publicUrl ? (
              // Fallback for other publicUrl types
              <>
                <Button asChild variant="accent" className="w-full sm:w-auto">
                  <Link
                    href={item.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onOpenChange(false)}
                  >
                    Open Asset
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button variant="accent" onClick={handleCopyLibraryLink}>
                  {copiedLibrary ? (
                    <>
                      <Check className="h-4 w-4" />
                      Link Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
                <p className="flex items-center gap-2 text-xs text-muted">
                  <FileDown className="h-3.5 w-3.5" />
                  Download PDF coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
