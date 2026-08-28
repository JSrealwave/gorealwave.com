import type { Metadata } from "next";
import { IvsMarketOverview } from "@/components/one-pagers/ivs-market-overview";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "IVS Market Overview & Trends | Realwave",
  description:
    "Intelligent Video Surveillance – 2026 market perspective for sales enablement and customer conversations.",
};

export default async function PublicIvsMarketOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string }>;
}) {
  const params = await searchParams;

  return (
    <IvsMarketOverview
      pdfMode={isPdfMode(params)}
      pdfClean={isPdfCleanExport(params)}
      showDownloadInPdfMode
    />
  );
}
