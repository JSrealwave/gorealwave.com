/**
 * Slide manifest for the Realwave Introduction deck (v3.9 — 23 slides).
 *
 * Full slides: `public/images/decks/eplus-realwave-intro/slide-NN.webp`
 * Thumbnails:  `public/images/decks/eplus-realwave-intro/thumbs/slide-NN.webp`
 */
export type IntroDeckSlide = {
  id: string;
  title: string;
  src: string;
  /** Optional compact image for the thumbnail rail. */
  thumbSrc?: string;
  alt: string;
};

const BASE = "/images/decks/eplus-realwave-intro";
const THUMBS = `${BASE}/thumbs`;

function slide(
  index: number,
  id: string,
  title: string,
  alt: string
): IntroDeckSlide {
  const n = String(index).padStart(2, "0");
  return {
    id,
    title,
    src: `${BASE}/slide-${n}.webp`,
    thumbSrc: `${THUMBS}/slide-${n}.webp`,
    alt,
  };
}

export const EPLUS_REALWAVE_INTRO_SLIDES: IntroDeckSlide[] = [
  slide(0, "cover", "Realwave Intro", "Realwave Intro — Powering the Real-Time Wave of Video Intelligence"),
  slide(1, "timeline", "Realwave — Timeline", "Realwave product and platform timeline"),
  slide(2, "why-video-intelligence", "Why Video Intelligence", "Why Video Intelligence — AI-powered video surveillance as a top security investment priority"),
  slide(3, "why-now", "Why Now", "Why Now — VLMs, spatial intelligence, edge AI, and the surge in computer vision"),
  slide(4, "modern-video-intelligence-stack", "Modern Video Intelligence Stack", "Modern Video Intelligence Stack — RealEdge, RealVue, RealIntelligence, and RealInsights"),
  slide(5, "site-architectures", "Realwave — Site Architectures", "Realwave site architecture patterns for edge, hybrid, and cloud deployments"),
  slide(6, "realedge", "Realwave Edge eXchange", "Realwave Edge eXchange — RealEdge accelerated compute for processing and recording"),
  slide(7, "realvue-overview", "RealVue — Gen 6 Enterprise", "RealVue Gen 6 Enterprise — best-in-class VMS overview"),
  slide(8, "host", "Host", "RealVue host architecture from small to large scale"),
  slide(9, "organization-tier", "Organization Tier", "RealVue organization tier for multi-site management"),
  slide(10, "setup-admin", "Setup / Admin", "RealVue setup and administration capabilities"),
  slide(11, "sample-views", "Slide View", "RealVue sample views including appearance, bookmarks, 360, maps, and dashboards"),
  slide(12, "realintelligence", "RealIntelligence", "RealIntelligence — sensor fusion, integrations, and video analytics"),
  slide(13, "realinsights", "RealInsights", "RealInsights — realtime exception monitoring, reporting, and workflows"),
  slide(14, "architecture", "RealVue — Architecture", "RealVue architecture — RealEdge, secure data pipeline, RealCloud, and clients"),
  slide(15, "why-eplus", "Why ePlus", "Why ePlus — MSP, cloud, security, data governance, consulting, and modern video intelligence"),
  slide(16, "thank-you", "Thank You", "Thank you — Customer First. Services Led. Results Driven."),
  slide(17, "automated-intelligent-video", "Automated Intelligent Video", "Automated Intelligent Video overview"),
  slide(18, "video-analytics", "Video Analytics", "Video analytics capabilities and use cases"),
  slide(19, "analytic-deployment-process", "Video Analytic Deployment Process", "Video analytic deployment process and methodology"),
  slide(20, "next-steps", "Next Steps", "Recommended next steps for Realwave engagement"),
  slide(21, "acknowledgements", "Acknowledgements", "Acknowledgements and credits"),
  slide(22, "appendix-automated-intelligent-video", "Automated Intelligent Video", "Automated Intelligent Video appendix / reference"),
];
