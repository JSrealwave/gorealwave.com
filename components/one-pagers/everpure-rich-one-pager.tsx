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
  onePagerImageFrame,
  onePagerInlineImage,
  onePagerLead,
  onePagerProductImage,
  onePagerRoot,
  onePagerSectionTitle,
  onePagerTitle,
  onePagerPdfAttrs,
  PDF_CLASSES,
  pdfOnly,
} from "@/lib/one-pager/theme";
import { cn } from "@/lib/utils";

const SLUG = "everpure-video-surveillance2" as const;
const VARIANT = "rich" as const;

type EverpureRichOnePagerProps = {
  pdfMode?: boolean;
  pdfClean?: boolean;
  showShareNote?: boolean;
  publicShareHref?: string;
};

export function EverpureRichOnePager({
  pdfMode = false,
  pdfClean = false,
  showShareNote = false,
  publicShareHref = "/public/everpure-video-surveillance2",
}: EverpureRichOnePagerProps) {
  return (
    <div
      {...onePagerPdfAttrs(pdfMode, pdfClean)}
      className={onePagerRoot(pdfMode, pdfClean)}
    >
      {showShareNote && !pdfMode ? (
        <PublicShareNote href={publicShareHref} />
      ) : null}

      <OnePagerDocumentBody pdfMode={pdfMode} pdfClean={pdfClean} wide variant={VARIANT}>
        <div
          className={cn(
            pdfMode ? "mb-6" : "mb-10",
            pdfOnly(pdfMode, PDF_CLASSES.hero)
          )}
        >
          <img
            src="/headers/everpure-sled-header.jpg"
            alt="Everpure SLED Header"
            className={onePagerHeroImage(pdfMode, VARIANT)}
          />

          <div
            className={cn(
              "flex flex-col gap-4",
              !pdfMode && "md:flex-row md:items-end md:justify-between md:gap-6"
            )}
          >
            <div>
              <div className={onePagerBadge(pdfMode)}>SLED • PUBLIC SAFETY</div>
              <h1 className={onePagerTitle(pdfMode, VARIANT)}>
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

          <p className={onePagerLead(pdfMode, VARIANT)}>
            High-performance storage, AI analytics, and resilient infrastructure
            with Everpure + ePlus Realwave
          </p>
        </div>

        <div
          className={cn(
            "grid items-start",
            pdfMode
              ? "mb-6 grid-cols-2 gap-5"
              : "mb-12 grid-cols-1 gap-12 md:grid-cols-2"
          )}
        >
          <div>
            <p className={onePagerBody(pdfMode, VARIANT)}>
              Public safety and law enforcement agencies are generating massive
              volumes of video data. Legacy storage systems were not designed for
              this scale, performance, or security requirements.
            </p>
            <p className={cn(pdfMode ? "mt-4" : "mt-3", onePagerBody(pdfMode, VARIANT))}>
              Everpure + ePlus Realwave delivers modern, purpose-built
              infrastructure designed specifically for the demanding needs of SLED
              and public safety video surveillance environments.
            </p>
          </div>
          <div className={onePagerImageFrame(pdfMode)}>
            <img
              src="/images/iStock-Surveillance-Agent-4monitors.jpg"
              alt="Security operations center"
              className={onePagerInlineImage(pdfMode, VARIANT)}
            />
          </div>
        </div>

        <div
          className={cn(
            pdfMode ? "mb-6" : "mb-12",
            pdfOnly(pdfMode, PDF_CLASSES.section)
          )}
        >
          <div
            className={cn(
              "grid items-start",
              pdfMode ? "grid-cols-2 gap-5" : "gap-12 md:grid-cols-2"
            )}
          >
            <div>
              <h2 className={onePagerSectionTitle(pdfMode, true, VARIANT)}>
                Purpose-Built Technology
              </h2>
              <div
                className={cn(
                  pdfMode ? "space-y-5" : "space-y-6 text-slate-700"
                )}
              >
                <div className={onePagerBody(pdfMode, VARIANT)}>
                  <strong className="text-slate-900">FlashBlade//E</strong>
                  <br />
                  Massively scalable unstructured data platform optimized for
                  video surveillance workloads with exceptional density and
                  efficiency.
                </div>
                <div className={onePagerBody(pdfMode, VARIANT)}>
                  <strong className="text-slate-900">Evergreen//One</strong>
                  <br />
                  Enterprise Storage-as-a-Service with guaranteed SLAs and
                  ransomware recovery capabilities.
                </div>
              </div>
            </div>
            <div className={cn(onePagerImageFrame(pdfMode), "bg-slate-100")}>
              <img
                src="/images/everpure-e-array.png"
                alt="Everpure storage array"
                className={onePagerProductImage(pdfMode, VARIANT)}
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            pdfMode ? "mb-5" : "mb-12",
            pdfOnly(pdfMode, PDF_CLASSES.tailGroup)
          )}
        >
          <h2 className={onePagerSectionTitle(pdfMode, false, VARIANT)}>
            Key Benefits for SLED Environments
          </h2>
          <div
            className={cn(
              "grid",
              pdfMode ? "grid-cols-2 gap-4" : "gap-6 md:grid-cols-3"
            )}
          >
            {[
              {
                title: "Massive Scale",
                desc: "Handle petabytes of video data with industry-leading density and performance.",
              },
              {
                title: "AI & Analytics Ready",
                desc: "Purpose-built platform for real-time video analytics and modern AI workloads.",
              },
              {
                title: "Ransomware Resilient",
                desc: "SafeMode snapshots + guaranteed recovery SLAs with next-business-day array shipping.",
              },
              {
                title: "Lower TCO",
                desc: "Dramatically reduce power, cooling, space, and management overhead.",
              },
              {
                title: "Hybrid Cloud Agility",
                desc: "Seamless data mobility between on-prem, colo, and public cloud.",
              },
              {
                title: "Financial Flexibility",
                desc: "Consumption-based model with predictable OPEX and no refresh surprises.",
              },
            ].map((item, index) => (
              <div key={index} className={onePagerCard(pdfMode, VARIANT)}>
                <h4 className={onePagerCardTitle(pdfMode)}>{item.title}</h4>
                <p className={onePagerCardBody(pdfMode, VARIANT)}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={onePagerFooter(pdfMode, VARIANT)}>
            <div
              className={cn(
                pdfMode
                  ? "flex items-start justify-between gap-6"
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
      </OnePagerDocumentBody>
    </div>
  );
}
