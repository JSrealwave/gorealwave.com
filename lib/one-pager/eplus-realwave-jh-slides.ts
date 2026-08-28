/**
 * Slide manifest for the Realwave Intro Deck (JH 8/3 — 16 slides).
 *
 * Full slides: `public/images/decks/eplus-realwave-jh/slide-NN.webp`
 * Thumbnails:  `public/images/decks/eplus-realwave-jh/thumbs/slide-NN.webp`
 */
import type { DeckSlide } from "@/lib/decks/types";

const BASE = "/images/decks/eplus-realwave-jh";
const THUMBS = `${BASE}/thumbs`;

function slide(index: number, title: string): DeckSlide {
  const n = String(index).padStart(2, "0");
  return {
    id: `slide-${n}`,
    title,
    src: `${BASE}/slide-${n}.webp`,
    thumbSrc: `${THUMBS}/slide-${n}.webp`,
    alt: `Realwave Intro (JH 8/3) — ${title}`,
  };
}

export const EPLUS_REALWAVE_JH_SLIDES: readonly DeckSlide[] = [
  slide(0, "Realwave Intro"),
  slide(1, "Agenda"),
  slide(2, "Discovery & Initial Findings"),
  slide(3, "Compliance & Standard of Care"),
  slide(4, "Building Out a Proactive Command/Dispatch"),
  slide(5, "Modern Video Intelligence Stack"),
  slide(6, "Realwave Edge eXchange"),
  slide(7, "RealVue — Enterprise"),
  slide(8, "RealVue — Gen 6 Enterprise"),
  slide(9, "RealIntelligence"),
  slide(10, "RealInsights"),
  slide(11, 'ePlus-Enterprise/SLED ("Bailiwick")'),
  slide(12, "Thank You"),
  slide(13, "RealVue — Architecture"),
  slide(14, "Why Now"),
  slide(15, "Command/Dispatch — Best Practices"),
];
