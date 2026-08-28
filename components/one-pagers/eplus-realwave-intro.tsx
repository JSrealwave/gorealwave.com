"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { DeckModal } from "@/components/decks/DeckModal";
import { OnePagerDocumentFrame } from "@/components/one-pagers/one-pager-document-frame";
import { OnePagerToolbar } from "@/components/one-pagers/one-pager-toolbar";
import { parseSlideQueryParam } from "@/lib/decks/slide-query";
import { EPLUS_REALWAVE_INTRO_SLIDES } from "@/lib/one-pager/eplus-realwave-intro-slides";
import {
  onePagerPdfAttrs,
  onePagerRoot,
  PDF_CLASSES,
  pdfOnly,
} from "@/lib/one-pager/theme";
import { cn } from "@/lib/utils";

const SLUG = "eplus-realwave-intro" as const;

type EplusRealwaveIntroProps = {
  pdfMode?: boolean;
  pdfClean?: boolean;
  showDownloadInPdfMode?: boolean;
  /** 1-based slide from `?slide=` — opens the viewer on load when set. */
  initialSlide?: number | null;
};

export function EplusRealwaveIntro({
  pdfMode = false,
  pdfClean = false,
  showDownloadInPdfMode = false,
  initialSlide = null,
}: EplusRealwaveIntroProps) {
  const slides = EPLUS_REALWAVE_INTRO_SLIDES;
  const total = slides.length;
  const cover = slides[0];
  const slideFromQuery = parseSlideQueryParam(
    initialSlide != null ? String(initialSlide) : null,
    total
  );
  const [deckOpen, setDeckOpen] = useState(() => slideFromQuery !== null);
  const [startIndex, setStartIndex] = useState(() => slideFromQuery ?? 0);

  useEffect(() => {
    if (slideFromQuery === null || pdfMode) return;
    setStartIndex(slideFromQuery);
    setDeckOpen(true);
  }, [slideFromQuery, pdfMode]);

  const openDeck = (index = 0) => {
    setStartIndex(index);
    setDeckOpen(true);
  };

  return (
    <div
      {...onePagerPdfAttrs(pdfMode, pdfClean)}
      className={cn(
        pdfMode
          ? onePagerRoot(pdfMode, pdfClean)
          : "min-h-screen bg-slate-100 px-4 py-8 text-slate-900"
      )}
    >
      <OnePagerToolbar
        pdfSlug={SLUG}
        downloadFilename="eplus-realwave-intro.pdf"
        label="Realwave Introduction Deck"
        pdfMode={pdfMode}
        pdfClean={pdfClean}
        showDownloadInPdfMode={showDownloadInPdfMode}
      />

      <OnePagerDocumentFrame pdfMode={pdfMode} pdfClean={pdfClean} wide>
        <div
          className={cn(
            !pdfMode &&
              "onepager-container mx-auto max-w-[1100px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/60"
          )}
        >
          {/* Deck header */}
          <header
            className={cn(
              "border-b border-slate-200 bg-gradient-to-br from-[#0f172a] to-[#1e2937] px-8 py-8 text-white sm:px-10 sm:py-10",
              pdfOnly(pdfMode, PDF_CLASSES.hero)
            )}
          >
            <div className="mb-3 inline-flex items-center rounded-full bg-[#00d4a6]/10 px-3 py-1 text-xs tracking-[0.5px] text-[#00d4a6]">
              SALES ENABLEMENT DECK
            </div>
            <h1 className="mb-3 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-[-1px] sm:text-4xl">
              Realwave Introduction
            </h1>
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-lg">
              {pdfMode
                ? "Full introduction deck for customer and partner conversations."
                : "Open the interactive viewer to step through the deck with thumbnails, or download a PDF copy to share."}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-white/50">
              {total} slides
            </p>

            {!pdfMode ? (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => openDeck(0)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#00d4a6] px-5 py-3 text-sm font-semibold text-[#0b1220] shadow-lg shadow-[#00d4a6]/20 transition hover:bg-[#1de0b4] active:scale-[0.985]"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Review Deck
                </button>
              </div>
            ) : null}
          </header>

          {/* Browser: cover + mini thumbs that open the modal */}
          {!pdfMode ? (
            <div className="bg-slate-50 px-5 py-8 sm:px-8 sm:py-10">
              <button
                type="button"
                onClick={() => openDeck(0)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#0b1220] text-left shadow-sm transition hover:border-slate-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4a6]/50"
                aria-label="Open deck viewer"
              >
                <div className="aspect-video w-full">
                  <img
                    src={cover.src}
                    alt={cover.alt}
                    className="h-full w-full object-contain object-center"
                    loading="eager"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/25">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-900 opacity-0 shadow-lg transition group-hover:opacity-100">
                    <Play className="h-4 w-4 fill-current" />
                    Review Deck
                  </span>
                </div>
              </button>

              <div className="mt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Jump to slide
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:thin]">
                  {slides.map((slide, i) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => openDeck(i)}
                      className="relative h-[56px] w-[100px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-[#12498a] hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4a6]/50"
                      aria-label={`Open slide ${i + 1}: ${slide.title}`}
                    >
                      <img
                        src={slide.thumbSrc ?? slide.src}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-0.5 left-0.5 rounded bg-black/70 px-1 py-px font-mono text-[9px] text-white">
                        {i + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* PDF export: stacked slides so Playwright captures the full deck */
            <div
              className={cn(
                "space-y-6 bg-white px-5 py-6 sm:px-8",
                pdfOnly(pdfMode, PDF_CLASSES.section)
              )}
            >
              {slides.map((slide, index) => (
                <article
                  key={slide.id}
                  className={cn(
                    "overflow-hidden rounded-xl border border-slate-200",
                    pdfOnly(pdfMode, PDF_CLASSES.card)
                  )}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {slide.title}
                    </p>
                    <p className="font-mono text-[11px] tracking-widest text-slate-400">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(total).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="bg-[#0b1220] p-2">
                    <div className="aspect-video w-full overflow-hidden rounded-md">
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <footer
            className={cn(
              "flex items-center justify-between border-t border-slate-200 bg-white px-8 py-3 text-[10px] text-slate-400",
              pdfOnly(pdfMode, PDF_CLASSES.footer)
            )}
          >
            <div>
              ePlus Realwave • Where Technology Means More® • Confidential — For
              Partners &amp; Prospects
            </div>
            <div className="hidden font-mono text-[9px] tracking-widest sm:block">
              INTRO DECK
            </div>
          </footer>
        </div>
      </OnePagerDocumentFrame>

      {!pdfMode ? (
        <>
          <DeckModal
            open={deckOpen}
            onOpenChange={setDeckOpen}
            slides={slides}
            initialIndex={startIndex}
            deckTitle="Realwave Introduction Deck"
            syncUrl
          />
          <div className="mx-auto mt-4 max-w-[1100px] px-6 text-center">
            <p className="text-xs text-slate-500">
              <span className="font-medium">Pro tip:</span> Use Download PDF for
              a shareable copy, or open{" "}
              <span className="font-mono">?pdf=1</span> for a framed browser
              preview.
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
