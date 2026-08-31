import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  formatHeaderVariantLog,
  getHeaderVariant,
} from "./lib/header-variant";

const headerVariant = getHeaderVariant();

console.log(`\n  ▶ Next.js loaded header variant: ${formatHeaderVariantLog(headerVariant)}\n`);

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["playwright"],
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      {
        source: "/one-pagers/:slug",
        destination: "/public/:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/datasheets/:file.pdf",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          { key: "Content-Disposition", value: "inline" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
