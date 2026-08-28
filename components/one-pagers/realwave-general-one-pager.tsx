"use client";

import { OnePagerDocumentFrame } from "@/components/one-pagers/one-pager-document-frame";
import { OnePagerToolbar } from "@/components/one-pagers/one-pager-toolbar";
import {
  onePagerPdfAttrs,
  onePagerRoot,
  PDF_CLASSES,
  pdfOnly,
} from "@/lib/one-pager/theme";
import { cn } from "@/lib/utils";

const SLUG = "general" as const;

type RealwaveGeneralOnePagerProps = {
  pdfMode?: boolean;
  pdfClean?: boolean;
  /** Public route: keep Download PDF visible in browser PDF preview (`?pdf=1`). */
  showDownloadInPdfMode?: boolean;
};

const DIFFERENTIATORS = [
  {
    number: "01",
    title: "Unified, Open IVS Platform",
    body: "Best-in-class Intelligent Video Surveillance built on Network Optix — one open platform for live video, analytics, and operations.",
  },
  {
    number: "02",
    title: "Lightweight & Flexible at Scale",
    body: "Deploy at the edge, in the data center, or in the cloud — and scale without rip-and-replace or vendor lock-in.",
  },
  {
    number: "03",
    title: "Proven AI Analytics Library",
    body: "Object detection & tracking, behavior recognition, facial recognition, LPR, OCR, and weapon detection — tested and deployed on over 1.5 million channels.",
  },
  {
    number: "04",
    title: "AI Manager",
    body: "A universal, scalable analytics pipeline with cross-hardware support (Intel, AMD, ARM, NVIDIA Jetson, Hailo), remote OTA model updates, and real-time optimization.",
  },
  {
    number: "05",
    title: "Advanced Mapping & Tracking",
    body: "Built-in GIS mapping with GPS integration and real-time third-party object tracking for true operational awareness.",
  },
  {
    number: "06",
    title: "Fastest-Growing Integration Ecosystem",
    body: "45,000+ device support and open APIs — connect cameras, sensors, and systems without proprietary dead ends.",
  },
] as const;

const CAPABILITIES = [
  {
    title: "Real-Time Intelligence",
    body: "Turn camera feeds into verified alerts and actionable insights — not another wall of noise.",
  },
  {
    title: "Hybrid Architecture",
    body: "Run where it makes sense: edge appliances, servers, or cloud — with consistent management and performance.",
  },
  {
    title: "Open Integrations",
    body: "Open APIs and broad device support keep your stack flexible as requirements evolve.",
  },
  {
    title: "Field-Proven Scale",
    body: "Built for production environments — from single sites to multi-site enterprise and public-sector deployments.",
  },
] as const;

const VERTICALS = [
  "SLED",
  "Transportation",
  "Retail",
  "Healthcare",
  "Manufacturing",
  "Financial Services",
  "Critical Infrastructure",
  "Education",
] as const;

export function RealwaveGeneralOnePager({
  pdfMode = false,
  pdfClean = false,
  showDownloadInPdfMode = false,
}: RealwaveGeneralOnePagerProps) {
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
        pdfSlug={SLUG}
        downloadFilename="realwave-general-ivs.pdf"
        label="Intelligent Video Surveillance"
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
          {/* Hero */}
          <div
            className={cn(
              "relative overflow-hidden text-white",
              pdfOnly(pdfMode, PDF_CLASSES.hero)
            )}
          >
            <img
              src="/images/heroes/cloud-vms.webp"
              alt="Realwave Intelligent Video Surveillance – Unified Open Platform"
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-center",
                pdfMode ? "opacity-40" : "opacity-50"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-[#0f172a]/85 to-[#12498a]/70" />
            <div className="relative px-8 pb-8 pt-9 sm:pb-10 sm:pt-11">
              <div className="mb-3 inline-flex items-center rounded-full bg-[#00d4a6]/10 px-3 py-1 text-xs tracking-[0.5px] text-[#00d4a6]">
                PLATFORM OVERVIEW
              </div>
              <h1 className="mb-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-1.5px] sm:text-5xl">
                Intelligent Video Surveillance
                <br />
                Built for the Real World
              </h1>
              <p className="max-w-xl text-lg text-white/90 sm:text-xl">
                A modern, open, AI-powered IVS platform from ePlus Realwave —
                designed for performance, flexibility, and results you can
                measure.
              </p>
            </div>
          </div>

          {/* Intro */}
          <div className="bg-white px-8 pb-6 pt-7">
            <p className="max-w-4xl text-[15px] leading-relaxed text-slate-600">
              Organizations are drowning in video — and starving for answers.
              Legacy VMS stacks create alert fatigue, slow investigations, and
              expensive lock-in.{" "}
              <span className="font-semibold text-slate-800">
                ePlus Realwave
              </span>{" "}
              delivers a unified Intelligent Video Surveillance platform that
              turns cameras into real-time intelligence — open, scalable, and
              ready for production AI.
            </p>
          </div>

          <div className="h-1 bg-gradient-to-r from-[#12498a] to-[#00d4a6]" />

          {/* The Challenge */}
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
              Video without intelligence is just storage cost
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "High false-alarm rates that burn operator time",
                "Slow, manual investigations across siloed systems",
                "Vendor lock-in that blocks modernization",
                "Difficulty deploying and scaling AI consistently",
                "Fragmented tools with no single pane of glass",
                "Infrastructure that can’t keep up with video growth",
              ].map((pain) => (
                <div
                  key={pain}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-snug text-slate-700"
                >
                  {pain}
                </div>
              ))}
            </div>
          </section>

          {/* The Realwave Difference */}
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
              One open platform. Proven AI. Real operational impact.
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {DIFFERENTIATORS.map((item) => (
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

          {/* Key Capabilities */}
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
              Performance, flexibility, and field readiness
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {CAPABILITIES.map((item) => (
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

          {/* Proven Results */}
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
                  Reduction in false alarms via video verification — so teams
                  respond to what matters.
                </p>
              </div>
              <div>
                <div className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  50%
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Faster response time — from alert to action with verified,
                  actionable intelligence.
                </p>
              </div>
            </div>
          </section>

          {/* Where It Works */}
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
              Built for every high-stakes environment
            </h3>
            <p className="mb-5 max-w-3xl text-[15px] leading-relaxed text-slate-600">
              Realwave supports the verticals that depend on video every day.
              Dedicated vertical one-pagers go deeper — this overview keeps the
              platform story clear and transferable.
            </p>
            <div className="flex flex-wrap gap-2">
              {VERTICALS.map((vertical) => (
                <span
                  key={vertical}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {vertical}
                </span>
              ))}
            </div>
          </section>

          {/* Why Realwave + ePlus */}
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
              Credibility, support, and single-source accountability
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Trusted Delivery",
                  body: "ePlus brings enterprise infrastructure expertise — so video intelligence lands on a foundation that performs.",
                },
                {
                  title: "Hybrid Flexibility",
                  body: "Design the right mix of edge, on-prem, and cloud for each site — without painting yourself into a corner.",
                },
                {
                  title: "One Throat to Choke",
                  body: "Platform, integrations, and support under one accountable partner — from first conversation to ongoing operations.",
                },
              ].map((item) => (
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

          {/* CTA */}
          <section className="bg-slate-900 px-8 py-7 text-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Ready to modernize your video operations?
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  Contact your Realwave SME for an initial conversation.
                </p>
              </div>
              <a
                href="mailto:success@realwave.io?subject=Realwave%20IVS%20Platform%20Conversation"
                className="no-print inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-inner transition hover:bg-slate-100"
              >
                Contact Your Realwave SME
              </a>
            </div>
          </section>

          {/* Footer */}
          <div
            className={cn(
              "flex items-center justify-between border-t border-slate-200 bg-white px-8 py-3 text-[10px] text-slate-400",
              pdfOnly(pdfMode, PDF_CLASSES.footer)
            )}
          >
            <div>
              ePlus Realwave • Where Technology Means More® • Confidential — For
              Partners &amp; Prospects
            </div>
            <div className="hidden font-mono text-[9px] tracking-widest sm:block">
              GENERAL • IVS PLATFORM
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
