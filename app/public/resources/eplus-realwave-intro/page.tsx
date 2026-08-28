import type { Metadata } from "next";
import { EplusRealwaveIntro } from "@/components/one-pagers/eplus-realwave-intro";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "Realwave Introduction Deck | Realwave",
  description:
    "Interactive Realwave introduction deck with thumbnail navigation for sales enablement and customer conversations.",
};

export default async function PublicEplusRealwaveIntroPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string; slide?: string }>;
}) {
  const params = await searchParams;
  const slideRaw = params.slide ? Number.parseInt(params.slide, 10) : null;

  return (
    <EplusRealwaveIntro
      pdfMode={isPdfMode(params)}
      pdfClean={isPdfCleanExport(params)}
      showDownloadInPdfMode
      initialSlide={Number.isFinite(slideRaw) ? slideRaw : null}
    />
  );
}
