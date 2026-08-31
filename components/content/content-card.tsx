import { ArrowRight, FileText, Play, Sparkles } from "lucide-react";
import type { ContentItem, FilePreview } from "@/lib/content";
import {
  getFileActionLabel,
  getFilePreview,
  getItemFileUrl,
  getPublicPdfPreviewUrl,
  isDeckItem,
  isFullPageItem,
  isHighlight,
} from "@/lib/content";
import { isProductThumbnailItem } from "@/lib/product-images";
import { ProductThumbnail } from "@/components/product-thumbnail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  item: ContentItem;
  onViewDetails: () => void;
  /** Opens the interactive deck viewer (Deck items only). */
  onReviewDeck?: () => void;
  /** Opens the in-page file preview modal (PDF, video, drawing). */
  onPreviewFile?: (preview: FilePreview) => void;
}

export function ContentCard({
  item,
  onViewDetails,
  onReviewDeck,
  onPreviewFile,
}: ContentCardProps) {
  const isFullPage = isFullPageItem(item);
  const isDeck = isDeckItem(item);
  const pdfPreviewUrl = getPublicPdfPreviewUrl(item);
  const fileUrl = getItemFileUrl(item);
  const openUrl = fileUrl ?? pdfPreviewUrl;
  const filePreview = getFilePreview(item);
  const fileLabel = getFileActionLabel(item);
  const isProduct = isProductThumbnailItem(item);
  const isVideo = item.type === "Video";
  const openPreview = filePreview && onPreviewFile
    ? () => onPreviewFile(filePreview)
    : undefined;

  const body = (
    <>
      <div className="mb-3">
        <Badge variant="type">{item.type}</Badge>
      </div>

      <h3 className="mb-2.5 text-base font-bold leading-snug text-navy group-hover:text-navy-light dark:text-slate-100 dark:group-hover:text-teal">
        {item.title}
      </h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
        {item.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {item.category.map((cat) => (
          <Badge key={cat} variant="default" className="normal-case tracking-normal">
            {cat}
          </Badge>
        ))}
      </div>

      {isDeck && onReviewDeck ? (
        <div className="flex items-center gap-2">
          {pdfPreviewUrl || fileUrl ? (
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 px-3"
              title="Preview PDF"
              aria-label="Preview PDF"
              onClick={() =>
                onPreviewFile?.({
                  type: "pdf",
                  src: fileUrl ?? pdfPreviewUrl ?? "",
                  title: item.title,
                })
              }
            >
              <FileText className="h-4 w-4" />
            </Button>
          ) : null}
          <Button
            variant="accent"
            size="sm"
            className="min-w-0 flex-1"
            onClick={onReviewDeck}
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Review Deck
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={onViewDetails}
            title="View Details"
          >
            Details
          </Button>
        </div>
      ) : openPreview ? (
        <div className="flex items-center gap-2">
          <Button
            variant="accent"
            size="sm"
            className="min-w-0 flex-1"
            onClick={openPreview}
          >
            {isVideo ? (
              <Play className="h-3.5 w-3.5 fill-current" />
            ) : (
              <FileText className="h-3.5 w-3.5" />
            )}
            {fileLabel}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={onViewDetails}
          >
            Details
          </Button>
        </div>
      ) : isFullPage && pdfPreviewUrl ? (
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="accent"
            size="sm"
            className="shrink-0 px-3"
            title="Preview PDF"
          >
            <a
              href={pdfPreviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Preview PDF"
            >
              <FileText className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="min-w-0 flex-1"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onViewDetails}
        >
          View Details
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      )}

      {isHighlight(item) && (
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-teal-dark dark:text-teal">
          <Sparkles className="h-3 w-3" />
          Highlight
        </div>
      )}
    </>
  );

  return (
    <article className="group flex flex-col rounded-xl border border-card-border bg-card px-6 py-5 shadow-sm transition-colors hover:border-navy/25 hover:shadow-md dark:hover:border-teal/25">
      {isProduct ? (
        <div className="flex gap-4">
          <ProductThumbnail
            src={item.thumbnailUrl}
            alt={item.title}
            href={pdfPreviewUrl}
            className="self-start"
          />
          <div className="flex min-w-0 flex-1 flex-col">{body}</div>
        </div>
      ) : (
        <>
          {item.thumbnailUrl ? (
            <CardCover
              src={item.thumbnailUrl}
              title={item.title}
              isDeck={isDeck}
              isVideo={isVideo}
              onReviewDeck={onReviewDeck}
              onPreview={openPreview}
              pdfPreviewUrl={
                isDeck && onReviewDeck
                  ? undefined
                  : openPreview
                    ? undefined
                    : openUrl
              }
            />
          ) : null}
          {body}
        </>
      )}
    </article>
  );
}

/** Compact cover — decks open the viewer; one-pagers preview PDF. */
function CardCover({
  src,
  title,
  isDeck,
  isVideo,
  onReviewDeck,
  onPreview,
  pdfPreviewUrl,
}: {
  src: string;
  title: string;
  isDeck: boolean;
  isVideo?: boolean;
  onReviewDeck?: () => void;
  onPreview?: () => void;
  pdfPreviewUrl?: string;
}) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element -- static public cover
    <img
      src={src}
      alt=""
      className="h-full w-full object-cover"
    />
  );

  const frameClass =
    "mb-4 h-28 w-full overflow-hidden rounded-lg border border-card-border bg-slate-100 dark:bg-slate-900/40";

  if (isDeck && onReviewDeck) {
    return (
      <button
        type="button"
        onClick={onReviewDeck}
        className={cn(
          frameClass,
          "group/cover relative block w-full text-left transition hover:border-navy/30 dark:hover:border-teal/40"
        )}
        aria-label={`Review deck: ${title}`}
        title="Review Deck"
      >
        {image}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover/cover:bg-black/25 group-hover/cover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow">
            <Play className="h-3 w-3 fill-current" />
            Review Deck
          </span>
        </span>
      </button>
    );
  }

  if (onPreview) {
    return (
      <button
        type="button"
        onClick={onPreview}
        className={cn(
          frameClass,
          "group/cover relative block w-full text-left transition hover:border-navy/30 dark:hover:border-teal/40"
        )}
        aria-label={isVideo ? `Watch video: ${title}` : `Open ${title}`}
        title={isVideo ? "Watch video" : "Open"}
      >
        {image}
        {isVideo ? (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow">
              <Play className="h-3 w-3 fill-current" />
              Watch
            </span>
          </span>
        ) : null}
      </button>
    );
  }

  if (pdfPreviewUrl) {
    return (
      <a
        href={pdfPreviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          frameClass,
          "group/cover relative block transition hover:border-navy/30 dark:hover:border-teal/40"
        )}
        aria-label={isVideo ? `Watch video: ${title}` : `Open ${title}`}
        title={isVideo ? "Watch video" : "Open"}
      >
        {image}
        {isVideo ? (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/15">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow">
              <Play className="h-3 w-3 fill-current" />
              Watch
            </span>
          </span>
        ) : null}
      </a>
    );
  }

  return <div className={frameClass}>{image}</div>;
}
