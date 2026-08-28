import type { Metadata } from "next";
import { RealwaveVerticalOnePager } from "@/components/one-pagers/realwave-vertical-one-pager";
import { RETAIL_VERTICAL } from "@/lib/one-pager/vertical-configs";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "Realwave IVS for Retail | Realwave",
  description:
    "Intelligent Video Surveillance for retail — loss prevention, operations, and customer experience powered by ePlus Realwave.",
};

export default async function PublicRetailOnePagerPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string }>;
}) {
  const params = await searchParams;

  return (
    <RealwaveVerticalOnePager
      config={RETAIL_VERTICAL}
      pdfMode={isPdfMode(params)}
      pdfClean={isPdfCleanExport(params)}
      showDownloadInPdfMode
    />
  );
}
