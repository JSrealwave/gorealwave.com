/** 1-based slide index from `?slide=` query param. */
export function parseSlideQueryParam(
  raw: string | null | undefined,
  total: number
): number | null {
  if (!raw || total <= 0) return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1 || n > total) return null;
  return n - 1; // zero-based
}

/** Update or remove `slide` on the current URL without a Next navigation. */
export function replaceSlideQueryParam(slide1Based: number | null) {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  if (slide1Based === null) {
    url.searchParams.delete("slide");
  } else {
    url.searchParams.set("slide", String(slide1Based));
  }

  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(window.history.state, "", next);
}
