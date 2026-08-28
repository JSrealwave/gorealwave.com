import type { Metadata } from "next";
import { RealwaveVerticalOnePager } from "@/components/one-pagers/realwave-vertical-one-pager";
import { TRANSPORTATION_VERTICAL } from "@/lib/one-pager/vertical-configs";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "Realwave IVS for Transportation & Logistics | Realwave",
  description:
    "Intelligent Video Surveillance for transportation and logistics — yards, docks, fleets, and cargo integrity powered by ePlus Realwave.",
};

export default async function PublicTransportationOnePagerPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string }>;
}) {
  const params = await searchParams;

  return (
    <RealwaveVerticalOnePager
      config={TRANSPORTATION_VERTICAL}
      pdfMode={isPdfMode(params)}
      pdfClean={isPdfCleanExport(params)}
      showDownloadInPdfMode
    />
  );
}
