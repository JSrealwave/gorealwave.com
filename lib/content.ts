export type ContentItem = {
  id: string;
  title: string;
  category: string[];
  type:
    | "One-Pager"
    | "Decks"
    | "Market Brief"
    | "Brochure"
    | "Video"
    | "Drawing"
    | "Datasheet";
  description: string;
  keyMessage: string;
  highlights: string[];
  slug: string;
  /** Public full-page route (no login). */
  publicUrl?: string;
  /** Slug passed to /api/pdf/[slug] — defaults to `slug` when publicUrl is set. */
  pdfSlug?: string;
  /** Static file under /public (PDF, video, drawing). */
  fileUrl?: string;
  /** Card/modal thumbnail under /public (product shots or curated assets). */
  thumbnailUrl?: string;
  /** Product catalog part number when this asset is a SKU card. */
  partNumber?: string;
};

export const HIGHLIGHT_ID = "ivs-market-overview";

export const contentItems: ContentItem[] = [
  {
    id: "retail-1",
    title: "Realwave for Retail",
    category: ["Retail", "IVS"],
    type: "One-Pager",
    description:
      "Retail vertical one-pager for loss prevention, ORC, queue analytics, and multi-store IVS conversations.",
    keyMessage:
      "Turn cameras into profit centers — verified alerts, faster investigations, and open AI that scales across the chain.",
    highlights: [
      "Reduces false alarms by 98% via video verification",
      "Improves response time by 50%",
      "LP, ORC, and POS + video fusion for multi-store estates",
    ],
    slug: "retail",
    publicUrl: "/public/retail",
    pdfSlug: "retail",
    thumbnailUrl: "/images/heroes/retail.webp",
  },
  {
    id: "logistics-1",
    title: "Realwave for Transportation & Logistics",
    category: ["Transportation & Logistics", "IVS"],
    type: "One-Pager",
    description:
      "Transportation vertical one-pager for yards, docks, LPR/OCR, cargo integrity, and dock-to-destination visibility.",
    keyMessage:
      "Dock-to-destination visibility — verified gate and yard events, faster forensics, and open AI for logistics networks.",
    highlights: [
      "Reduces false alarms by 98% via video verification",
      "Improves response time by 50%",
      "LPR/OCR, yard awareness, and multi-site logistics scale",
    ],
    slug: "transportation",
    publicUrl: "/public/transportation",
    pdfSlug: "transportation",
    thumbnailUrl: "/images/heroes/transportation.webp",
  },
  {
    id: "healthcare-1",
    title: "Realwave for Healthcare",
    category: ["Healthcare", "IVS"],
    type: "One-Pager",
    description:
      "Healthcare vertical one-pager for patient safety, privacy-aware analytics, diversion forensics, and campus IVS.",
    keyMessage:
      "Protect patients without privacy risk — verified safety alerts, faster investigations, and regulated-environment AI.",
    highlights: [
      "Reduces false alarms by 98% via video verification",
      "Improves response time by 50%",
      "Privacy-aware analytics for hospitals and multi-campus systems",
    ],
    slug: "healthcare",
    publicUrl: "/public/healthcare",
    pdfSlug: "healthcare",
    thumbnailUrl: "/images/heroes/healthcare.webp",
  },
  {
    id: "manufacturing-1",
    title: "Manufacturing: Safer, Smarter Factories",
    category: ["Manufacturing"],
    type: "One-Pager",
    description:
      "PPE compliance, quality defect detection, predictive maintenance, and cobot safety monitoring.",
    keyMessage:
      "Smarter, safer factories—video as predictive intelligence with ePlus infrastructure.",
    highlights: [
      "20-40% incident reduction",
      "30-50% less unplanned downtime",
      "99%+ defect detection accuracy",
    ],
    slug: "manufacturing",
    thumbnailUrl: "/images/heroes/manufacturing.webp",
  },
  {
    id: "financial-1",
    title: "Realwave for Financial Services",
    category: ["Financial Services", "IVS"],
    type: "One-Pager",
    description:
      "Financial services vertical one-pager for branches, ATMs, perimeter awareness, and multi-branch investigations.",
    keyMessage:
      "Secure the future branch — verified alerts, faster forensics, and open AI across the branch and ATM estate.",
    highlights: [
      "Reduces false alarms by 98% via video verification",
      "Improves response time by 50%",
      "ATM/teller protection and rapid multi-branch search",
    ],
    slug: "financial",
    publicUrl: "/public/financial",
    pdfSlug: "financial",
    thumbnailUrl: "/images/heroes/financial.webp",
  },
  {
    id: "realwave-general",
    title: "Realwave Intelligent Video Surveillance – Platform Overview",
    category: ["Platform", "Overview", "IVS"],
    type: "One-Pager",
    description:
      "Master platform one-pager for the open, AI-powered Realwave IVS stack — ideal for first conversations across every vertical.",
    keyMessage:
      "A modern, open Intelligent Video Surveillance platform from ePlus Realwave — proven AI, hybrid deployment, and measurable outcomes without vendor lock-in.",
    highlights: [
      "Reduces false alarms by 98% via video verification",
      "Improves response time by 50%",
      "1.5M+ channels deployed with proven AI analytics",
      "45,000+ device support and open APIs",
    ],
    slug: "general",
    publicUrl: "/public/general",
    pdfSlug: "general",
    thumbnailUrl: "/images/heroes/cloud-vms.webp",
  },
  {
    id: "realwave-intro-deck",
    title: "Realwave Introduction Deck",
    category: ["Platform", "Overview", "Deck"],
    type: "Decks",
    description:
      "Full Realwave introduction deck covering the modern video intelligence stack — RealEdge, RealVue, RealIntelligence, RealInsights, analytics, and next steps.",
    keyMessage:
      "A shareable introduction deck for first conversations — why video intelligence, why now, and how Realwave’s open stack delivers verified alerts and measurable outcomes.",
    highlights: [
      "23-slide interactive deck for customer and partner conversations",
      "Covers RealEdge, RealVue, RealIntelligence, RealInsights, and architecture",
      "Includes analytics, deployment process, and recommended next steps",
    ],
    slug: "eplus-realwave-intro",
    publicUrl: "/public/resources/eplus-realwave-intro",
    pdfSlug: "eplus-realwave-intro",
    thumbnailUrl: "/images/decks/eplus-realwave-intro/slide-00.webp",
  },
  {
    id: "socal-realwave-trng-deck",
    title: "SoCal Realwave Training Deck",
    category: ["Platform", "Overview", "Deck"],
    type: "Decks",
    description:
      "34-slide SoCal Realwave training deck for partner enablement — interactive viewer with thumbnails, deep links, and PDF export.",
    keyMessage:
      "A field-ready training deck for SoCal Realwave sessions — review slides interactively or download a shareable PDF.",
    highlights: [
      "34-slide landscape training deck",
      "Interactive viewer with thumbnail navigation and fullscreen",
      "Public share link and PDF download for partner sessions",
    ],
    slug: "socal-realwave-trng-deck",
    publicUrl: "/public/resources/socal-realwave-trng-deck",
    pdfSlug: "socal-realwave-trng-deck",
    thumbnailUrl: "/images/decks/socal-realwave-trng-deck/slide-00.webp",
  },
  {
    id: "realwave-sled-vertical",
    title: "Realwave for SLED & Critical Infrastructure",
    category: ["SLED", "Critical Infrastructure", "Public Safety"],
    type: "One-Pager",
    description:
      "SLED vertical one-pager for state, local, education, and defense — perimeter, campus, airport/port, and public-safety IVS conversations.",
    keyMessage:
      "Turn SLED and critical infrastructure cameras into verified intelligence — fewer false alarms, faster response, and privacy-conscious AI backed by ePlus.",
    highlights: [
      "Reduces false alarms by 98% via video verification",
      "Improves response time by 50%",
      "Perimeter, LPR, and privacy-aware analytics for public-sector sites",
      "Hybrid deployment suited to regulated agency environments",
    ],
    slug: "sled-vertical",
    publicUrl: "/public/sled",
    pdfSlug: "sled",
    thumbnailUrl: "/images/heroes/sled.webp",
  },
  {
    id: "everpure-sled-1",
    title: "Everpure Video Surveillance for SLED (Standard)",
    category: ["SLED"],
    type: "One-Pager",
    description:
      "Purpose-built storage and analytics for public safety video workloads — scalable retention, AI-ready performance, and ransomware-resilient infrastructure.",
    keyMessage:
      "Modernize SLED video surveillance with Everpure + Realwave — petabyte-scale storage designed for retention, search, and long-term evidence management.",
    highlights: [
      "FlashBlade//E for massive unstructured video data",
      "AI and real-time analytics ready at scale",
      "SafeMode snapshots with ransomware recovery SLAs",
      "Hybrid and multi-cloud data mobility",
    ],
    slug: "everpure-video-surveillance",
    publicUrl: "/public/everpure-video-surveillance",
    pdfSlug: "everpure-video-surveillance",
    thumbnailUrl: "/images/everpure-e-array.png",
  },
  {
    id: "everpure-sled-2",
    title: "Everpure Video Surveillance for SLED (Rich Media)",
    category: ["SLED"],
    type: "One-Pager",
    description:
      "Visual one-pager with product imagery and control-room context for SLED and public safety video modernization conversations.",
    keyMessage:
      "Show customers how Everpure + Realwave delivers high-performance storage, resilient operations, and lower TCO for demanding video environments.",
    highlights: [
      "Purpose-built FlashBlade//E and Evergreen//One platform story",
      "Control-room and infrastructure visuals for customer meetings",
      "Six key SLED benefits from scale to financial flexibility",
      "Downloadable PDF for field-ready sharing",
    ],
    slug: "everpure-video-surveillance2",
    publicUrl: "/public/everpure-video-surveillance2",
    pdfSlug: "everpure-video-surveillance2",
    thumbnailUrl: "/images/iStock-Surveillance-Agent-4monitors.jpg",
  },
  {
    id: "realwave-sled-everpure",
    title: "Securing SLED & Critical Infrastructure",
    category: ["SLED", "Critical Infrastructure", "Public Safety"],
    type: "One-Pager",
    description:
      "Combined Realwave + Everpure one-pager for SLED video intelligence with all-flash storage, retention, and evidence workflows.",
    keyMessage:
      "Pair Realwave IVS with Everpure all-flash storage to modernize SLED and critical infrastructure video — verified alerts, durable retention, and lower TCO.",
    highlights: [
      "AI-verified alerts for campuses, agencies, and critical sites",
      "FlashBlade//E scale for multi-year evidence retention",
      "Ransomware-resilient snapshots for public-safety video",
    ],
    slug: "realwave-sled",
    publicUrl: "/public/realwave-sled",
    pdfSlug: "realwave-sled",
    thumbnailUrl: "/images/heroes/sled-securing.webp",
  },
  {
    id: "ivs-market-overview",
    title: "IVS Market Overview & Trends",
    category: ["Market Brief", "IVS", "Platform"],
    type: "Market Brief",
    description:
      "2026 market perspective for Intelligent Video Surveillance — size, growth, AI/edge trends, and talking points for first conversations.",
    keyMessage:
      "The IVS market is crossing $80B and the AI layer is growing 21–30% CAGR — customers are buying verified alerts, hybrid edge AI, and open platforms, not DVRs.",
    highlights: [
      "Overall market ~$83–84B in 2025, $100B+ by 2028",
      "AI segment CAGR 21–30.6% through 2030",
      "Video verification cuts false alarms 70–95%+",
      "IT/CISO ownership is accelerating hybrid, open platforms",
    ],
    slug: "ivs-market-overview",
    publicUrl: "/public/resources/ivs-market-overview",
    pdfSlug: "ivs-market-overview",
    thumbnailUrl: "/images/heroes/iq.webp",
  },
  {
    id: "spatial-1",
    title: "Spatial Intelligence: 3D Mapping & Prediction in IVS",
    category: ["Spatial Intelligence", "Market Brief"],
    type: "Market Brief",
    description:
      "How LiDAR-video fusion, single-image 3D reconstruction, and predictive spatial modeling are becoming the 4th pillar of security.",
    keyMessage:
      "Up to 60% better crowd-flow accuracy and 20-30% reduction in operational delays.",
    highlights: [
      "Volumetric analysis",
      "AR/VR overlays for operators",
      "Privacy-preserving sensor aggregation",
    ],
    slug: "spatial-intelligence",
    thumbnailUrl: "/images/heroes/spatial-intelligence.webp",
  },
  {
    id: "deck-jh-8-3",
    title: "Realwave Intro Deck (JH 8/3)",
    category: ["Platform", "Overview", "Deck"],
    type: "Decks",
    description:
      "16-slide Realwave introduction deck for Johns Hopkins conversations — interactive viewer with thumbnails, plus PDF download.",
    keyMessage:
      "A field-ready intro deck: discovery findings, Clery/compliance context, the Realwave stack, and ePlus Bailiwick delivery.",
    highlights: [
      "16-slide interactive deck with thumbnail navigation and fullscreen",
      "Covers RealEdge, RealVue, RealIntelligence, RealInsights, and architecture",
      "Downloadable PDF for customer and partner meetings",
    ],
    slug: "eplus-realwave-jh",
    fileUrl: "/datasheets/eplus-realwave-jh.pdf",
    thumbnailUrl: "/images/datasheets/eplus-realwave-jh.webp",
  },
  {
    id: "realwave-brochure-3p",
    title: "Realwave Brochure",
    category: ["Platform", "Overview", "Brochure"],
    type: "Brochure",
    description:
      "Three-page Realwave brochure for technology executives — purpose-built for the modern IVS stack.",
    keyMessage:
      "Say goodbye to dark data — Realwave converts passive surveillance into proactive intelligence without vendor lock-in.",
    highlights: [
      "Scalable security and PII compliance with no vendor lock-in",
      "90% fewer false positives and 80% less manual scrubbing",
      "Hybrid edge-to-cloud architecture with 24/7 services",
    ],
    slug: "realwave-brochure-3p",
    fileUrl: "/datasheets/realwave-brochure-3p.pdf",
    thumbnailUrl: "/images/datasheets/realwave-brochure-3p.webp",
  },
  {
    id: "realwave-quick-intro-video",
    title: "Realwave Quick Intro",
    category: ["Platform", "Overview", "Video"],
    type: "Video",
    description:
      "720p product intro video for first conversations — Realwave Intelligent Video Surveillance in under a few minutes.",
    keyMessage:
      "A short walkthrough of the Realwave client and platform story you can play in a meeting or share with the team.",
    highlights: [
      "720p MP4 for laptops and conference rooms",
      "Shows the Realwave operator experience",
      "Use with the intro deck or brochure",
    ],
    slug: "realwave-quick-intro",
    fileUrl: "/datasheets/realwave-quick-intro-720p.mp4",
    thumbnailUrl: "/images/datasheets/realwave-quick-intro.webp",
  },
  {
    id: "realwave-architecture",
    title: "Realwave Architecture",
    category: ["Platform", "Overview", "Architecture"],
    type: "Drawing",
    description:
      "Architecture drawing of RealEdge, RealCloud, clients, and the secure data pipeline between on-prem video and the cloud.",
    keyMessage:
      "Realwave is hybrid by design — RealIQ and RealVue at the edge, long-term archive and monitoring in RealCloud, clients on video wall, desktop, mobile, and web.",
    highlights: [
      "RealEdge: video, media server, Real IQ models, and OT data",
      "Secure data pipeline into RealCloud proxy, archive, and monitoring",
      "Clients: video wall, desktop, mobile, and web",
    ],
    slug: "realwave-architecture",
    fileUrl: "/datasheets/realwave-architecture.png",
    thumbnailUrl: "/images/datasheets/realwave-architecture.png",
  },
  {
    id: "datasheet-realintelligence-iq",
    title: "RealIntelligence (IQ) Datasheet",
    category: ["RealIntelligence", "RealIQ", "Datasheet"],
    type: "Datasheet",
    description:
      "Context-aware analytics and event fusion engine — RealTrack, RealFace, and RealPlate on top of RealVue.",
    keyMessage:
      "IQ turns cameras into a proactive intelligence platform: 90% fewer false alarms, 80% fewer manual investigations, sub-second response.",
    highlights: [
      "RealTrack, RealFace, and RealPlate skillsets",
      "POS / IoT fusion and rules engine",
      "Forensic appearance search and plug-and-play in RealVue",
    ],
    slug: "realintelligence-iq",
    fileUrl: "/datasheets/realintelligence-iq.pdf",
    thumbnailUrl: "/images/datasheets/realintelligence-iq.webp",
  },
  {
    id: "datasheet-realvue",
    title: "RealVue Datasheet",
    category: ["Subscription", "VMS", "Datasheet"],
    type: "Datasheet",
    description:
      "Enterprise video management datasheet — the command center for Intelligent Video Surveillance.",
    keyMessage:
      "Unify new and existing cameras into one command center without vendor lock-in — 45,000+ devices, Flex GRID UI, desktop, mobile, and cloud.",
    highlights: [
      "99% IP camera compatibility via ONVIF",
      "Flex GRID UI for up to 64 feeds",
      "HTTPS/SSL, SOC2 Type 2, and RealCloud remote access",
    ],
    slug: "realvue-datasheet",
    fileUrl: "/datasheets/realvue.pdf",
    thumbnailUrl: "/images/datasheets/realvue.webp",
  },
  {
    id: "datasheet-rex-ai5-360",
    title: "REX-Ai5-360 Datasheet",
    category: ["RealEdge", "Camera", "Datasheet"],
    type: "Datasheet",
    description:
      "Technical specifications for the 5MP compact IR fisheye AI IP camera — 360° or 180° coverage.",
    keyMessage:
      "5MP panoramic AI camera with on-device object/people tracking, True WDR, Smart IR to 25m, and microSD edge storage.",
    highlights: [
      "Part # REX-AI5-360",
      "5MP 360° / 180° viewing angle",
      "PoE, ONVIF, NDAA compliant",
    ],
    slug: "rex-ai5-360",
    fileUrl: "/datasheets/rex-ai5-360.pdf",
    thumbnailUrl: "/images/datasheets/rex-ai5-360.webp",
  },
  {
    id: "datasheet-rex-ai5-fd",
    title: "REX-Ai5-FD Datasheet",
    category: ["RealEdge", "Camera", "Datasheet"],
    type: "Datasheet",
    description:
      "Technical specifications for the STARVIS 5MP IR dome AI IP camera — outdoor-rated serverless AI.",
    keyMessage:
      "5MP IR dome with embedded RealTrack analytics, True WDR, Smart IR to 30m, PoE, and microSD edge storage.",
    highlights: [
      "Part # REX-AI5-FD",
      "30fps at 5MP with object/people tracking",
      "IP67 / IK10, NDAA compliant",
    ],
    slug: "rex-ai5-fd",
    fileUrl: "/datasheets/rex-ai5-fd.pdf",
    thumbnailUrl: "/images/datasheets/rex-ai5-fd.webp",
  },
  {
    id: "datasheet-rex-ai5-mb",
    title: "REX-Ai5-MB Datasheet",
    category: ["RealEdge", "Camera", "Datasheet"],
    type: "Datasheet",
    description:
      "Technical specifications for the STARVIS 5MP IR bullet AI IP camera — auto-focus, outdoor-rated.",
    keyMessage:
      "5MP IR bullet with motorized zoom, embedded VCA/object tracking, Smart IR to 40m, PoE+, and microSD edge storage.",
    highlights: [
      "Matches the catalog bullet camera (REX-AI8-MB)",
      "2.7–13.5mm auto-focus lens",
      "IP67 / IK10, NDAA compliant",
    ],
    slug: "rex-ai5-mb",
    fileUrl: "/datasheets/rex-ai5-mb.pdf",
    thumbnailUrl: "/images/datasheets/rex-ai5-mb.webp",
  },
];

export const CONTENT_TYPES = [
  "One-Pager",
  "Decks",
  "Brochure",
  "Video",
  "Drawing",
  "Datasheet",
  "Market Brief",
] as const satisfies readonly ContentItem["type"][];

const CATEGORY_ORDER = [
  "Platform",
  "Overview",
  "IVS",
  "Deck",
  "Brochure",
  "Video",
  "Architecture",
  "Datasheet",
  "Market Brief",
  "Camera",
  "VMS",
  "RealEdge",
  "RealIntelligence",
  "RealIQ",
  "Subscription",
  "SLED",
  "Critical Infrastructure",
  "Public Safety",
  "Retail",
  "Healthcare",
  "Manufacturing",
  "Financial Services",
  "Transportation & Logistics",
  "Spatial Intelligence",
] as const;

export const CONTENT_CATEGORIES = CATEGORY_ORDER;

export function getUsedContentTypes(): ContentItem["type"][] {
  const used = new Set(contentItems.map((item) => item.type));
  return CONTENT_TYPES.filter((type) => used.has(type));
}

export function getUsedCategories(): string[] {
  const used = new Set(contentItems.flatMap((item) => item.category));
  const ordered = CATEGORY_ORDER.filter((category) => used.has(category));
  const rest = [...used]
    .filter((category) => !CATEGORY_ORDER.includes(category as (typeof CATEGORY_ORDER)[number]))
    .sort();
  return [...ordered, ...rest];
}

export function getHighlightItem(): ContentItem {
  return (
    contentItems.find((item) => item.id === HIGHLIGHT_ID) ?? contentItems[0]
  );
}

export function getItemById(id: string): ContentItem | undefined {
  return contentItems.find((item) => item.id === id);
}

export function isHighlight(item: ContentItem): boolean {
  return item.id === HIGHLIGHT_ID;
}

export function isFullPageItem(item: ContentItem): boolean {
  return Boolean(item.publicUrl);
}

export function isDeckItem(item: ContentItem): boolean {
  return item.type === "Decks";
}

export function isFileAsset(item: ContentItem): boolean {
  return Boolean(item.fileUrl);
}

export function getItemFileUrl(item: ContentItem): string | undefined {
  return item.fileUrl;
}

export function getFileActionLabel(item: ContentItem): string {
  switch (item.type) {
    case "Video":
      return "Watch video";
    case "Drawing":
      return "View drawing";
    case "Brochure":
      return "Open brochure";
    case "Datasheet":
      return "Open datasheet";
    case "Decks":
      return "Open PDF";
    default:
      return "Open file";
  }
}

export type FilePreviewKind = "pdf" | "video" | "drawing";

export type FilePreview = {
  type: FilePreviewKind;
  src: string;
  title: string;
};

export function getFilePreviewKind(
  item: ContentItem
): FilePreviewKind | undefined {
  switch (item.type) {
    case "Video":
      return "video";
    case "Drawing":
      return "drawing";
    case "Datasheet":
    case "Brochure":
      return "pdf";
    default:
      return undefined;
  }
}

export function getFilePreview(item: ContentItem): FilePreview | undefined {
  const type = getFilePreviewKind(item);
  if (!type) return undefined;

  return {
    type,
    src: item.fileUrl ?? "",
    title: item.title,
  };
}

export function getItemPdfSlug(item: ContentItem): string | undefined {
  return item.pdfSlug ?? (item.publicUrl ? item.slug : undefined);
}

export function getPublicPdfPreviewUrl(item: ContentItem): string | undefined {
  if (!item.publicUrl) {
    return undefined;
  }

  return `${item.publicUrl}?pdf=1`;
}
