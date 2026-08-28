import { OnePagerDocumentBody } from "@/components/one-pagers/one-pager-document-frame";
import { PublicShareNote } from "@/components/one-pagers/public-share-note";
import { getPdfDownloadUrl } from "@/lib/pdf/one-pager-registry";
import {
  onePagerBadge,
  onePagerBody,
  onePagerCard,
  onePagerCardBody,
  onePagerCardTitle,
  onePagerDownloadButton,
  onePagerFooter,
  onePagerHeroImage,
  onePagerLead,
  onePagerRoot,
  onePagerSectionTitle,
  onePagerTitle,
  onePagerPdfAttrs,
  PDF_CLASSES,
  pdfOnly,
} from "@/lib/one-pager/theme";
import { cn } from "@/lib/utils";

const SLUG = "everpure-video-surveillance" as const;

type EverpureStandardOnePagerProps = {
  pdfMode?: boolean;
  pdfClean?: boolean;
  showShareNote?: boolean;
  publicShareHref?: string;
};

export function EverpureStandardOnePager({
  pdfMode = false,
  pdfClean = false,
  showShareNote = false,
  publicShareHref = "/public/everpure-video-surveillance",
}: EverpureStandardOnePagerProps) {
  return (
    <div
      {...onePagerPdfAttrs(pdfMode, pdfClean)}
      className={onePagerRoot(pdfMode, pdfClean)}
    >
      {showShareNote && !pdfMode ? (
        <PublicShareNote href={publicShareHref} />
      ) : null}

      <OnePagerDocumentBody pdfMode={pdfMode} pdfClean={pdfClean} wide>
        <div
          className={cn(
            pdfMode ? "mb-6" : "mb-10",
            pdfOnly(pdfMode, PDF_CLASSES.hero)
          )}
        >
          <img
            src="/headers/everpure-sled-header.jpg"
            alt="Everpure SLED Header"
            className={onePagerHeroImage(pdfMode)}
          />

          <div
            className={cn(
              "flex flex-col gap-4",
              !pdfMode && "md:flex-row md:items-end md:justify-between md:gap-6"
            )}
          >
            <div>
              <div className={onePagerBadge(pdfMode)}>SLED • PUBLIC SAFETY</div>
              <h1 className={onePagerTitle(pdfMode)}>
                Optimize Video Surveillance Data
                <br />
                for SLED &amp; Public Safety
              </h1>
            </div>

            {!pdfMode ? (
              <a
                href={getPdfDownloadUrl(SLUG)}
                download
                className={onePagerDownloadButton()}
              >
                Download PDF
              </a>
            ) : null}
          </div>

          <p className={onePagerLead(pdfMode)}>
            Modern, high-performance storage and analytics infrastructure with
            Everpure + ePlus Realwave
          </p>
        </div>

        <div className={cn(pdfMode ? "space-y-6" : "space-y-12")}>
          <div className={pdfOnly(pdfMode, PDF_CLASSES.section)}>
            <p className={onePagerBody(pdfMode)}>
              Video surveillance has become one of the most critical tools for
              public safety and law enforcement. However, the explosion of video
              data from fixed cameras, body-worn devices, and analytics platforms
              has created significant challenges around storage, rapid access,
              search, and long-term retention.
            </p>
            <p className={cn(pdfMode ? "mt-4" : "mt-3", onePagerBody(pdfMode))}>
              Legacy storage systems struggle with the scale, performance, and
              security requirements of modern video workloads. Everpure + ePlus
              Realwave delivers a purpose-built foundation designed specifically
              for these demanding environments.
            </p>
          </div>

          <div className={pdfOnly(pdfMode, PDF_CLASSES.tailGroup)}>
            <div className={pdfOnly(pdfMode, PDF_CLASSES.section)}>
              <h2 className={onePagerSectionTitle(pdfMode)}>Key Capabilities</h2>
              <div
                className={cn(
                  "grid",
                  pdfMode ? "grid-cols-2 gap-4" : "gap-4 md:grid-cols-2 md:gap-6"
                )}
              >
                {[
                  {
                    title: "Massive Unstructured Data Handling",
                    desc: "FlashBlade//E delivers exceptional density and performance for petabytes of video footage with dramatically lower power and space requirements.",
                  },
                  {
                    title: "AI & Real-Time Analytics Ready",
                    desc: "High-performance, massively parallel platform purpose-built to support modern video analytics and AI workloads at scale.",
                  },
                  {
                    title: "Ransomware Resilience & Security",
                    desc: "Built-in SafeMode snapshots and guaranteed ransomware recovery SLAs through Evergreen//One with next-business-day array shipping.",
                  },
                  {
                    title: "Hybrid & Multi-Cloud Flexibility",
                    desc: "Seamless data mobility between on-premises, colocation, and public cloud with consistent services and management.",
                  },
                ].map((item, index) => (
                  <div key={index} className={onePagerCard(pdfMode)}>
                    <h3 className={onePagerCardTitle(pdfMode)}>{item.title}</h3>
                    <p className={onePagerCardBody(pdfMode)}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={onePagerFooter(pdfMode)}>
              <div
                className={cn(
                  pdfMode
                    ? "flex items-start justify-between gap-5"
                    : "flex flex-col gap-y-3 md:flex-row md:items-center md:justify-between"
                )}
              >
                <div className={cn(pdfMode && "shrink-0")}>
                  <p className="font-medium text-slate-700">ePlus Realwave</p>
                  <p>Where Technology Means More®</p>
                </div>
                <div
                  className={cn(
                    pdfMode ? "text-right leading-normal" : "md:text-right"
                  )}
                >
                  <p>For internal use and authorized partners.</p>
                  <p className={cn(pdfMode ? "mt-0.5" : "mt-1")}>
                    Contact your Realwave representative for more information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OnePagerDocumentBody>
    </div>
  );
}
