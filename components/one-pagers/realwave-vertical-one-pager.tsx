"use client";

import { OnePagerDocumentFrame } from "@/components/one-pagers/one-pager-document-frame";
import { OnePagerToolbar } from "@/components/one-pagers/one-pager-toolbar";
import type { VerticalOnePagerConfig } from "@/lib/one-pager/vertical-configs";
import {
  onePagerPdfAttrs,
  onePagerRoot,
  PDF_CLASSES,
  pdfOnly,
} from "@/lib/one-pager/theme";
import { cn } from "@/lib/utils";

type RealwaveVerticalOnePagerProps = {
  config: VerticalOnePagerConfig;
  pdfMode?: boolean;
  pdfClean?: boolean;
  /** Public route: keep Download PDF visible in browser PDF preview (`?pdf=1`). */
  showDownloadInPdfMode?: boolean;
};

/**
 * Shared vertical one-pager shell — same visual system as General / SLED.
 * Pass a vertical config for Retail, Transportation, Healthcare, Financial, etc.
 */
export function RealwaveVerticalOnePager({
  config,
  pdfMode = false,
  pdfClean = false,
  showDownloadInPdfMode = false,
}: RealwaveVerticalOnePagerProps) {
  return (
    <div
      {...onePagerPdfAttrs(pdfMode, pdfClean)}
      className={cn(
        pdfMode
          ? onePagerRoot(pdfMode, pdfClean)
          : "min-h-screen bg-slate-100 px-4 py-8 text-slate-900"
      )}
    >
      <OnePagerToolbar
        pdfSlug={config.slug}
        downloadFilename={config.downloadFilename}
        label={config.toolbarLabel}
        pdfMode={pdfMode}
        pdfClean={pdfClean}
        showDownloadInPdfMode={showDownloadInPdfMode}
      />

      <OnePagerDocumentFrame pdfMode={pdfMode} pdfClean={pdfClean} wide>
        <div
          className={cn(
            !pdfMode &&
              "onepager-container mx-auto max-w-[1100px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/60"
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden text-white",
              pdfOnly(pdfMode, PDF_CLASSES.hero)
            )}
          >
            <img
              src={config.heroImage}
              alt={config.heroAlt}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-center",
                pdfMode ? "opacity-40" : "opacity-50"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-[#0f172a]/85 to-[#12498a]/70" />
            <div className="relative px-8 pb-8 pt-9 sm:pb-10 sm:pt-11">
              <div className="mb-3 inline-flex items-center rounded-full bg-[#00d4a6]/10 px-3 py-1 text-xs tracking-[0.5px] text-[#00d4a6]">
                {config.heroEyebrow}
              </div>
              <h1 className="mb-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-1.5px] sm:text-5xl">
                {config.heroTitleLine1}
                <br />
                {config.heroTitleLine2}
              </h1>
              <p className="max-w-xl text-lg text-white/90 sm:text-xl">
                {config.heroSubhead}
              </p>
            </div>
          </div>

          <div className="bg-white px-8 pb-6 pt-7">
            <p className="max-w-4xl text-[15px] leading-relaxed text-slate-600">
              {config.introBefore}
              <span className="font-semibold text-slate-800">ePlus Realwave</span>
              {config.introAfter}
            </p>
          </div>

          <div className="h-1 bg-gradient-to-r from-[#12498a] to-[#00d4a6]" />

          <section
            className={cn(
              "bg-white px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              The Challenge
            </h2>
            <h3 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              {config.challengeTitle}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {config.challengePains.map((pain) => (
                <div
                  key={pain}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-snug text-slate-700"
                >
                  {pain}
                </div>
              ))}
            </div>
          </section>

          <section
            className={cn(
              "bg-slate-50 px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              The Realwave Difference
            </h2>
            <h3 className="mb-5 max-w-2xl text-2xl font-semibold tracking-tight text-slate-900">
              {config.differenceTitle}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {config.differentiators.map((item) => (
                <div
                  key={item.number}
                  className={cn(
                    "rounded-2xl border border-slate-200 bg-white p-5",
                    pdfOnly(pdfMode, PDF_CLASSES.card)
                  )}
                >
                  <div className="mb-2 flex items-baseline gap-3">
                    <span className="font-mono text-xs font-bold tracking-wider text-[#00d4a6]">
                      {item.number}
                    </span>
                    <h4 className="text-base font-semibold leading-tight text-slate-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            className={cn(
              "bg-white px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Key Capabilities
            </h2>
            <h3 className="mb-5 text-2xl font-semibold tracking-tight text-slate-900">
              {config.capabilitiesTitle}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {config.capabilities.map((item) => (
                <div
                  key={item.title}
                  className={cn(
                    "flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5",
                    pdfOnly(pdfMode, PDF_CLASSES.card)
                  )}
                >
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#12498a]" />
                  <div>
                    <h4 className="mb-1 font-semibold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            className={cn(
              "bg-[#0f172a] px-8 py-7 text-white",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#00d4a6]">
              Proven Results
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  98%
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {config.results98}
                </p>
              </div>
              <div>
                <div className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  50%
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {config.results50}
                </p>
              </div>
            </div>
          </section>

          <section
            className={cn(
              "bg-white px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Where It Works
            </h2>
            <h3 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">
              {config.whereTitle}
            </h3>
            <p className="mb-5 max-w-3xl text-[15px] leading-relaxed text-slate-600">
              {config.whereBody}
            </p>
            <div className="flex flex-wrap gap-2">
              {config.environments.map((env) => (
                <span
                  key={env}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {env}
                </span>
              ))}
            </div>
          </section>

          <section
            className={cn(
              "bg-slate-50 px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.tailGroup)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Why Realwave + ePlus
            </h2>
            <h3 className="mb-5 text-2xl font-semibold tracking-tight text-slate-900">
              {config.whyTitle}
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {config.whyCards.map((item) => (
                <div
                  key={item.title}
                  className={cn(
                    "rounded-2xl border border-slate-200 bg-white p-5",
                    pdfOnly(pdfMode, PDF_CLASSES.card)
                  )}
                >
                  <h4 className="mb-2 font-semibold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-slate-900 px-8 py-7 text-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  {config.ctaTitle}
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  Contact your Realwave SME for an initial conversation.
                </p>
              </div>
              <a
                href={`mailto:success@realwave.io?subject=${encodeURIComponent(config.ctaMailtoSubject)}`}
                className="no-print inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-inner transition hover:bg-slate-100"
              >
                Contact Your Realwave SME
              </a>
            </div>
          </section>

          <div
            className={cn(
              "flex items-center justify-between border-t border-slate-200 bg-white px-8 py-3 text-[10px] text-slate-400",
              pdfOnly(pdfMode, PDF_CLASSES.footer)
            )}
          >
            <div>
              ePlus Realwave • Where Technology Means More® • Confidential — For{" "}
              {config.footerAudience}
            </div>
            <div className="hidden font-mono text-[9px] tracking-widest sm:block">
              {config.footerCode}
            </div>
          </div>
        </div>
      </OnePagerDocumentFrame>

      {!pdfMode ? (
        <div className="mx-auto mt-4 max-w-[1100px] px-6 text-center">
          <p className="text-xs text-slate-500">
            <span className="font-medium">Pro tip:</span> Use Download PDF for a
            shareable copy, or open{" "}
            <span className="font-mono">?pdf=1</span> for a framed browser
            preview.
          </p>
        </div>
      ) : null}
    </div>
  );
}
