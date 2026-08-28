#!/usr/bin/env node
/**
 * Generate static PDF files for all registered one-pagers.
 * Requires the app to be running (default: http://localhost:3000).
 *
 * Usage:
 *   npm run dev          # in another terminal
 *   npm run pdf:generate
 *
 * Optional: PDF_BASE_URL=https://gorealwave.com npm run pdf:generate
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "public", "one-pagers");

const baseUrl = (
  process.env.PDF_BASE_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  "http://localhost:3000"
).replace(/\/$/, "");

const sources = [
  {
    slug: "everpure-video-surveillance",
    renderPath: "/public/everpure-video-surveillance",
    filename: "everpure-video-surveillance.pdf",
  },
  {
    slug: "everpure-video-surveillance2",
    renderPath: "/public/everpure-video-surveillance2",
    filename: "everpure-video-surveillance2.pdf",
  },
];

async function waitForServer(url) {
  for (let attempt = 1; attempt <= 30; attempt++) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.ok || response.status === 307 || response.status === 302) {
        return;
      }
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(
    `App not reachable at ${baseUrl}. Start it with: npm run dev`
  );
}

console.log(`\n  PDF generator — base URL: ${baseUrl}\n`);

await waitForServer(`${baseUrl}/public/everpure-video-surveillance`);
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const source of sources) {
  const targetUrl = `${baseUrl}${source.renderPath}?pdf=1&clean=1`;
  const page = await browser.newPage({
    viewport: { width: 816, height: 1056 },
    deviceScaleFactor: 1,
  });

  console.log(`  Generating ${source.filename} from ${targetUrl}`);

  await page.emulateMedia({ media: "print", colorScheme: "light" });
  await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForSelector('[data-one-pager="true"][data-pdf-mode="true"]', {
    timeout: 10_000,
  });
  await page.waitForTimeout(500);

  const pdf = await page.pdf({
    format: "Letter",
    printBackground: true,
    scale: 1,
    margin: {
      top: "0.25in",
      right: "0.3in",
      bottom: "0.25in",
      left: "0.3in",
    },
  });

  const outputPath = path.join(outputDir, source.filename);
  await writeFile(outputPath, pdf);
  console.log(`  ✓ Wrote ${outputPath}`);

  await page.close();
}

await browser.close();

console.log("\n  Done.\n");
