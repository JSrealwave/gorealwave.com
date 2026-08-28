export type OnePagerPdfSource = {
  slug: string;
  /** Public route used for rendering (no Clerk login required). */
  renderPath: string;
  filename: string;
  title: string;
  /** When true, unauthenticated clients may request this PDF via the API. */
  allowPublicApi: boolean;
};

export const ONE_PAGER_PDF_SOURCES: Record<string, OnePagerPdfSource> = {
  general: {
    slug: "general",
    renderPath: "/public/general",
    filename: "realwave-general-ivs.pdf",
    title: "Realwave Intelligent Video Surveillance",
    allowPublicApi: true,
  },
  "ivs-market-overview": {
    slug: "ivs-market-overview",
    renderPath: "/public/resources/ivs-market-overview",
    filename: "ivs-market-overview.pdf",
    title: "IVS Market Overview & Trends",
    allowPublicApi: true,
  },
  "eplus-realwave-intro": {
    slug: "eplus-realwave-intro",
    renderPath: "/public/resources/eplus-realwave-intro",
    filename: "eplus-realwave-intro.pdf",
    title: "Realwave Introduction Deck",
    allowPublicApi: true,
  },
  "socal-realwave-trng-deck": {
    slug: "socal-realwave-trng-deck",
    renderPath: "/public/resources/socal-realwave-trng-deck",
    filename: "socal-realwave-trng-deck.pdf",
    title: "SoCal Realwave Training Deck",
    allowPublicApi: true,
  },
  sled: {
    slug: "sled",
    renderPath: "/public/sled",
    filename: "realwave-sled-ivs.pdf",
    title: "Realwave IVS for SLED & Critical Infrastructure",
    allowPublicApi: true,
  },
  retail: {
    slug: "retail",
    renderPath: "/public/retail",
    filename: "realwave-retail-ivs.pdf",
    title: "Realwave IVS for Retail",
    allowPublicApi: true,
  },
  transportation: {
    slug: "transportation",
    renderPath: "/public/transportation",
    filename: "realwave-transportation-ivs.pdf",
    title: "Realwave IVS for Transportation & Logistics",
    allowPublicApi: true,
  },
  healthcare: {
    slug: "healthcare",
    renderPath: "/public/healthcare",
    filename: "realwave-healthcare-ivs.pdf",
    title: "Realwave IVS for Healthcare",
    allowPublicApi: true,
  },
  financial: {
    slug: "financial",
    renderPath: "/public/financial",
    filename: "realwave-financial-ivs.pdf",
    title: "Realwave IVS for Financial Services",
    allowPublicApi: true,
  },
  "everpure-video-surveillance": {
    slug: "everpure-video-surveillance",
    renderPath: "/public/everpure-video-surveillance",
    filename: "everpure-video-surveillance.pdf",
    title: "Everpure Video Surveillance for SLED (Standard)",
    allowPublicApi: true,
  },
  "everpure-video-surveillance2": {
    slug: "everpure-video-surveillance2",
    renderPath: "/public/everpure-video-surveillance2",
    filename: "everpure-video-surveillance2.pdf",
    title: "Everpure Video Surveillance for SLED (Rich Media)",
    allowPublicApi: true,
  },
  "realwave-sled": {
    slug: "realwave-sled",
    renderPath: "/public/realwave-sled",
    filename: "realwave-sled.pdf",
    title: "Securing SLED & Critical Infrastructure",
    allowPublicApi: true,
  },
};

export const ONE_PAGER_PDF_SLUGS = Object.keys(ONE_PAGER_PDF_SOURCES);

export function getOnePagerPdfSource(slug: string): OnePagerPdfSource | undefined {
  return ONE_PAGER_PDF_SOURCES[slug];
}

export function getAppBaseUrl(): string {
  if (process.env.PDF_BASE_URL) {
    return process.env.PDF_BASE_URL.replace(/\/$/, "");
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL.startsWith("http")
      ? process.env.VERCEL_URL.replace(/\/$/, "")
      : `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function getPdfDownloadUrl(slug: string): string {
  return `/api/pdf/${slug}`;
}
