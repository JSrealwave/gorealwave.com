export type VerticalDifferentiator = {
  number: string;
  title: string;
  body: string;
};

export type VerticalCapability = {
  title: string;
  body: string;
};

export type VerticalWhyCard = {
  title: string;
  body: string;
};

export type VerticalOnePagerConfig = {
  slug: string;
  downloadFilename: string;
  toolbarLabel: string;
  heroImage: string;
  heroAlt: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubhead: string;
  /** Text before the bold "ePlus Realwave" span. */
  introBefore: string;
  /** Text after the bold "ePlus Realwave" span. */
  introAfter: string;
  challengeTitle: string;
  challengePains: string[];
  differenceTitle: string;
  differentiators: VerticalDifferentiator[];
  capabilitiesTitle: string;
  capabilities: VerticalCapability[];
  results98: string;
  results50: string;
  whereTitle: string;
  whereBody: string;
  environments: string[];
  whyTitle: string;
  whyCards: VerticalWhyCard[];
  ctaTitle: string;
  ctaMailtoSubject: string;
  footerAudience: string;
  footerCode: string;
};

const CORE_DIFFERENTIATOR_TITLES = [
  "Unified, Open IVS Platform",
  "Lightweight & Flexible at Scale",
  "Proven AI Analytics Library",
  "AI Manager",
  "Advanced Mapping & Tracking",
  "Fastest-Growing Integration Ecosystem",
] as const;

export function buildDifferentiators(
  bodies: [string, string, string, string, string, string]
): VerticalDifferentiator[] {
  return CORE_DIFFERENTIATOR_TITLES.map((title, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title,
    body: bodies[index],
  }));
}

export const RETAIL_VERTICAL: VerticalOnePagerConfig = {
  slug: "retail",
  downloadFilename: "realwave-retail-ivs.pdf",
  toolbarLabel: "Retail",
  heroImage: "/images/heroes/retail.webp",
  heroAlt: "Realwave Intelligent Video Surveillance for Retail",
  heroEyebrow: "RETAIL",
  heroTitleLine1: "Turn Cameras into",
  heroTitleLine2: "Profit Centers",
  heroSubhead:
    "Intelligent Video Surveillance for retail — loss prevention, operations, and customer experience powered by ePlus Realwave.",
  introBefore:
    "Retailers generate more video than loss-prevention and store teams can watch. Shrink, ORC, sweethearting, and queue friction drain margin while false alarms waste time. ",
  introAfter:
    " delivers a unified IVS platform that verifies alerts, accelerates investigations, and turns existing cameras into measurable retail outcomes.",
  challengeTitle: "Shrink and alert fatigue hit the bottom line",
  challengePains: [
    "High false-alarm rates that bury real shrink events",
    "ORC and sweethearting hard to catch in real time",
    "Slow forensic search across multi-store camera systems",
    "Queue and occupancy blind spots that hurt conversion",
    "Siloed POS and video data with no single view",
    "Legacy VMS that can’t scale AI across the chain",
  ],
  differenceTitle: "Open architecture. Proven AI. Built for retail operations.",
  differentiators: buildDifferentiators([
    "Best-in-class Intelligent Video Surveillance built on Network Optix — one open platform for LP, store ops, and multi-site retail command.",
    "Deploy at the store edge, regional hub, or cloud — and scale across banners without rip-and-replace or vendor lock-in.",
    "Object detection & tracking, behavior recognition, facial analytics, LPR, OCR, and weapon detection — tested and deployed on over 1.5 million channels.",
    "A universal, scalable analytics pipeline with cross-hardware support (Intel, AMD, ARM, NVIDIA Jetson, Hailo), remote OTA model updates, and real-time optimization for multi-store fleets.",
    "Built-in GIS mapping with GPS integration and real-time third-party object tracking for multi-site situational awareness.",
    "45,000+ device support and open APIs — connect cameras, POS, EAS, and access systems without proprietary dead ends.",
  ]),
  capabilitiesTitle: "What retail teams need most from IVS",
  capabilities: [
    {
      title: "Loss Prevention & ORC",
      body: "Verify shrink, sweethearting, and organized retail crime events in real time — so LP responds to signal, not noise.",
    },
    {
      title: "POS + Video Fusion",
      body: "Correlate transaction exceptions with video evidence for faster, cleaner investigations across the store estate.",
    },
    {
      title: "Queue & Occupancy Analytics",
      body: "See wait times, dwell, and floor flow so operations can protect conversion and labor productivity.",
    },
    {
      title: "Open Multi-Store Scale",
      body: "AI Manager and open architecture keep analytics current across hundreds of stores without lock-in.",
    },
  ],
  results98:
    "Reduction in false alarms via video verification — so LP and store teams respond to real loss events, not noise.",
  results50:
    "Faster response time — from verified alert to action across stores, regions, and central LP operations.",
  whereTitle: "Built for every retail environment",
  whereBody:
    "From big-box and grocery to specialty, outlets, and distribution-connected retail — Realwave supports the environments where shrink and service collide.",
  environments: [
    "Big Box",
    "Grocery",
    "Specialty Retail",
    "Outlets",
    "Pharmacy",
    "Convenience",
    "Distribution Centers",
    "Multi-Banner Chains",
  ],
  whyTitle: "Retail-ready delivery with single-source accountability",
  whyCards: [
    {
      title: "Operational Credibility",
      body: "ePlus brings enterprise infrastructure expertise — so retail AI lands on a foundation that performs across the chain.",
    },
    {
      title: "Hybrid Store Architecture",
      body: "Edge, on-prem, and cloud options that fit store IT, bandwidth, and regional hub strategies without forcing one model.",
    },
    {
      title: "One Accountable Partner",
      body: "Platform, integrations, and support through ePlus — from first LP conversation through ongoing operations.",
    },
  ],
  ctaTitle: "Ready to modernize retail video operations?",
  ctaMailtoSubject: "Realwave Retail IVS Conversation",
  footerAudience: "Retail Partners & Prospects",
  footerCode: "RETAIL • IVS VERTICAL",
};

export const TRANSPORTATION_VERTICAL: VerticalOnePagerConfig = {
  slug: "transportation",
  downloadFilename: "realwave-transportation-ivs.pdf",
  toolbarLabel: "Transportation",
  heroImage: "/images/heroes/transportation.webp",
  heroAlt: "Realwave Intelligent Video Surveillance for Transportation & Logistics",
  heroEyebrow: "TRANSPORTATION & LOGISTICS",
  heroTitleLine1: "Dock-to-Destination",
  heroTitleLine2: "Visibility",
  heroSubhead:
    "Intelligent Video Surveillance for transportation and logistics — yards, docks, fleets, and cargo integrity powered by ePlus Realwave.",
  introBefore:
    "Yards, docks, and corridors generate continuous video — but operators still chase false alarms, missing trailers, and slow investigations. ",
  introAfter:
    " delivers a unified IVS platform that verifies events, accelerates forensic search, and brings dock-to-destination visibility into one open system.",
  challengeTitle: "Yards can’t run on unverified alerts",
  challengePains: [
    "False alarms that overwhelm yard and security operations",
    "Trailer and container ID gaps at speed or night",
    "Slow investigations after cargo theft or damage",
    "Siloed gate, yard, and warehouse camera systems",
    "Limited real-time visibility across multi-site logistics networks",
    "Legacy VMS that can’t support scalable LPR and AI",
  ],
  differenceTitle: "Open architecture. Proven AI. Built for moving operations.",
  differentiators: buildDifferentiators([
    "Best-in-class Intelligent Video Surveillance built on Network Optix — one open platform for gates, yards, docks, and logistics control rooms.",
    "Deploy at the yard edge, terminal hub, or cloud — and scale across sites without rip-and-replace or vendor lock-in.",
    "Object detection & tracking, behavior recognition, LPR, OCR, facial analytics, and weapon detection — tested and deployed on over 1.5 million channels.",
    "A universal, scalable analytics pipeline with cross-hardware support (Intel, AMD, ARM, NVIDIA Jetson, Hailo), remote OTA model updates, and real-time optimization for distributed terminals.",
    "Built-in GIS mapping with GPS integration and real-time third-party object tracking for yard, fleet, and corridor awareness.",
    "45,000+ device support and open APIs — connect cameras, gates, WMS/TMS, and access systems without proprietary dead ends.",
  ]),
  capabilitiesTitle: "What transportation teams need most from IVS",
  capabilities: [
    {
      title: "LPR / OCR & Asset ID",
      body: "High-accuracy plate, trailer, and container recognition — even at speed — for gate throughput and asset integrity.",
    },
    {
      title: "Yard & Dock Awareness",
      body: "Verify intrusion, unauthorized access, and exceptions in real time across perimeters, docks, and staging areas.",
    },
    {
      title: "Cargo Theft Forensics",
      body: "Sub-second search across video and metadata so investigations move from hours to minutes.",
    },
    {
      title: "Open Multi-Site Scale",
      body: "AI Manager and open architecture keep analytics consistent across terminals, DCs, and regional hubs.",
    },
  ],
  results98:
    "Reduction in false alarms via video verification — so yard and security teams respond to real exceptions, not noise.",
  results50:
    "Faster response time — from verified alert to action across gates, yards, docks, and logistics control rooms.",
  whereTitle: "Built for transportation and logistics environments",
  whereBody:
    "From seaports and rail yards to DCs, cross-docks, and last-mile hubs — Realwave supports the environments where assets never stop moving.",
  environments: [
    "Ports & Terminals",
    "Rail Yards",
    "Distribution Centers",
    "Cross-Docks",
    "Fleet Yards",
    "Air Cargo",
    "Intermodal",
    "Last-Mile Hubs",
  ],
  whyTitle: "Logistics-grade delivery with single-source accountability",
  whyCards: [
    {
      title: "Operational Credibility",
      body: "ePlus brings enterprise infrastructure expertise — so transportation AI performs in harsh, always-on environments.",
    },
    {
      title: "Hybrid Site Architecture",
      body: "Edge, on-prem, and cloud options that fit yard networks, terminal IT, and multi-site logistics without forcing one model.",
    },
    {
      title: "One Accountable Partner",
      body: "Platform, integrations, and support through ePlus — from first gate conversation through ongoing operations.",
    },
  ],
  ctaTitle: "Ready to modernize transportation video operations?",
  ctaMailtoSubject: "Realwave Transportation IVS Conversation",
  footerAudience: "Transportation Partners & Prospects",
  footerCode: "TRANSPORTATION • IVS VERTICAL",
};

export const HEALTHCARE_VERTICAL: VerticalOnePagerConfig = {
  slug: "healthcare",
  downloadFilename: "realwave-healthcare-ivs.pdf",
  toolbarLabel: "Healthcare",
  heroImage: "/images/heroes/healthcare.webp",
  heroAlt: "Realwave Intelligent Video Surveillance for Healthcare",
  heroEyebrow: "HEALTHCARE",
  heroTitleLine1: "Protect Patients Without",
  heroTitleLine2: "Privacy Risk",
  heroSubhead:
    "Intelligent Video Surveillance for healthcare — patient safety, compliance, and operations powered by ePlus Realwave.",
  introBefore:
    "Hospitals and clinics need awareness without compromising privacy. Falls, wandering, diversion, and workplace violence demand faster, cleaner signal — not more noise. ",
  introAfter:
    " delivers a unified IVS platform that verifies events, supports privacy-conscious analytics, and helps care environments respond with confidence.",
  challengeTitle: "Safety and compliance can’t run on noise",
  challengePains: [
    "False alarms that distract clinical and security staff",
    "Fall and wandering events detected too late",
    "Drug diversion hard to investigate quickly",
    "Privacy and HIPAA pressure around AI and video",
    "Siloed cameras across ED, pharmacy, parking, and campuses",
    "Legacy VMS that can’t scale privacy-aware analytics",
  ],
  differenceTitle: "Open architecture. Proven AI. Built for care environments.",
  differentiators: buildDifferentiators([
    "Best-in-class Intelligent Video Surveillance built on Network Optix — one open platform for hospital security, clinical support areas, and multi-campus health systems.",
    "Deploy at the facility edge, data center, or cloud — and scale across campuses without rip-and-replace or vendor lock-in.",
    "Object detection & tracking, behavior recognition, privacy-aware facial analytics, LPR, OCR, and weapon detection — tested and deployed on over 1.5 million channels.",
    "A universal, scalable analytics pipeline with cross-hardware support (Intel, AMD, ARM, NVIDIA Jetson, Hailo), remote OTA model updates, and real-time optimization for health-system fleets.",
    "Built-in GIS mapping with GPS integration and real-time third-party object tracking for campus and multi-building awareness.",
    "45,000+ device support and open APIs — connect cameras, access control, and clinical-adjacent systems without proprietary dead ends.",
  ]),
  capabilitiesTitle: "What healthcare teams need most from IVS",
  capabilities: [
    {
      title: "Patient & Staff Safety",
      body: "Verify falls, aggression, and unauthorized access quickly — so security and care teams act on real events.",
    },
    {
      title: "Privacy-Aware Analytics",
      body: "Deploy AI with controls suited to regulated healthcare environments and privacy expectations.",
    },
    {
      title: "Pharmacy & Diversion Forensics",
      body: "Accelerate investigations with fast search across video and metadata when accountability matters.",
    },
    {
      title: "Campus-Scale Open Architecture",
      body: "AI Manager and open APIs keep analytics consistent across hospitals, clinics, and parking estates.",
    },
  ],
  results98:
    "Reduction in false alarms via video verification — so clinical and security teams respond to real safety events, not noise.",
  results50:
    "Faster response time — from verified alert to coordinated action across campuses, EDs, and critical care environments.",
  whereTitle: "Built for healthcare environments",
  whereBody:
    "From acute hospitals and ambulatory clinics to pharmacies, parking, and multi-campus health systems — Realwave supports environments where safety and privacy must coexist.",
  environments: [
    "Acute Hospitals",
    "Ambulatory Clinics",
    "Emergency Departments",
    "Pharmacies",
    "Behavioral Health",
    "Parking & Campuses",
    "Research Facilities",
    "Multi-Campus Systems",
  ],
  whyTitle: "Healthcare-ready delivery with single-source accountability",
  whyCards: [
    {
      title: "Regulated-Environment Fit",
      body: "Architecture and support practices suited to healthcare privacy, compliance, and always-on operations.",
    },
    {
      title: "Hybrid Facility Architecture",
      body: "Edge, on-prem, and cloud options that fit hospital networks and multi-campus IT without forcing one model.",
    },
    {
      title: "One Accountable Partner",
      body: "Platform, integrations, and support through ePlus — from first safety conversation through ongoing operations.",
    },
  ],
  ctaTitle: "Ready to modernize healthcare video operations?",
  ctaMailtoSubject: "Realwave Healthcare IVS Conversation",
  footerAudience: "Healthcare Partners & Prospects",
  footerCode: "HEALTHCARE • IVS VERTICAL",
};

export const FINANCIAL_VERTICAL: VerticalOnePagerConfig = {
  slug: "financial",
  downloadFilename: "realwave-financial-ivs.pdf",
  toolbarLabel: "Financial Services",
  heroImage: "/images/heroes/financial.webp",
  heroAlt: "Realwave Intelligent Video Surveillance for Financial Services",
  heroEyebrow: "FINANCIAL SERVICES",
  heroTitleLine1: "Secure the Future",
  heroTitleLine2: "Branch",
  heroSubhead:
    "Intelligent Video Surveillance for financial services — branches, ATMs, and operations powered by ePlus Realwave.",
  introBefore:
    "Branches and ATMs still depend on video that is slow to search and noisy to monitor. Fraud, cash handling exceptions, and perimeter events demand verified signal. ",
  introAfter:
    " delivers a unified IVS platform that reduces false alarms, accelerates investigations, and supports compliant, multi-branch operations.",
  challengeTitle: "Branch security can’t run on unverified video",
  challengePains: [
    "False alarms that waste branch and SOC attention",
    "ATM and teller fraud hard to investigate quickly",
    "Slow forensic search across multi-branch estates",
    "Perimeter and vestibule events buried in noise",
    "Siloed cameras across branches, ATMs, and facilities",
    "Legacy VMS that can’t scale AI and compliance needs",
  ],
  differenceTitle: "Open architecture. Proven AI. Built for financial operations.",
  differentiators: buildDifferentiators([
    "Best-in-class Intelligent Video Surveillance built on Network Optix — one open platform for branches, ATMs, SOCs, and corporate facilities.",
    "Deploy at the branch edge, regional hub, or cloud — and scale across the estate without rip-and-replace or vendor lock-in.",
    "Object detection & tracking, behavior recognition, facial analytics, LPR, OCR, and weapon detection — tested and deployed on over 1.5 million channels.",
    "A universal, scalable analytics pipeline with cross-hardware support (Intel, AMD, ARM, NVIDIA Jetson, Hailo), remote OTA model updates, and real-time optimization for multi-branch fleets.",
    "Built-in GIS mapping with GPS integration and real-time third-party object tracking for regional and estate-wide awareness.",
    "45,000+ device support and open APIs — connect cameras, access control, and branch systems without proprietary dead ends.",
  ]),
  capabilitiesTitle: "What financial teams need most from IVS",
  capabilities: [
    {
      title: "ATM & Teller Protection",
      body: "Verify fraud and exception events faster — so investigations start with evidence, not guesswork.",
    },
    {
      title: "Branch Perimeter Awareness",
      body: "Reduce noise around vestibules, after-hours activity, and unauthorized access with verified alerts.",
    },
    {
      title: "Rapid Forensic Search",
      body: "Find the right clip across branches in seconds for compliance, disputes, and incident response.",
    },
    {
      title: "Open Multi-Branch Scale",
      body: "AI Manager and open architecture keep analytics consistent across the branch and ATM estate.",
    },
  ],
  results98:
    "Reduction in false alarms via video verification — so branch and SOC teams respond to real risk, not noise.",
  results50:
    "Faster response time — from verified alert to action across branches, ATMs, and centralized security operations.",
  whereTitle: "Built for financial services environments",
  whereBody:
    "From full-service branches and ATM fleets to corporate campuses and operations centers — Realwave supports the environments where trust and uptime are non-negotiable.",
  environments: [
    "Retail Branches",
    "ATM Fleets",
    "Credit Unions",
    "Corporate Campuses",
    "Operations Centers",
    "Cash Processing",
    "Data Centers",
    "Multi-Region Estates",
  ],
  whyTitle: "Financial-grade delivery with single-source accountability",
  whyCards: [
    {
      title: "Compliance-Minded Delivery",
      body: "Architecture and support practices suited to regulated financial environments and audit-ready operations.",
    },
    {
      title: "Hybrid Branch Architecture",
      body: "Edge, on-prem, and cloud options that fit branch networks and regional SOC strategies without forcing one model.",
    },
    {
      title: "One Accountable Partner",
      body: "Platform, integrations, and support through ePlus — from first branch conversation through ongoing operations.",
    },
  ],
  ctaTitle: "Ready to modernize financial video operations?",
  ctaMailtoSubject: "Realwave Financial Services IVS Conversation",
  footerAudience: "Financial Services Partners & Prospects",
  footerCode: "FINANCIAL • IVS VERTICAL",
};

export const VERTICAL_ONE_PAGERS = {
  retail: RETAIL_VERTICAL,
  transportation: TRANSPORTATION_VERTICAL,
  healthcare: HEALTHCARE_VERTICAL,
  financial: FINANCIAL_VERTICAL,
} as const;
