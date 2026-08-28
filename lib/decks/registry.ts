import type { ContentItem } from "@/lib/content";
import type { DeckSlide } from "@/lib/decks/types";
import { EPLUS_REALWAVE_INTRO_SLIDES } from "@/lib/one-pager/eplus-realwave-intro-slides";
import { EPLUS_REALWAVE_JH_SLIDES } from "@/lib/one-pager/eplus-realwave-jh-slides";
import { SOCAL_REALWAVE_TRNG_DECK_SLIDES } from "@/lib/one-pager/socal-realwave-trng-deck-slides";

/** Maps Library Deck content IDs (or slugs) to slide manifests. */
const DECK_SLIDES_BY_ID: Record<string, readonly DeckSlide[]> = {
  "realwave-intro-deck": EPLUS_REALWAVE_INTRO_SLIDES,
  "socal-realwave-trng-deck": SOCAL_REALWAVE_TRNG_DECK_SLIDES,
  "deck-jh-8-3": EPLUS_REALWAVE_JH_SLIDES,
  "eplus-realwave-jh": EPLUS_REALWAVE_JH_SLIDES,
};

export function getDeckSlides(
  item: ContentItem
): readonly DeckSlide[] | undefined {
  if (item.type !== "Decks") return undefined;
  return DECK_SLIDES_BY_ID[item.id] ?? DECK_SLIDES_BY_ID[item.slug];
}
