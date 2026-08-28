import {
  contentItems,
  getHighlightItem,
  type ContentItem,
} from "@/lib/content";

export function getWeekOfLabel(date = new Date()): string {
  const current = new Date(date);
  const day = current.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  current.setDate(current.getDate() + mondayOffset);
  return current.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getFeaturedBriefAssets(limit = 6): ContentItem[] {
  const highlight = getHighlightItem();
  return contentItems
    .filter((item) => item.id !== highlight.id)
    .filter((item) => item.publicUrl || item.type === "Market Brief")
    .slice(0, limit);
}

export function buildBriefText({
  audience,
  focus,
  highlight,
  featured,
  weekOf,
}: {
  audience: string;
  focus: string;
  highlight: ContentItem;
  featured: ContentItem[];
  weekOf: string;
}): string {
  const featuredLines = featured
    .map((item) => {
      const link = item.publicUrl ?? `/library?asset=${item.id}`;
      return `• ${item.title}\n  ${item.description}\n  ${link}`;
    })
    .join("\n\n");

  const talkingPoints = highlight.highlights
    .map((point) => `• ${point}`)
    .join("\n");

  return [
    "REALWAVE WEEKLY BRIEF",
    `Week of ${weekOf}`,
    `Audience: ${audience}`,
    `Focus: ${focus}`,
    "",
    "THIS WEEK'S HIGHLIGHT",
    highlight.title,
    highlight.keyMessage,
    "",
    "TALKING POINTS",
    talkingPoints,
    "",
    "FEATURED ASSETS",
    featuredLines,
    "",
    "SUGGESTED NEXT STEPS",
    "• Share this week's highlight with open opportunities",
    "• Pull SKUs and ePlus pricing from the product catalog for active quotes",
    "• Download PDFs from the library before customer meetings",
    "",
    "— Realwave Enablement Hub",
  ].join("\n");
}
