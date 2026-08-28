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

const SLUG = "sled" as const;

type RealwaveSledVerticalOnePagerProps = {
  pdfMode?: boolean;
  pdfClean?: boolean;
  /** Public route: keep Download PDF visible in browser PDF preview (`?pdf=1`). */
  showDownloadInPdfMode?: boolean;
};

const DIFFERENTIATORS = [
  {
    number: "01",
    title: "Unified, Open IVS Platform",
    body: "Best-in-class Intelligent Video Surveillance built on Network Optix — one open platform for public safety ops centers, campus security, and critical infrastructure.",
  },
  {
    number: "02",
    title: "Lightweight & Flexible at Scale",
    body: "Deploy at the precinct, campus edge, port perimeter, or agency data center — and scale across jurisdictions without rip-and-replace or vendor lock-in.",
  },
  {
    number: "03",
    title: "Proven AI Analytics Library",
    body: "Object detection & tracking, behavior recognition, privacy-aware facial analytics, LPR, OCR, and weapon detection — tested and deployed on over 1.5 million channels.",
  },
  {
    number: "04",
    title: "AI Manager",
    body: "A universal, scalable analytics pipeline with cross-hardware support (Intel, AMD, ARM, NVIDIA Jetson, Hailo), remote OTA model updates, and real-time optimization for multi-site SLED fleets.",
  },
  {
    number: "05",
    title: "Advanced Mapping & Tracking",
    body: "Built-in GIS mapping with GPS integration and real-time third-party object tracking — essential for perimeter, campus, and emergency coordination.",
  },
  {
    number: "06",
    title: "Fastest-Growing Integration Ecosystem",
    body: "45,000+ device support and open APIs — integrate cameras, access control, and agency systems without proprietary dead ends.",
  },
] as const;

const CAPABILITIES = [
  {
    title: "Perimeter Protection",
    body: "Verify intrusion, loitering, and unauthorized access in real time — with fewer false alarms for ports, campuses, and critical sites.",
  },
  {
    title: "LPR & Vehicle Intelligence",
    body: "High-accuracy license plate and vehicle recognition for law enforcement, parking, and perimeter vehicle control.",
  },
  {
    title: "Privacy-Aware Analytics",
    body: "Facial and behavior analytics designed for regulated environments — with controls aligned to campus and public-sector privacy expectations.",
  },
  {
    title: "Mapping, Tracking & AI Manager",
    body: "GIS-aware situational awareness plus a cross-hardware AI pipeline that keeps models current across distributed SLED deployments.",
  },
] as const;

const ENVIRONMENTS = [
  "Ports",
  "Airports",
  "Law Enforcement",
  "Higher Education",
  "State & Local Government",
  "Critical Infrastructure",
  "Campus Safety",
  "Emergency Operations",
] as const;

export function RealwaveSledVerticalOnePager({
  pdfMode = false,
  pdfClean = false,
  showDownloadInPdfMode = false,
}: RealwaveSledVerticalOnePagerProps) {
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
        downloadFilename="realwave-sled-ivs.pdf"
        label="SLED & Critical Infrastructure"
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
              src="/images/heroes/sled.webp"
              alt="Realwave Intelligent Video Surveillance for SLED and Critical Infrastructure"
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-center",
                pdfMode ? "opacity-40" : "opacity-50"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/95 via-[#0f172a]/85 to-[#12498a]/70" />
            <div className="relative px-8 pb-8 pt-9 sm:pb-10 sm:pt-11">
              <div className="mb-3 inline-flex items-center rounded-full bg-[#00d4a6]/10 px-3 py-1 text-xs tracking-[0.5px] text-[#00d4a6]">
                SLED &amp; CRITICAL INFRASTRUCTURE
              </div>
              <h1 className="mb-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-1.5px] sm:text-5xl">
                Securing SLED &amp;
                <br />
                Critical Infrastructure
              </h1>
              <p className="max-w-xl text-lg text-white/90 sm:text-xl">
                Intelligent Video Surveillance for State, Local, Education, and
                Defense — powered by ePlus Realwave and built for real-world
                public safety performance.
              </p>
            </div>
          </div>

          {/* Intro */}
          <div className="bg-white px-8 pb-6 pt-7">
            <p className="max-w-4xl text-[15px] leading-relaxed text-slate-600">
              SLED and critical infrastructure sites are complex
              digital-physical environments. Ports, airports, campuses, and
              agency facilities generate more video than operators can
              effectively watch.{" "}
              <span className="font-semibold text-slate-800">
                ePlus Realwave
              </span>{" "}
              delivers a unified IVS platform that turns cameras into verified
              intelligence — reducing false alarms, accelerating investigations,
              and supporting privacy-conscious public-sector deployments.
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
              Public safety can&apos;t afford alert fatigue
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Perimeter breaches drowned out by false alarms",
                "Campus and public-safety teams short on verified alerts",
                "Slow forensic search across siloed camera systems",
                "Airport and port operations needing real-time coordination",
                "Pressure for privacy-compliant AI in regulated environments",
                "Legacy VMS stacks that can’t scale AI across sites",
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
              Open architecture. Proven AI. Built for government and education.
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
              What SLED teams need most from IVS
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
                  Reduction in false alarms via video verification — so public
                  safety and campus teams respond to real events, not noise.
                </p>
              </div>
              <div>
                <div className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  50%
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Faster response time — from verified alert to coordinated
                  action across critical infrastructure and campus environments.
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
              Built for SLED and critical infrastructure environments
            </h3>
            <p className="mb-5 max-w-3xl text-[15px] leading-relaxed text-slate-600">
              From port perimeters and airport terminals to university campuses
              and agency facilities — Realwave supports the environments where
              public trust and operational continuity matter most.
            </p>
            <div className="flex flex-wrap gap-2">
              {ENVIRONMENTS.map((env) => (
                <span
                  key={env}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {env}
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
              Reliability and accountability for regulated environments
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Public-Sector Ready",
                  body: "Architecture and support practices suited to government, education, and critical infrastructure requirements — including privacy-conscious AI.",
                },
                {
                  title: "Hybrid Deployment",
                  body: "Edge, on-prem, and cloud options that fit agency networks, campus IT, and multi-site jurisdictions without forcing a single model.",
                },
                {
                  title: "Single-Source Accountability",
                  body: "Platform, integrations, and ongoing support through ePlus — one partner from initial conversation through operations.",
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
                  Ready to strengthen SLED video operations?
                </h2>
                <p className="mt-1 text-sm text-white/70">
                  Contact your Realwave SME for an initial conversation.
                </p>
              </div>
              <a
                href="mailto:success@realwave.io?subject=Realwave%20SLED%20IVS%20Conversation"
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
              SLED Partners &amp; Prospects
            </div>
            <div className="hidden font-mono text-[9px] tracking-widest sm:block">
              SLED • IVS VERTICAL
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
