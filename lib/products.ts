import productsData from "@/data/realwave-products.json";
import type { RealwaveProduct } from "@/types/products";

export const products = productsData as RealwaveProduct[];

export const PRODUCT_CATEGORIES = [
  "All",
  ...Array.from(new Set(products.map((product) => product.category))),
] as const;

export type ProductCategoryFilter = (typeof PRODUCT_CATEGORIES)[number];

export function getProductByPartNumber(
  partNumber: string
): RealwaveProduct | undefined {
  return products.find((product) => product.partNumber === partNumber);
}

export function formatUsd(amount: number): string {
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatQuoteText(items: RealwaveProduct[]): string {
  const lines = items.map((item) => {
    const notes = item.notes ? `\nNotes: ${item.notes}` : "";
    return `${item.partNumber} — ${item.name}\nePlus: ${formatUsd(item.eplusPrice)} / ${item.unit} | MSRP: ${item.msrp > 0 ? formatUsd(item.msrp) : "—"}${notes}`;
  });

  return [
    "Realwave Quote Request",
    `Generated: ${new Date().toLocaleDateString("en-US")}`,
    "",
    lines.join("\n\n"),
    "",
    "Requested by: [Your Name / Team]",
    "",
    "Please prepare a formal quote or TCO for the items above.",
  ].join("\n");
}
