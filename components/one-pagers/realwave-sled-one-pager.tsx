"use client";

import { OnePagerDocumentFrame } from "@/components/one-pagers/one-pager-document-frame";
import { getPdfDownloadUrl } from "@/lib/pdf/one-pager-registry";
import { onePagerPdfAttrs, onePagerRoot } from "@/lib/one-pager/theme";
import { cn } from "@/lib/utils";

const SLUG = "realwave-sled" as const;

type RealwaveSledOnePagerProps = {
  pdfMode?: boolean;
  pdfClean?: boolean;
  /** Public route: keep Download PDF visible in browser PDF preview (`?pdf=1`). */
  showDownloadInPdfMode?: boolean;
};

export function RealwaveSledOnePager({
  pdfMode = false,
  pdfClean = false,
  showDownloadInPdfMode = false,
}: RealwaveSledOnePagerProps) {
  const downloadAsPDF = async () => {
    try {
      const response = await fetch(getPdfDownloadUrl(SLUG));
      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "realwave-sled.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const showDownloadButton =
    !pdfClean && (!pdfMode || showDownloadInPdfMode);

  return (
    <div
      {...onePagerPdfAttrs(pdfMode, pdfClean)}
      className={cn(
        pdfMode ? onePagerRoot(pdfMode, pdfClean) : "min-h-screen bg-slate-100 py-8 px-4 text-slate-900"
      )}
    >
      {showDownloadButton ? (
        <div className="max-w-[1100px] mx-auto mb-4 px-6">
          <div
            className={cn(
              "flex items-center",
              pdfMode ? "justify-end" : "justify-between"
            )}
          >
            {!pdfMode ? (
              <div className="flex items-center gap-x-3">
                <div className="flex items-center gap-x-2">
                  <div className="w-9 h-9 bg-[#12498a] rounded-xl flex items-center justify-center shadow-inner">
                    <span className="text-white font-bold text-xl tracking-tighter">e+</span>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-semibold tracking-tighter text-slate-900">
                      Realwave
                    </div>
                    <div className="text-[10px] text-slate-500 -mt-1">by ePlus</div>
                  </div>
                </div>
                <div className="hidden sm:block text-xs px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 font-medium">
                  Powered by <span className="font-semibold text-[#00d4a6]">Everpure</span>
                </div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={downloadAsPDF}
              className="no-print flex items-center gap-x-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 transition-all rounded-2xl text-sm font-semibold text-slate-700 shadow-sm active:scale-[0.985]"
            >
              <i className="fa-solid fa-file-pdf text-[#12498a]" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      ) : null}

      <OnePagerDocumentFrame pdfMode={pdfMode} pdfClean={pdfClean} wide>
        <div
          className={cn(
            !pdfMode &&
              "onepager-container mx-auto max-w-[1100px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/60"
          )}
        >
        <div
          className={`hero-gradient px-8 pt-9 pb-8 text-white relative ${pdfMode ? "bg-[#0f172a]" : "bg-gradient-to-br from-[#0f172a] to-[#1e2937]"}`}
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-x-2 mb-3">
              <div className="stat-pill px-3 py-1 text-xs tracking-[0.5px] bg-[#00d4a6]/10 text-[#00d4a6] rounded-full">
                SLED 2026 CAMPAIGN
              </div>
              <div className="text-xs text-white/50">•</div>
              <div className="text-xs text-white/60">June 2026</div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-[-1.5px] font-semibold mb-4">
              Securing SLED &amp;
              <br />
              Critical Infrastructure
            </h1>

            <p className="text-xl text-white/90 max-w-md">
              ePlus Realwave Intelligent Video Surveillance
              <br />
              <span className="font-medium">Powered by Everpure All-Flash Storage</span>
            </p>
          </div>
        </div>

        <div className="px-8 pt-7 pb-6 bg-white">
          <p className="text-[15px] leading-relaxed text-slate-600 max-w-4xl">
            SLED organizations are no longer just physical sites — they are complex
            digital-physical ecosystems. From port perimeters and law enforcement
            operations to airport terminals and university campuses, every camera feed
            is a strategic asset.{" "}
            <span className="font-semibold text-slate-800">ePlus Realwave</span>, powered
            by <span className="font-semibold text-[#00d4a6]">Everpure all-flash storage</span>
            , delivers a unified Intelligent Video Surveillance (IVS) platform that turns
            passive cameras into real-time intelligence engines — secure, ultra-fast, and
            always on.
          </p>
        </div>

        <div className="accent-bar h-1 bg-gradient-to-r from-[#12498a] to-[#00d4a6]" />

        <div className="px-8 py-7 grid grid-cols-1 lg:grid-cols-3 gap-5 bg-slate-50">
          <div className="feature-card bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="uppercase tracking-[1px] text-xs font-bold text-[#12498a]">
                  PERIMETER &amp; PUBLIC SAFETY
                </div>
                <div className="font-semibold text-lg leading-tight mt-1 text-slate-900">
                  Port of Long Beach
                  <br />
                  &amp; Orange County Sheriff
                </div>
              </div>
              <i className="fa-solid fa-shield-halved text-2xl text-[#12498a]/70 mt-1" />
            </div>
            <div className="flex-1 text-sm text-slate-600 space-y-3">
              <p className="leading-snug">
                Leveraging Realwave’s proven AI analytics already trusted in these accounts.
              </p>
              <ul className="space-y-1.5 text-xs">
                <li className="flex gap-2">
                  <span className="text-[#00d4a6] mt-px">•</span>{" "}
                  <span>
                    <strong>RealTrack AI + RealEdge 3D LiDAR</strong> — accurate perimeter
                    intrusion, loitering &amp; unauthorized access detection with 98%
                    false-alarm reduction.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00d4a6] mt-px">•</span>{" "}
                  <span>
                    <strong>RealPlate global LPR/OCR</strong> — vehicle, container &amp;
                    trailer ID verification at high speeds.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00d4a6] mt-px">•</span>{" "}
                  <span>
                    <strong>RealInsights forensic search</strong> — sub-second metadata
                    queries across video, access logs &amp; events.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <i className="fa-solid fa-check-circle" />{" "}
              <span>Already active in target accounts</span>
            </div>
          </div>

          <div className="feature-card bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="uppercase tracking-[1px] text-xs font-bold text-[#12498a]">
                  OPERATIONAL RESILIENCE
                </div>
                <div className="font-semibold text-lg leading-tight mt-1 text-slate-900">
                  John Wayne Airport (SNA)
                </div>
              </div>
              <i className="fa-solid fa-plane text-2xl text-[#12498a]/70 mt-1" />
            </div>
            <div className="flex-1 text-sm text-slate-600 space-y-3">
              <p className="leading-snug">
                Behind-the-scenes reliability and advanced infrastructure management for
                high-traffic critical facilities.
              </p>
              <ul className="space-y-1.5 text-xs">
                <li className="flex gap-2">
                  <span className="text-[#00d4a6] mt-px">•</span>{" "}
                  <span>
                    <strong>RealVue VMS + RealTrack behavior analysis</strong> — real-time
                    crowd flow, queue management &amp; emergency coordination.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00d4a6] mt-px">•</span>{" "}
                  <span>
                    <strong>Remote monitoring with AI-verified alerts</strong> — 24/7
                    managed services via SMS/email/API from ePlus.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00d4a6] mt-px">•</span>{" "}
                  <span>
                    <strong>Unified integrations</strong> — access control, gunshot
                    detection &amp; EMNS for single-pane command.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <i className="fa-solid fa-check-circle" />{" "}
              <span>Proven in complex airport environments</span>
            </div>
          </div>

          <div className="feature-card bg-white border border-slate-200 rounded-2xl p-5 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="uppercase tracking-[1px] text-xs font-bold text-[#12498a]">
                  CAMPUS SAFETY &amp; COMPLIANCE
                </div>
                <div className="font-semibold text-lg leading-tight mt-1 text-slate-900">
                  UC Irvine
                </div>
              </div>
              <i className="fa-solid fa-graduation-cap text-2xl text-[#12498a]/70 mt-1" />
            </div>
            <div className="flex-1 text-sm text-slate-600 space-y-3">
              <p className="leading-snug">
                Secure, privacy-first intelligence for students, staff, and facilities in
                higher education.
              </p>
              <ul className="space-y-1.5 text-xs">
                <li className="flex gap-2">
                  <span className="text-[#00d4a6] mt-px">•</span>{" "}
                  <span>
                    <strong>RealFace + RealTrack</strong> — privacy-preserving access
                    control, PPE compliance &amp; aggression/fall detection.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00d4a6] mt-px">•</span>{" "}
                  <span>
                    <strong>Smart-space occupancy analytics</strong> — digital-twin mapping
                    for efficient resource allocation &amp; emergency response.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00d4a6] mt-px">•</span>{" "}
                  <span>
                    <strong>Compliance-ready</strong> — HIPAA / Title IX / FOIA audit
                    trails with automated redaction.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <i className="fa-solid fa-check-circle" />{" "}
              <span>Built for regulated education environments</span>
            </div>
          </div>
        </div>

        <div className="mx-8 my-6 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <div className="flex items-center gap-x-2 mb-1">
                <i className="fa-solid fa-bolt-lightning text-[#00d4a6]" />
                <div className="uppercase text-xs tracking-[1.5px] font-bold text-[#00d4a6]">
                  HIGH-SPEED DIGITAL VIDEO ENVIRONMENT
                </div>
              </div>
              <div className="font-semibold text-xl tracking-tight">
                Powered by Everpure All-Flash Storage
              </div>
              <div className="mt-3 text-sm text-white/80 max-w-prose">
                Traditional storage creates latency bottlenecks for AI analytics and forensic
                investigations.{" "}
                <span className="font-medium text-white">
                  Everpure all-flash, GB-connected storage
                </span>{" "}
                delivers instant video retrieval (GB/s throughput), AI-ready performance, and
                nondisruptive scaling — already deployed in your accounts.
              </div>
            </div>
            <div className="md:w-56 flex-shrink-0 bg-white/5 border border-white/10 rounded-xl p-4 text-xs">
              <div className="font-mono text-[10px] text-white/50 mb-1">KEY OUTCOMES</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Video retrieval</span>{" "}
                  <span className="font-semibold text-emerald-400">Instant</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">AI inference latency</span>{" "}
                  <span className="font-semibold text-emerald-400">Sub-10ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">TCO impact</span>{" "}
                  <span className="font-semibold text-emerald-400">-35% typical</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
          <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-3 px-1">
            WHY ePLUS REALWAVE + EVERPURE WINS FOR SLED
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              {
                icon: "fa-microchip",
                title: "Lightweight Hybrid Stack",
                desc: "Edge / serverless / cloud. 45,000+ device support. No rip-and-replace.",
              },
              {
                icon: "fa-brain",
                title: "Proven AI Library",
                desc: "Object tracking, facial/LPR, behavior analytics. 1.5M+ channels deployed.",
              },
              {
                icon: "fa-handshake",
                title: "ePlus Managed Services",
                desc: "24/7 monitoring, integration, optimization. Single-source accountability.",
              },
              {
                icon: "fa-chart-line",
                title: "Everpure Performance",
                desc: "All-flash speed for real-time AI + forensics. Already in your environment.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-3 items-start">
                <i className={`fa-solid ${item.icon} text-[#12498a] mt-0.5`} />
                <div>
                  <div className="font-semibold text-sm">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 px-8 py-6 text-white flex flex-col sm:flex-row items-center justify-between gap-y-4">
          <div>
            <div className="font-semibold tracking-tight">
              Ready to turn your cameras into real-time intelligence?
            </div>
            <div className="text-sm text-white/70">
              Joint ePlus + Everpure demo tailored to your SLED environment.
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="mailto:success@realwave.io?subject=SLED%20IVS%20Demo%20Request"
              className="no-print inline-flex items-center justify-center gap-x-2 px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 active:bg-white transition font-semibold rounded-2xl text-sm shadow-inner"
            >
              <i className="fa-solid fa-calendar-check" /> <span>Request Demo</span>
            </a>
            <a
              href="https://www.realwave.io"
              target="_blank"
              rel="noreferrer"
              className="no-print inline-flex items-center justify-center gap-x-2 px-5 py-3 border border-white/30 hover:bg-white/10 transition font-medium rounded-2xl text-sm"
            >
              <span>realwave.io</span>
            </a>
          </div>
        </div>

        <div className="px-8 py-3 bg-white border-t text-[10px] text-slate-400 flex items-center justify-between text-center sm:text-left">
          <div>
            ePlus Realwave • Where Technology Means More® • Confidential — For SLED Partners
            &amp; Prospects
          </div>
          <div className="hidden sm:block font-mono text-[9px] tracking-widest">
            v1.0 • JUN 2026
          </div>
        </div>
        </div>
      </OnePagerDocumentFrame>

      {!pdfMode ? (
        <div className="max-w-[1100px] mx-auto mt-4 px-6 text-center">
          <p className="text-xs text-slate-500">
            <span className="font-medium">Pro tip:</span> Open this page in Chrome or Edge →
            Click “Download PDF” → Enable “Background graphics” → Save as PDF.
          </p>
        </div>
      ) : null}
    </div>
  );
}
