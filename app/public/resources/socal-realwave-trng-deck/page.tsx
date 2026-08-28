import type { Metadata } from "next";
import { SocalRealwaveTrngDeck } from "@/components/one-pagers/socal-realwave-trng-deck";
import { isPdfCleanExport, isPdfMode } from "@/lib/one-pager/pdf-mode";

export const metadata: Metadata = {
  title: "SoCal Realwave Training Deck | Realwave",
  description:
    "Interactive SoCal Realwave training deck with thumbnail navigation for partner enablement sessions.",
};

export default async function PublicSocalRealwaveTrngDeckPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string; clean?: string; slide?: string }>;
}) {
  const params = await searchParams;
  const slideRaw = params.slide ? Number.parseInt(params.slide, 10) : null;

  return (
    <SocalRealwaveTrngDeck
      pdfMode={isPdfMode(params)}
      pdfClean={isPdfCleanExport(params)}
      showDownloadInPdfMode
      initialSlide={Number.isFinite(slideRaw) ? slideRaw : null}
    />
  );
}
