import { cn } from "@/lib/utils";

/** Browser PDF preview width — matches realwave-sled (~10" / 1100px). */
export const PDF_PREVIEW_MAX_WIDTH = "max-w-[1100px]" as const;

/** Utility class names applied only in PDF mode (?pdf=1). */
export const PDF_CLASSES = {
  section: "pdf-section",
  hero: "pdf-hero",
  card: "pdf-card",
  tailGroup: "pdf-tail-group",
  footer: "pdf-footer",
  shell: "pdf-shell",
  frame: "pdf-frame",
} as const;

export function pdfOnly(pdfMode: boolean, className: string): string | undefined {
  return pdfMode ? className : undefined;
}

/** One-pagers always use a light canvas; pdfMode adds print-compact overrides. */
export function onePagerRoot(pdfMode: boolean, pdfClean = false) {
  return cn(
    "text-slate-900",
    pdfMode
      ? pdfClean
        ? "min-h-0 bg-white"
        : "min-h-screen bg-slate-100 py-8"
      : "min-h-screen bg-white"
  );
}

export function onePagerPdfAttrs(pdfMode: boolean, pdfClean = false) {
  return {
    "data-one-pager": "true" as const,
    "data-pdf-mode": pdfMode ? ("true" as const) : undefined,
    "data-pdf-clean": pdfClean ? ("true" as const) : undefined,
  };
}

/** Outer PDF canvas — wide preview (~10" / 1100px), matches realwave-sled. */
export function onePagerShell(_wide = false) {
  return cn(
    PDF_CLASSES.shell,
    "mx-auto w-full",
    PDF_PREVIEW_MAX_WIDTH, // max-w-[1100px] ≡ max-w-[68.75rem]
    "px-4 py-4"
  );
}

/** Framed document card — realwave-sled treatment (rounded-3xl + heavy shadow). */
export function onePagerFrame(className?: string) {
  return cn(
    PDF_CLASSES.frame,
    "overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/60",
    className
  );
}

export type OnePagerVariant = "standard" | "rich";

export function onePagerContainer(
  pdfMode: boolean,
  wide = false,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    pdfMode
      ? "w-full px-8 py-6"
      : cn(
          "mx-auto",
          wide ? "max-w-6xl px-8 py-10" : "max-w-5xl px-8 py-10"
        )
  );
}

export function onePagerBadge(pdfMode: boolean) {
  return cn(
    "inline-flex items-center rounded-full font-medium tracking-[1.5px]",
    pdfMode
      ? "mb-3 px-3 py-0.5 text-[10px]"
      : "mb-4 px-3 py-1 text-xs",
    "border border-teal/30 bg-teal/10 text-[#007a62]"
  );
}

/**
 * PDF-mode type scale — shared by standard + rich Everpure, aligned to
 * realwave-sled content sizes (15px body, text-lg titles, text-sm card body).
 */
export function onePagerTitle(
  pdfMode: boolean,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    "font-semibold text-slate-900",
    pdfMode
      ? "text-3xl leading-[1.15] tracking-tight"
      : "text-4xl leading-tight tracking-tight sm:text-5xl sm:leading-none sm:tracking-tighter"
  );
}

export function onePagerLead(
  pdfMode: boolean,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    "max-w-3xl text-slate-600",
    pdfMode ? "mt-4 text-[15px] leading-relaxed" : "mt-6 text-lg"
  );
}

export function onePagerBody(
  pdfMode: boolean,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    pdfMode
      ? "text-[15px] leading-relaxed text-slate-700"
      : "leading-relaxed text-slate-700"
  );
}

export function onePagerSectionTitle(
  pdfMode: boolean,
  large = false,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    "font-semibold tracking-tight text-slate-900",
    pdfMode
      ? "mb-4 text-lg leading-tight"
      : large
        ? "mb-6 text-2xl sm:text-3xl"
        : "mb-6 text-2xl"
  );
}

export function onePagerCard(
  pdfMode: boolean,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    "border border-slate-200 bg-slate-50",
    pdfMode ? "rounded-2xl p-5" : "rounded-2xl p-6 sm:p-8",
    pdfOnly(pdfMode, PDF_CLASSES.card)
  );
}

export function onePagerCardTitle(pdfMode: boolean) {
  return cn(
    "font-semibold text-slate-900",
    pdfMode ? "mb-2 text-lg leading-tight" : "mb-3 text-lg"
  );
}

export function onePagerCardBody(
  pdfMode: boolean,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    pdfMode ? "text-sm leading-relaxed text-slate-600" : "text-slate-600"
  );
}

export function onePagerFooter(
  pdfMode: boolean,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    "border-t border-slate-200 text-slate-500",
    pdfMode ? "mt-6 pt-4 text-[10px] leading-normal" : "mt-16 pt-8 text-sm",
    pdfOnly(pdfMode, PDF_CLASSES.footer)
  );
}

export function onePagerImageFrame(pdfMode: boolean) {
  return cn(
    "overflow-hidden border border-slate-200",
    pdfMode ? "rounded-md" : "rounded-2xl"
  );
}

export function onePagerHeroImage(
  pdfMode: boolean,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    "w-full object-cover object-center",
    pdfMode ? "mb-4 max-h-40 rounded-md" : "mb-8 rounded-2xl"
  );
}

export function onePagerInlineImage(
  pdfMode: boolean,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    "h-auto w-full",
    pdfMode ? "max-h-40 object-cover" : "object-cover"
  );
}

export function onePagerProductImage(
  pdfMode: boolean,
  _variant: OnePagerVariant = "standard"
) {
  return cn(
    "h-auto w-full",
    pdfMode ? "max-h-40 object-contain" : "object-contain"
  );
}

export function onePagerDownloadButton() {
  return "inline-flex items-center justify-center whitespace-nowrap rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50";
}
