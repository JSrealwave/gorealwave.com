import type { Metadata } from "next";
import { EverpureStandardOnePager } from "@/components/one-pagers/everpure-standard-one-pager";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "Everpure Video Surveillance for SLED | Realwave",
  description:
    "Purpose-built storage and analytics for public safety video workloads with Everpure + Realwave.",
};

export default async function PublicEverpureVideoSurveillancePage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string }>;
}) {
  const params = await searchParams;
  const pdfMode = isPdfMode(params);
  const pdfClean = isPdfCleanExport(params);

  return <EverpureStandardOnePager pdfMode={pdfMode} pdfClean={pdfClean} />;
}
