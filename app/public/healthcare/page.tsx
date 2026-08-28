import type { Metadata } from "next";
import { RealwaveVerticalOnePager } from "@/components/one-pagers/realwave-vertical-one-pager";
import { HEALTHCARE_VERTICAL } from "@/lib/one-pager/vertical-configs";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "Realwave IVS for Healthcare | Realwave",
  description:
    "Intelligent Video Surveillance for healthcare — patient safety, compliance, and operations powered by ePlus Realwave.",
};

export default async function PublicHealthcareOnePagerPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string }>;
}) {
  const params = await searchParams;

  return (
    <RealwaveVerticalOnePager
      config={HEALTHCARE_VERTICAL}
      pdfMode={isPdfMode(params)}
      pdfClean={isPdfCleanExport(params)}
      showDownloadInPdfMode
    />
  );
}
