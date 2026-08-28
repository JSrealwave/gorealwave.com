import type { Metadata } from "next";
import { RealwaveSledVerticalOnePager } from "@/components/one-pagers/realwave-sled-vertical-one-pager";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "Realwave IVS for SLED & Critical Infrastructure | Realwave",
  description:
    "Intelligent Video Surveillance for State, Local, Education, and Defense — powered by ePlus Realwave.",
};

export default async function PublicRealwaveSledVerticalPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string }>;
}) {
  const params = await searchParams;
  const pdfMode = isPdfMode(params);
  const pdfClean = isPdfCleanExport(params);

  return (
    <RealwaveSledVerticalOnePager
      pdfMode={pdfMode}
      pdfClean={pdfClean}
      showDownloadInPdfMode
    />
  );
}
