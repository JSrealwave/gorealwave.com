import type { Metadata } from "next";
import { RealwaveGeneralOnePager } from "@/components/one-pagers/realwave-general-one-pager";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "Realwave Intelligent Video Surveillance | Realwave",
  description:
    "A modern, open, AI-powered Intelligent Video Surveillance platform from ePlus Realwave — built for real-world performance.",
};

export default async function PublicRealwaveGeneralPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string }>;
}) {
  const params = await searchParams;
  const pdfMode = isPdfMode(params);
  const pdfClean = isPdfCleanExport(params);

  return (
    <RealwaveGeneralOnePager
      pdfMode={pdfMode}
      pdfClean={pdfClean}
      showDownloadInPdfMode
    />
  );
}
