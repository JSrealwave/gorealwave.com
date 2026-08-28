"use client";

import { FileText } from "lucide-react";
import { getPdfDownloadUrl } from "@/lib/pdf/one-pager-registry";

type OnePagerToolbarProps = {
  /** Registry slug for `/api/pdf/[slug]`. */
  pdfSlug: string;
  /** Suggested download filename. */
  downloadFilename: string;
  /** Label pill on the left (same in normal view and `?pdf=1`). */
  label: string;
  pdfMode?: boolean;
  pdfClean?: boolean;
  /** When true, show toolbar in browser PDF preview (`?pdf=1`). */
  showDownloadInPdfMode?: boolean;
};

/**
 * Shared one-pager chrome above the document frame.
 * Same treatment in normal view and `?pdf=1`:
 * - Left: label pill
 * - Right: Download PDF
 * Hidden for `?pdf=1&clean=1` (Playwright export).
 * No e+/Realwave branding.
 */
export function OnePagerToolbar({
  pdfSlug,
  downloadFilename,
  label,
  pdfMode = false,
  pdfClean = false,
  showDownloadInPdfMode = false,
}: OnePagerToolbarProps) {
  const showToolbar = !pdfClean && (!pdfMode || showDownloadInPdfMode);

  if (!showToolbar) {
    return null;
  }

  const downloadAsPDF = async () => {
    try {
      const response = await fetch(getPdfDownloadUrl(pdfSlug));
      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="mx-auto mb-4 max-w-[1100px] px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold tracking-[0.5px] text-slate-700 shadow-sm">
          {label}
        </div>

        <button
          type="button"
          onClick={downloadAsPDF}
          className="no-print flex items-center gap-x-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.985]"
        >
          <FileText className="h-4 w-4 text-[#12498a]" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>
    </div>
  );
}
