/**
 * Slide manifest for the SoCal Realwave Training deck (34 slides).
 *
 * Landscape: 2485 × 1920
 * Full slides: `public/images/decks/socal-realwave-trng-deck/slide-NN.webp`
 * Thumbnails:  `public/images/decks/socal-realwave-trng-deck/thumbs/slide-NN.webp`
 */
import type { DeckSlide } from "@/lib/decks/types";

const BASE = "/images/decks/socal-realwave-trng-deck";
const THUMBS = `${BASE}/thumbs`;

function slide(index: number, title?: string): DeckSlide {
  const n = String(index).padStart(2, "0");
  const label = title ?? `Slide ${String(index + 1).padStart(2, "0")}`;
  return {
    id: `slide-${n}`,
    title: label,
    src: `${BASE}/slide-${n}.webp`,
    thumbSrc: `${THUMBS}/slide-${n}.webp`,
    alt: `SoCal Realwave Training — ${label}`,
  };
}

export const SOCAL_REALWAVE_TRNG_DECK_SLIDES: readonly DeckSlide[] = [
  slide(0, "Cover"),
  slide(1),
  slide(2),
  slide(3),
  slide(4),
  slide(5),
  slide(6),
  slide(7),
  slide(8),
  slide(9),
  slide(10),
  slide(11),
  slide(12),
  slide(13),
  slide(14),
  slide(15),
  slide(16),
  slide(17),
  slide(18),
  slide(19),
  slide(20),
  slide(21),
  slide(22),
  slide(23),
  slide(24),
  slide(25),
  slide(26),
  slide(27),
  slide(28),
  slide(29),
  slide(30),
  slide(31),
  slide(32),
  slide(33),
];
