"use client";

import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import {
  parseSlideQueryParam,
  replaceSlideQueryParam,
} from "@/lib/decks/slide-query";
import type { DeckSlide } from "@/lib/decks/types";
import { cn } from "@/lib/utils";

export type { DeckSlide };

type DeckModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slides: readonly DeckSlide[];
  /** Zero-based index when opening. */
  initialIndex?: number;
  /** Modal chrome title. */
  deckTitle?: string;
  /**
   * When true, keep `?slide=` (1-based) in sync while the modal is open
   * and clear it on close.
   */
  syncUrl?: boolean;
  /** Tailwind aspect class for the slide stage (default 16:9). */
  slideAspectClass?: string;
};

const SWIPE_THRESHOLD_PX = 48;
const CHROME_HIDE_MS = 2200;

function slideFileExtension(src: string): "png" | "webp" | "jpg" {
  const path = src.split("?")[0]?.toLowerCase() ?? "";
  if (path.endsWith(".png")) return "png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "jpg";
  return "webp";
}

/** e.g. "Realwave Introduction Deck" + index 4 → "Realwave-Intro-Slide-05.webp" */
function slideDownloadFilename(
  deckTitle: string,
  slideIndex: number,
  src: string
): string {
  const base = deckTitle
    .replace(/\s+Deck$/i, "")
    .replace(/Introduction/gi, "Intro")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "Deck";
  const n = String(slideIndex + 1).padStart(2, "0");
  return `${base}-Slide-${n}.${slideFileExtension(src)}`;
}

async function downloadSlideImage(src: string, filename: string) {
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Failed to fetch slide (${response.status})`);
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function DeckModal({
  open,
  onOpenChange,
  slides,
  initialIndex = 0,
  deckTitle = "Deck",
  syncUrl = false,
  slideAspectClass = "aspect-video",
}: DeckModalProps) {
  const total = slides.length;
  const [index, setIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(total - 1, 0))
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [thumbsExpanded, setThumbsExpanded] = useState(false);
  const [isDownloadingSlide, setIsDownloadingSlide] = useState(false);
  const activeThumbRef = useRef<HTMLButtonElement>(null);
  const thumbRailRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chromeHideTimer = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Sync index when modal opens / initialIndex changes.
  useEffect(() => {
    if (!open || total === 0) return;

    let next = Math.min(Math.max(initialIndex, 0), total - 1);
    if (syncUrl) {
      const fromUrl = parseSlideQueryParam(
        new URLSearchParams(window.location.search).get("slide"),
        total
      );
      if (fromUrl !== null) next = fromUrl;
    }
    setIndex(next);
    setIsFullscreen(false);
    setChromeVisible(true);
    setThumbsExpanded(false);
  }, [open, initialIndex, total, syncUrl]);

  const clearChromeTimer = useEffectEvent(() => {
    if (chromeHideTimer.current !== null) {
      window.clearTimeout(chromeHideTimer.current);
      chromeHideTimer.current = null;
    }
  });

  const scheduleChromeHide = useEffectEvent(() => {
    clearChromeTimer();
    chromeHideTimer.current = window.setTimeout(() => {
      setChromeVisible(false);
      chromeHideTimer.current = null;
    }, CHROME_HIDE_MS);
  });

  const revealChrome = useEffectEvent(() => {
    setChromeVisible(true);
    scheduleChromeHide();
  });

  const exitFullscreen = useEffectEvent(async () => {
    setIsFullscreen(false);
    setChromeVisible(true);
    clearChromeTimer();
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // ignore — CSS presentation mode still exits
      }
    }
  });

  const enterFullscreen = useEffectEvent(async () => {
    setIsFullscreen(true);
    setChromeVisible(true);
    scheduleChromeHide();
    const el = contentRef.current;
    if (el && el.requestFullscreen) {
      try {
        await el.requestFullscreen();
      } catch {
        // Browser blocked FS API — CSS edge-to-edge mode still applies
      }
    }
  });

  const toggleFullscreen = useEffectEvent(() => {
    if (isFullscreen) void exitFullscreen();
    else void enterFullscreen();
  });

  const goTo = useEffectEvent((next: number) => {
    if (total === 0) return;
    setIndex(((next % total) + total) % total);
  });

  const goPrev = useEffectEvent(() => goTo(index - 1));
  const goNext = useEffectEvent(() => goTo(index + 1));

  const downloadCurrentSlide = useEffectEvent(async () => {
    if (!open || total === 0 || isDownloadingSlide) return;
    const current = slides[index];
    if (!current) return;

    setIsDownloadingSlide(true);
    try {
      await downloadSlideImage(
        current.src,
        slideDownloadFilename(deckTitle, index, current.src)
      );
    } catch {
      // Best-effort download — avoid breaking the viewer on network errors.
    } finally {
      setIsDownloadingSlide(false);
    }
  });

  // Keep presentation state in sync if user exits via browser Esc / UI.
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
        setChromeVisible(true);
        clearChromeTimer();
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, [isFullscreen]);

  // Auto-hide chrome while presenting.
  useEffect(() => {
    if (!open || !isFullscreen) {
      clearChromeTimer();
      setChromeVisible(true);
      return;
    }
    scheduleChromeHide();
    return () => clearChromeTimer();
  }, [open, isFullscreen, index]);

  // Exit presentation if modal closes.
  useEffect(() => {
    if (open) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    }
    setIsFullscreen(false);
  }, [open]);

  // URL sync while open.
  useEffect(() => {
    if (!syncUrl || !open || total === 0) return;
    replaceSlideQueryParam(index + 1);
  }, [syncUrl, open, index, total]);

  useEffect(() => {
    if (!syncUrl || open) return;
    replaceSlideQueryParam(null);
  }, [syncUrl, open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        if (isFullscreen) revealChrome();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
        if (isFullscreen) revealChrome();
      } else if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, isFullscreen]);

  useEffect(() => {
    if (!open || isFullscreen) return;
    activeThumbRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index, open, isFullscreen]);

  useEffect(() => {
    if (!open || total === 0) return;
    const neighbors = [index - 1, index + 1, index + 2]
      .map((i) => ((i % total) + total) % total)
      .filter((i) => i !== index);

    for (const i of neighbors) {
      const img = new window.Image();
      img.src = slides[i].src;
    }
  }, [index, open, slides, total]);

  const scrollThumbs = (direction: -1 | 1) => {
    const rail = thumbRailRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.max(rail.clientWidth * 0.7, 180),
      behavior: "smooth",
    });
  };

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.changedTouches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    if (isFullscreen) revealChrome();
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) {
      return;
    }

    if (dx < 0) goNext();
    else goPrev();
  };

  if (total === 0) return null;

  const slide = slides[index];
  const counter = `${index + 1} / ${total}`;
  const headerLabel = `${slide.title} — ${counter}`;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            isFullscreen ? "bg-black" : "bg-black/70 backdrop-blur-[2px]"
          )}
        />
        <DialogPrimitive.Content
          ref={contentRef}
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden text-white outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            isFullscreen
              ? "inset-0 h-dvh w-screen max-h-none rounded-none border-0 bg-black shadow-none"
              : cn(
                  "left-1/2 top-1/2 w-[min(96vw,1120px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-700/80 bg-[#0b1220] shadow-2xl shadow-black/50",
                  "max-h-[min(94vh,920px)] data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                )
          )}
          aria-describedby={undefined}
          onEscapeKeyDown={(event) => {
            if (isFullscreen) {
              event.preventDefault();
              void exitFullscreen();
            }
          }}
          onPointerMove={() => {
            if (isFullscreen) revealChrome();
          }}
        >
          {/* -------- Presentation mode (immersive) -------- */}
          {isFullscreen ? (
            <div
              className="relative flex h-full w-full flex-col bg-black"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <DialogPrimitive.Title className="sr-only">
                {headerLabel}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">
                Presentation mode. Arrow keys or swipe to change slides. Press F
                or Escape to exit fullscreen.
              </DialogPrimitive.Description>

              {/* Edge-to-edge slide */}
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black">
                <img
                  key={slide.id}
                  src={slide.src}
                  alt={slide.alt}
                  className="max-h-full max-w-full select-none object-contain"
                  draggable={false}
                />
              </div>

              {/* Floating chrome — auto-hides */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 z-10 transition-opacity duration-300",
                  chromeVisible ? "opacity-100" : "opacity-0"
                )}
                aria-hidden={!chromeVisible}
              >
                {/* Top fade + exit */}
                <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 via-black/25 to-transparent px-3 pb-10 pt-3 sm:px-5 sm:pt-4">
                  <div className="pointer-events-auto flex items-start justify-between gap-3">
                    <div className="min-w-0 rounded-lg bg-black/35 px-3 py-1.5 backdrop-blur-sm">
                      <p className="truncate text-sm font-medium text-white/90">
                        {slide.title}
                      </p>
                      <p className="font-mono text-[11px] tracking-wider text-white/55">
                        {counter}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => void exitFullscreen()}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-2 text-xs font-semibold text-white/90 shadow-lg backdrop-blur-sm transition hover:border-white/40 hover:bg-black/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        aria-label="Exit fullscreen"
                        title="Exit fullscreen (F or Esc)"
                      >
                        <Minimize2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Exit Fullscreen</span>
                        <span className="font-mono text-[10px] text-white/45 sm:hidden">
                          Esc
                        </span>
                      </button>
                      <DialogPrimitive.Close
                        className="rounded-full border border-white/20 bg-black/50 p-2 text-white/80 shadow-lg backdrop-blur-sm transition hover:border-white/40 hover:bg-black/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        aria-label="Close deck"
                        title="Close"
                      >
                        <X className="h-4 w-4" />
                      </DialogPrimitive.Close>
                    </div>
                  </div>
                </div>

                {/* Side nav arrows */}
                <button
                  type="button"
                  onClick={goPrev}
                  className="pointer-events-auto absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white/85 backdrop-blur-sm transition hover:bg-black/65 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:left-4 sm:flex"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="pointer-events-auto absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white/85 backdrop-blur-sm transition hover:bg-black/65 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:right-4 sm:flex"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Minimal bottom hint */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-12">
                  <p className="text-center text-[11px] tracking-wide text-white/45">
                    ← → navigate · F or Esc exit fullscreen
                  </p>
                </div>
              </div>

              {/* Always-available mobile prev/next (subtle, small) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-between px-3 sm:hidden">
                <button
                  type="button"
                  onClick={goPrev}
                  className={cn(
                    "pointer-events-auto rounded-full border border-white/15 bg-black/45 p-2.5 text-white/85 backdrop-blur-sm transition",
                    chromeVisible ? "opacity-100" : "opacity-40"
                  )}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className={cn(
                    "pointer-events-auto rounded-full border border-white/15 bg-black/45 p-2.5 text-white/85 backdrop-blur-sm transition",
                    chromeVisible ? "opacity-100" : "opacity-40"
                  )}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* -------- Normal modal mode -------- */}
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <DialogPrimitive.Title className="truncate text-sm font-semibold tracking-tight text-white sm:text-base">
                    {headerLabel}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">
                    {deckTitle}. Slide viewer with thumbnail navigation. Use
                    arrow keys or swipe to change slides, F for fullscreen,
                    Escape to close.
                  </DialogPrimitive.Description>
                  <p className="truncate text-xs text-white/45">{deckTitle}</p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <span className="hidden rounded-full bg-white/10 px-2.5 py-1 font-mono text-[11px] tracking-wider text-white/80 sm:inline">
                    {counter}
                  </span>
                  <button
                    type="button"
                    onClick={() => void enterFullscreen()}
                    className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4a6]/60"
                    aria-label="Enter fullscreen"
                    title="Fullscreen (F)"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                  <DialogPrimitive.Close
                    className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4a6]/60"
                    aria-label="Close deck"
                  >
                    <X className="h-4 w-4" />
                  </DialogPrimitive.Close>
                </div>
              </div>

              <div
                className="relative flex min-h-0 flex-1 flex-col bg-black px-3 pt-3 sm:px-4 sm:pt-4"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-lg border border-white/10 bg-black",
                    slideAspectClass
                  )}
                >
                  <img
                    key={slide.id}
                    src={slide.src}
                    alt={slide.alt}
                    className="h-full w-full select-none object-contain object-center"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 px-3 py-3 sm:px-4">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4a6]/60"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <p className="min-w-0 truncate px-2 text-center text-xs text-white/55 sm:text-sm">
                    <span className="font-medium text-white/80">
                      {slide.title}
                    </span>
                    <span className="mx-1.5 text-white/30">·</span>
                    <span className="font-mono tracking-wider">{counter}</span>
                  </p>

                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4a6]/60"
                    aria-label="Next slide"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => void downloadCurrentSlide()}
                    disabled={isDownloadingSlide}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4a6]/60 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Download current slide"
                    title={`Download ${slideDownloadFilename(deckTitle, index, slide.src)}`}
                  >
                    <Download className="h-4 w-4" />
                    <span>
                      {isDownloadingSlide
                        ? "Downloading…"
                        : "Download Current Slide"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 bg-[#070d18] px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
                <div className="mb-2 flex items-center justify-between gap-2 md:hidden">
                  <button
                    type="button"
                    onClick={() => setThumbsExpanded((v) => !v)}
                    className="text-xs font-semibold text-white/70 transition hover:text-white"
                  >
                    {thumbsExpanded ? "Hide thumbnails" : "Show thumbnails"}
                  </button>
                  <p className="font-mono text-[11px] tracking-wider text-white/40">
                    {counter}
                  </p>
                </div>

                <div
                  className={cn("relative", !thumbsExpanded && "hidden md:block")}
                >
                  <button
                    type="button"
                    onClick={() => scrollThumbs(-1)}
                    className="absolute left-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0b1220]/90 text-white/80 shadow-lg transition hover:bg-[#0b1220] hover:text-white md:flex"
                    aria-label="Scroll thumbnails left"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollThumbs(1)}
                    className="absolute right-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0b1220]/90 text-white/80 shadow-lg transition hover:bg-[#0b1220] hover:text-white md:flex"
                    aria-label="Scroll thumbnails right"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <div
                    ref={thumbRailRef}
                    className="flex gap-2 overflow-x-auto scroll-smooth px-0 pb-1 md:px-9 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25"
                    role="listbox"
                    aria-label="Slide thumbnails"
                  >
                    {slides.map((item, i) => {
                      const active = i === index;
                      return (
                        <button
                          key={item.id}
                          ref={active ? activeThumbRef : undefined}
                          type="button"
                          role="option"
                          aria-selected={active}
                          aria-label={`Go to slide ${i + 1}: ${item.title}`}
                          title={item.title}
                          onClick={() => goTo(i)}
                          className={cn(
                            "relative h-[48px] w-[86px] shrink-0 overflow-hidden rounded-md border transition sm:h-[54px] sm:w-[96px]",
                            active
                              ? "scale-[1.02] border-[#00d4a6] opacity-100 ring-2 ring-[#00d4a6]/45"
                              : "border-white/15 opacity-60 hover:scale-[1.02] hover:border-white/40 hover:opacity-100"
                          )}
                        >
                          <img
                            src={item.thumbSrc ?? item.src}
                            alt=""
                            className="h-full w-full object-cover object-center"
                            loading="lazy"
                            draggable={false}
                          />
                          <span
                            className={cn(
                              "absolute bottom-0.5 left-0.5 rounded bg-black/75 px-1 py-px font-mono text-[9px] text-white/90",
                              active && "bg-[#00d4a6] text-[#0b1220]"
                            )}
                          >
                            {i + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
