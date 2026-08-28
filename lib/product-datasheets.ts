import type { RealwaveProduct } from "@/types/products";

export type ProductDatasheet = {
  title: string;
  url: string;
};

const IQ_DATASHEET: ProductDatasheet = {
  title: "RealIntelligence (IQ) Datasheet",
  url: "/datasheets/realintelligence-iq.pdf",
};

const DATASHEETS_BY_PART: Record<string, ProductDatasheet[]> = {
  "REX-AI5-360": [
    { title: "REX-Ai5-360 Datasheet", url: "/datasheets/rex-ai5-360.pdf" },
  ],
  "REX-AI5-FD": [
    { title: "REX-Ai5-FD Datasheet", url: "/datasheets/rex-ai5-fd.pdf" },
  ],
  // Catalog SKU is the 8MP bullet; this is the 5MP bullet datasheet on file.
  "REX-AI8-MB": [
    { title: "REX-Ai5-MB Datasheet", url: "/datasheets/rex-ai5-mb.pdf" },
  ],
  RealVue: [
    { title: "RealVue Datasheet", url: "/datasheets/realvue.pdf" },
  ],
  "RealIQ-OT": [IQ_DATASHEET],
  "RealIQ-LPR": [IQ_DATASHEET],
  "RealIQ-FR": [IQ_DATASHEET],
  "RealIQ-FS": [IQ_DATASHEET],
};

export function getProductDatasheets(
  product: RealwaveProduct
): ProductDatasheet[] {
  return DATASHEETS_BY_PART[product.partNumber] ?? [];
}
