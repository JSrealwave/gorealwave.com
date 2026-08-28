import type { Metadata } from "next";
import { RealwaveVerticalOnePager } from "@/components/one-pagers/realwave-vertical-one-pager";
import { FINANCIAL_VERTICAL } from "@/lib/one-pager/vertical-configs";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "Realwave IVS for Financial Services | Realwave",
  description:
    "Intelligent Video Surveillance for financial services — branches, ATMs, and operations powered by ePlus Realwave.",
};

export default async function PublicFinancialOnePagerPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string }>;
}) {
  const params = await searchParams;

  return (
    <RealwaveVerticalOnePager
      config={FINANCIAL_VERTICAL}
      pdfMode={isPdfMode(params)}
      pdfClean={isPdfCleanExport(params)}
      showDownloadInPdfMode
    />
  );
}
