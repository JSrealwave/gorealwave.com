import {
  productThumbnailFrameClass,
  productThumbnailImageClass,
  productThumbnailModalFrameClass,
} from "@/lib/product-images";
import { cn } from "@/lib/utils";

type ProductThumbnailProps = {
  src?: string;
  alt?: string;
  /** Link target (e.g. PDF preview). When set, the thumb is clickable. */
  href?: string;
  /** Modal size uses a slightly larger rail. */
  size?: "card" | "modal";
  className?: string;
  placeholderLabel?: string;
};

/**
 * Left-rail product/hardware thumbnail — compact, object-contain, transparent bg.
 * Opt in via this component (or `product-thumbnail-frame` classes) for SKU cards only.
 */
export function ProductThumbnail({
  src,
  alt = "",
  href,
  size = "card",
  className,
  placeholderLabel = "Image Placeholder",
}: ProductThumbnailProps) {
  const frameClass = cn(
    size === "modal" ? productThumbnailModalFrameClass : productThumbnailFrameClass,
    className
  );

  const content = src ? (
    // eslint-disable-next-line @next/next/no-img-element -- static public product thumbs
    <img src={src} alt={alt} className={productThumbnailImageClass} />
  ) : (
    <span className="px-1 text-center text-[10px] font-medium uppercase tracking-wide text-muted">
      {/* TODO: Replace with product thumbnail */}
      {placeholderLabel}
    </span>
  );

  if (src && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(frameClass, "transition hover:opacity-90")}
        aria-label={alt ? `Preview PDF for ${alt}` : "Preview PDF"}
        title="Preview PDF"
      >
        {content}
      </a>
    );
  }

  return <div className={frameClass}>{content}</div>;
}
