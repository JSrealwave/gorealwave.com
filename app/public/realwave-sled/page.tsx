import type { Metadata } from "next";
import { RealwaveSledOnePager } from "@/components/one-pagers/realwave-sled-one-pager";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "Securing SLED & Critical Infrastructure | Realwave",
  description:
    "ePlus Realwave Intelligent Video Surveillance powered by Everpure all-flash storage for SLED environments.",
};

export default async function PublicRealwaveSledPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string }>;
}) {
  const params = await searchParams;
  const pdfMode = isPdfMode(params);
  const pdfClean = isPdfCleanExport(params);

  return (
    <RealwaveSledOnePager
      pdfMode={pdfMode}
      pdfClean={pdfClean}
      showDownloadInPdfMode
    />
  );
}
