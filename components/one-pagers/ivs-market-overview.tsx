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

const SLUG = "ivs-market-overview" as const;

type IvsMarketOverviewProps = {
  pdfMode?: boolean;
  pdfClean?: boolean;
  showDownloadInPdfMode?: boolean;
};

const MARKET_SIZE = [
  {
    label: "Overall market (2025)",
    value: "$83–84B",
    detail: "Hardware + software + services",
  },
  {
    label: "By 2028",
    value: "$100B+",
    detail: "Projected overall market",
  },
  {
    label: "By 2030–2034",
    value: "$140–160B+",
    detail: "Grand View, Fortune, Precedence",
  },
  {
    label: "AI segment CAGR",
    value: "21–30.6%",
    detail: "Fastest-growing IVS layer",
  },
] as const;

const TRENDS = [
  {
    title: "Intelligent Edge & Hybrid AI",
    body: "Processing is rapidly moving to the camera edge. On-device analytics reduce bandwidth, storage costs, and latency while improving privacy and enabling real-time decisioning.",
  },
  {
    title: "AI Model Management",
    body: "Growing demand for platforms that can deploy, monitor, update, and optimize AI models across mixed hardware environments (Intel, AMD, ARM, NVIDIA Jetson, Hailo, etc.) with remote OTA updates.",
  },
  {
    title: "False Alarm Reduction & Video Verification",
    body: "Modern AI video verification consistently achieves 70–95%+ reduction in false alarms. Traditional motion detection still generates ~97% false positives in many environments.",
  },
  {
    title: "Video-Verified / Remote Video Monitoring (RVM)",
    body: "Becoming a standard requirement for enterprise and SLED customers seeking reliable, cost-effective monitoring without constant on-site guards.",
  },
  {
    title: "PhySec + InfoSec Convergence",
    body: "Video surveillance is increasingly owned and budgeted by IT/CISO teams rather than facilities, accelerating the shift toward managed service providers.",
  },
  {
    title: "Privacy-Preserving Analytics",
    body: "On-camera redaction and privacy-by-design are becoming table stakes, especially in education, healthcare, government, and regulated industries.",
  },
  {
    title: "Operational Intelligence",
    body: "Video is being used for business outcomes (safety compliance, process optimization, customer experience) in addition to security.",
  },
] as const;

const DRIVERS = [
  "Rising security threats and regulatory compliance requirements",
  "Labor shortages and high cost of manned guarding",
  "Need for faster, more reliable incident response and reduced alert fatigue",
  "Desire to monetize existing camera investments through operational insights",
  "Cloud repatriation and data sovereignty concerns pushing hybrid models",
] as const;

const CHALLENGES = [
  "Alert fatigue from legacy motion-based systems",
  "Complexity of deploying and managing AI across heterogeneous hardware",
  "Data privacy, sovereignty, and compliance requirements",
  "Integration with legacy infrastructure and third-party systems",
] as const;

const OPPORTUNITIES = [
  "Strong core VMS/media engine performance across edge, server, and cloud",
  "A universal, hardware-agnostic AI pipeline with easy model deployment and remote OTA updates",
  "Deep integration capabilities (45,000+ devices supported) and open APIs",
  "Proven analytics that deliver measurable ROI (false alarm reduction, faster response times, operational efficiency)",
] as const;

const TALKING_POINTS = [
  "The market is moving from cameras that record to cameras that understand and act.",
  "AI is no longer optional — but managing AI models across mixed hardware environments is still painful for most organizations.",
  "We reduce false alarms by up to 98% and improve response time by ~50%, while giving you full flexibility on hardware, deployment model, and AI model management.",
  "Open architecture + universal AI Manager means you’re not locked into one vendor’s ecosystem as your needs and technology evolve.",
] as const;

const SOURCES = [
  "MarketsandMarkets – Video Surveillance Market (2025)",
  "Grand View Research – AI in Video Surveillance & Video Surveillance reports (2025–2026)",
  "Fortune Business Insights – Video Surveillance Market (2025)",
  "Precedence Research – Video Surveillance Market",
  "Memoori – Global Video Surveillance Business 2025–2030",
  "Industry analyst commentary and vendor-reported ROI data (2025–2026)",
] as const;

export function IvsMarketOverview({
  pdfMode = false,
  pdfClean = false,
  showDownloadInPdfMode = false,
}: IvsMarketOverviewProps) {
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
        downloadFilename="ivs-market-overview.pdf"
        label="IVS Market Overview & Trends"
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
              "relative overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e2937] text-white",
              pdfOnly(pdfMode, PDF_CLASSES.hero)
            )}
          >
            <div className="relative px-8 pb-8 pt-9 sm:pb-10 sm:pt-11">
              <div className="mb-3 inline-flex items-center rounded-full bg-[#00d4a6]/10 px-3 py-1 text-xs tracking-[0.5px] text-[#00d4a6]">
                SALES ENABLEMENT • 2026
              </div>
              <h1 className="mb-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-1.5px] sm:text-5xl">
                IVS Market Overview &amp; Trends
              </h1>
              <p className="max-w-2xl text-lg text-white/90 sm:text-xl">
                Intelligent Video Surveillance – 2026 Market Perspective
              </p>
            </div>
          </div>

          {/* Executive Summary */}
          <section
            className={cn(
              "bg-white px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Executive Summary
            </h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
              <p>
                The global video surveillance market has shifted from simple
                recording systems to intelligent, AI-driven platforms that
                deliver operational value beyond traditional security.
              </p>
              <p>
                As of 2025, the overall video surveillance market (hardware,
                software, and services) is valued at approximately{" "}
                <span className="font-semibold text-slate-800">
                  $83–84 billion
                </span>
                . Recent reports project strong growth of 11–13.5% CAGR, with the
                market exceeding{" "}
                <span className="font-semibold text-slate-800">
                  $100 billion by 2028
                </span>{" "}
                and reaching roughly{" "}
                <span className="font-semibold text-slate-800">
                  $140–160 billion by 2030
                </span>
                .
              </p>
              <p>
                The AI-enabled segment of the market is growing significantly
                faster, with CAGRs reported between 21% and 30.6%. This
                acceleration is driven by the move to edge AI, hybrid
                architectures, and the need for real-time operational
                intelligence rather than post-event review.
              </p>
              <p>
                Key market drivers include the need to reduce false alarms,
                convergence of physical security with IT/OT, privacy regulations,
                and the desire to extract business value from existing camera
                investments. Organizations are increasingly looking for open,
                flexible platforms that can manage AI models across heterogeneous
                hardware while avoiding vendor lock-in.
              </p>
            </div>
          </section>

          <div className="h-1 bg-gradient-to-r from-[#12498a] to-[#00d4a6]" />

          {/* Market Size */}
          <section
            className={cn(
              "bg-slate-50 px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Market Size &amp; Growth (2025–2031)
            </h2>
            <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {MARKET_SIZE.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "rounded-2xl border border-slate-200 bg-white p-4",
                    pdfOnly(pdfMode, PDF_CLASSES.card)
                  )}
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    {item.label}
                  </div>
                  <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                    {item.value}
                  </div>
                  <p className="mt-1 text-xs leading-snug text-slate-500">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
            <ul className="mb-4 space-y-2 text-[15px] leading-relaxed text-slate-600">
              <li>
                <span className="font-semibold text-slate-800">
                  Overall Video Surveillance Market
                </span>{" "}
                (hardware + software + services): ~$83–84 billion in 2025;
                projected to exceed{" "}
                <span className="font-semibold text-slate-800">
                  $100 billion by 2028
                </span>
                ; expected to reach{" "}
                <span className="font-semibold text-slate-800">
                  $140–160 billion+ by 2030–2034
                </span>{" "}
                (Grand View Research, Fortune Business Insights, Precedence
                Research).
              </li>
              <li>
                <span className="font-semibold text-slate-800">
                  AI in Video Surveillance
                </span>
                : Fastest-growing segment, with CAGRs of 21–30.6% through 2030.
              </li>
              <li>
                <span className="font-semibold text-slate-800">
                  Narrower equipment/software-only estimates
                </span>{" "}
                (e.g., MarketsandMarkets): $56.11 billion in 2025 → $88.06
                billion by 2031 (CAGR 7.8%).
              </li>
            </ul>
            <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-800">
                Note on variance:
              </span>{" "}
              Different analyst firms use varying scopes. Broader definitions
              that include services, cloud/VSaaS, and AI analytics layers produce
              the higher figures commonly referenced in 2025–2026 reporting.
            </p>
          </section>

          {/* Trends */}
          <section
            className={cn(
              "bg-white px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Key Technology &amp; Market Trends (2025–2026)
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {TRENDS.map((trend) => (
                <div
                  key={trend.title}
                  className={cn(
                    "rounded-2xl border border-slate-200 bg-slate-50 p-5",
                    pdfOnly(pdfMode, PDF_CLASSES.card)
                  )}
                >
                  <h3 className="mb-2 text-base font-semibold leading-tight text-slate-900">
                    {trend.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {trend.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Drivers & Challenges */}
          <section
            className={cn(
              "bg-slate-50 px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-500">
              Industry Drivers &amp; Challenges
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  Drivers
                </h3>
                <ul className="space-y-2">
                  {DRIVERS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00d4a6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="mb-3 text-lg font-semibold text-slate-900">
                  Challenges
                </h3>
                <ul className="space-y-2">
                  {CHALLENGES.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Opportunities */}
          <section
            className={cn(
              "bg-white px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Opportunities for Open, AI-Native IVS Platforms
            </h2>
            <p className="mb-5 max-w-3xl text-[15px] leading-relaxed text-slate-600">
              Organizations are actively seeking platforms that combine:
            </p>
            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              {OPPORTUNITIES.map((item) => (
                <div
                  key={item}
                  className={cn(
                    "flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5",
                    pdfOnly(pdfMode, PDF_CLASSES.card)
                  )}
                >
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#12498a]" />
                  <p className="text-sm leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-[15px] leading-relaxed text-slate-600">
              Platforms built on{" "}
              <span className="font-semibold text-slate-800">
                lightweight, flexible architecture
              </span>{" "}
              with{" "}
              <span className="font-semibold text-slate-800">
                no vendor lock-in
              </span>{" "}
              and strong{" "}
              <span className="font-semibold text-slate-800">
                AI model management
              </span>{" "}
              capabilities are particularly well positioned as buyers move away
              from monolithic, hardware-tied solutions toward intelligent,
              MSP-friendly systems.
            </p>
          </section>

          {/* Talking Points */}
          <section
            className={cn(
              "bg-[#0f172a] px-8 py-7 text-white",
              pdfOnly(pdfMode, PDF_CLASSES.tailGroup)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#00d4a6]">
              Recommended Talking Points (Sales Use)
            </h2>
            <div className="space-y-3">
              {TALKING_POINTS.map((point) => (
                <blockquote
                  key={point}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[15px] leading-relaxed text-white/90"
                >
                  “{point}”
                </blockquote>
              ))}
            </div>
          </section>

          {/* Sources */}
          <section
            className={cn(
              "bg-white px-8 py-7",
              pdfOnly(pdfMode, PDF_CLASSES.section)
            )}
          >
            <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              Sources
            </h2>
            <ul className="space-y-1.5 text-sm leading-relaxed text-slate-600">
              {SOURCES.map((source) => (
                <li key={source} className="flex gap-2">
                  <span className="text-slate-400">•</span>
                  {source}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs italic text-slate-400">
              Last updated: July 2026
            </p>
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
              IVS • MARKET OVERVIEW
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
