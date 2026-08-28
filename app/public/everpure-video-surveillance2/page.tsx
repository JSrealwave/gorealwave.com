import type { Metadata } from "next";
import { EverpureRichOnePager } from "@/components/one-pagers/everpure-rich-one-pager";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "Everpure Video Surveillance for SLED (Rich Media) | Realwave",
  description:
    "High-performance storage, AI analytics, and resilient infrastructure for SLED video surveillance.",
};

export default async function PublicEverpureVideoSurveillanceRichPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string }>;
}) {
  const params = await searchParams;
  const pdfMode = isPdfMode(params);
  const pdfClean = isPdfCleanExport(params);

  return <EverpureRichOnePager pdfMode={pdfMode} pdfClean={pdfClean} />;
}
