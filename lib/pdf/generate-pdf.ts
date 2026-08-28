import { chromium, type Browser } from "playwright";
import type { OnePagerPdfSource } from "@/lib/pdf/one-pager-registry";
import { getAppBaseUrl } from "@/lib/pdf/one-pager-registry";

export const PDF_EXPORT_QUERY = "pdf=1&clean=1" as const;

export function buildPdfRenderUrl(renderPath: string, baseUrl: string): string {
  const normalizedBase = baseUrl.replace(/\/$/, "");
  const normalizedPath = renderPath.startsWith("/") ? renderPath : `/${renderPath}`;
  return `${normalizedBase}${normalizedPath}?${PDF_EXPORT_QUERY}`;
}

export type PdfGenerationOptions = {
  baseUrl?: string;
  /** Extra milliseconds to wait after network idle (fonts, images). */
  settleMs?: number;
};

let sharedBrowser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!sharedBrowser || !sharedBrowser.isConnected()) {
    sharedBrowser = await chromium.launch({
      headless: true,
      args: ["--font-render-hinting=none"],
    });
  }

  return sharedBrowser;
}

export async function closePdfBrowser(): Promise<void> {
  if (sharedBrowser) {
    await sharedBrowser.close();
    sharedBrowser = null;
  }
}

export async function generatePdfFromSource(
  source: OnePagerPdfSource,
  options: PdfGenerationOptions = {}
): Promise<Buffer> {
  const baseUrl = (options.baseUrl ?? getAppBaseUrl()).replace(/\/$/, "");
  const targetUrl = buildPdfRenderUrl(source.renderPath, baseUrl);

  const browser = await getBrowser();
  const page = await browser.newPage({
    viewport: { width: 816, height: 1056 },
    deviceScaleFactor: 1,
  });

  try {
    await page.emulateMedia({ media: "print", colorScheme: "light" });
    await page.goto(targetUrl, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });

    await page.waitForSelector('[data-one-pager="true"][data-pdf-mode="true"]', {
      timeout: 10_000,
    });

    await page.waitForFunction(
      () => document.fonts?.ready ?? true,
      undefined,
      { timeout: 10_000 }
    ).catch(() => undefined);

    if (options.settleMs) {
      await page.waitForTimeout(options.settleMs);
    }

    const pdf = await page.pdf({
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: false,
      scale: 1,
      margin: {
        top: "0.25in",
        right: "0.3in",
        bottom: "0.25in",
        left: "0.3in",
      },
    });

    return Buffer.from(pdf);
  } finally {
    await page.close();
  }
}
