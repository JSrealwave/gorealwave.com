export type ContentItem = {
  id: string;
  title: string;
  category: string[];
  type:
    | "One-Pager"
    | "Enablement Guide"
    | "TCO Tool"
    | "Talking Points"
    | "Case Study"
    | "Market Brief";
  description: string;
  keyMessage: string;
  highlights: string[];
  slug: string;
};

export const HIGHLIGHT_ID = "spatial-1";

export const contentItems: ContentItem[] = [
  {
    id: "retail-1",
    title: "Retail One-Pager: Turn Cameras into Profit Centers",
    category: ["Retail"],
    type: "One-Pager",
    description:
      "Loss prevention, ORC monitoring, queue analytics, sweethearting detection, and customer flow optimization.",
    keyMessage:
      "Turn cameras into profit centers—proactive fraud prevention, customer insights, and conversion boosts.",
    highlights: [
      "40-60% shrink reduction",
      "POS + video fusion catches 60%+ cashier fraud",
      "Real-time alerts + heat mapping",
    ],
    slug: "retail",
  },
  {
    id: "logistics-1",
    title: "Transportation & Logistics: Dock-to-Destination Visibility",
    category: ["Transportation & Logistics"],
    type: "One-Pager",
    description:
      "Trailer/container ID verification (95-99% accuracy), yard optimization, cargo theft prevention, and forensic search.",
    keyMessage:
      "Realtime visibility from dock to destination—integrated into ePlus infrastructure for secure growth.",
    highlights: [
      "95-99% LPR accuracy even at speed",
      "Reduces truck rolls",
      "GPS + video fusion",
    ],
    slug: "logistics",
  },
  {
    id: "healthcare-1",
    title: "Healthcare One-Pager: Protect Patients Without Privacy Risk",
    category: ["Healthcare"],
    type: "One-Pager",
    description:
      "Fall detection, wandering prevention, drug diversion, PPE compliance, and HIPAA-friendly forensics.",
    keyMessage:
      "Safeguard patients without privacy risks—proactive insights via ePlus's compliant stack.",
    highlights: [
      "On-device AI for compliance",
      "Reduces liability exposure",
      "Asset tracking without RFID",
    ],
    slug: "healthcare",
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
  },
  {
    id: "financial-1",
    title: "Financial Services: Secure the Future Branch",
    category: ["Financial Services"],
    type: "One-Pager",
    description:
      "ATM/teller fraud detection, branch perimeter, PCI compliance, and rapid forensic investigations.",
    keyMessage:
      "Secure the future branch—realtime fraud prevention with ePlus compliance tools.",
    highlights: [
      "60%+ ATM fraud reduction",
      "80% faster investigations",
      "Cyber-physical convergence",
    ],
    slug: "financial",
  },
  {
    id: "sled-1",
    title: "SLED & Critical Infrastructure One-Pager",
    category: ["SLED"],
    type: "One-Pager",
    description:
      "Perimeter intrusion (LiDAR + video), crowd management, emergency coordination, and compliance auditing.",
    keyMessage:
      "Proactive protection with innovative delivery for all budgets — scalable safety backed by ePlus.",
    highlights: [
      "98% false alarm reduction with LiDAR",
      "Title IX / FOIA / NERC ready",
      "Smart city & campus ready",
    ],
    slug: "sled",
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
  },
];

export const CONTENT_TYPES = [
  "One-Pager",
  "Enablement Guide",
  "TCO Tool",
  "Talking Points",
  "Case Study",
  "Market Brief",
] as const satisfies readonly ContentItem["type"][];

export const CONTENT_CATEGORIES = [
  "SLED",
  "Retail",
  "Healthcare",
  "Manufacturing",
  "Financial Services",
  "Transportation & Logistics",
  "Spatial Intelligence",
  "Market Brief",
] as const;

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
