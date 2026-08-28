/**
 * Product thumbnail paths under /public/images/thumbnails/.
 * Keys are Realwave part numbers from the product catalog.
 */
export const PRODUCT_THUMBNAILS: Record<string, string> = {
  "REX-MAX-128": "/images/thumbnails/max-2.webp",
  "REX-AIO-8": "/images/thumbnails/aio-8.webp",
  "REX-Mini-2TB": "/images/thumbnails/rex-mini-ai.webp",
  // Catalog SKU is REX-VSS-FT; mapping also accepts the VS5 alias.
  "REX-VS5-FT": "/images/thumbnails/turret_nb.webp",
  "REX-VSS-FT": "/images/thumbnails/turret_nb.webp",
  "REX-AI5-FD": "/images/thumbnails/fd.webp",
  "REX-AI8-MB": "/images/thumbnails/bullet.webp",
  "REX-AI5-360": "/images/thumbnails/360.webp",
  "RealIQ-OT": "/images/thumbnails/iq-ot.webp",
  "RealIQ-LPR": "/images/thumbnails/iq-lpr.webp",
  "RealIQ-FR": "/images/thumbnails/face-rec.webp",
  "RealIQ-FS": "/images/thumbnails/iq-fs.webp",
  RealVue: "/images/thumbnails/rv-image.webp",
};

export function getProductThumbnail(
  partNumber: string
): string | undefined {
  return PRODUCT_THUMBNAILS[partNumber];
}

/** True for catalog SKU cards (Library Product type or partNumber set). */
export function isProductThumbnailItem(item: {
  type?: string;
  partNumber?: string;
}): boolean {
  return Boolean(item.partNumber);
}

/**
 * Compact left-rail product thumbnail frame.
 * Transparent / near-transparent — height is content-driven, not aspect-locked.
 */
export const productThumbnailFrameClass =
  "product-thumbnail-frame flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-transparent sm:h-24 sm:w-24";

export const productThumbnailImageClass =
  "max-h-full max-w-full object-contain";

/** Slightly larger frame for modals. */
export const productThumbnailModalFrameClass =
  "product-thumbnail-frame flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-md bg-transparent sm:h-32 sm:w-32";
