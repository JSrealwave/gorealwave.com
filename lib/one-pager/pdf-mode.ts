type PdfSearchParamsObject = { pdf?: string | string[]; clean?: string | string[] };
type PdfSearchParamsLike = Pick<URLSearchParams, "get" | "getAll">;

export type PdfSearchParamsInput =
  | PdfSearchParamsObject
  | PdfSearchParamsLike
  | undefined;

function getParamValue(
  searchParams: PdfSearchParamsInput,
  key: "pdf" | "clean"
): string | string[] | undefined {
  if (!searchParams) {
    return undefined;
  }

  if ("get" in searchParams && typeof searchParams.get === "function") {
    const values = searchParams.getAll(key);
    if (values.length === 0) {
      return undefined;
    }

    return values.length === 1 ? values[0] : values;
  }

  const objectParams = searchParams as PdfSearchParamsObject;
  return objectParams[key];
}

function isTruthyParam(value: string | string[] | undefined): boolean {
  if (Array.isArray(value)) {
    return value.some((entry) => entry === "1" || entry === "true");
  }

  return value === "1" || value === "true";
}

/** True when `?pdf=1` — compact PDF preview layout in the browser. */
export function isPdfMode(searchParams: PdfSearchParamsInput): boolean {
  return isTruthyParam(getParamValue(searchParams, "pdf"));
}

/**
 * True when `?pdf=1&clean=1` — Playwright export layout without decorative framing.
 * Requires pdf mode; ignored when `?pdf=1` is absent.
 */
export function isPdfCleanExport(searchParams: PdfSearchParamsInput): boolean {
  if (!isPdfMode(searchParams)) {
    return false;
  }

  return isTruthyParam(getParamValue(searchParams, "clean"));
}
