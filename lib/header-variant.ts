export type HeaderVariant = "classic" | "minimal" | "command";

export const HEADER_VARIANTS: HeaderVariant[] = [
  "classic",
  "minimal",
  "command",
];

export function getHeaderVariant(
  raw: string | undefined = process.env.NEXT_PUBLIC_HEADER_VARIANT
): HeaderVariant {
  if (raw && HEADER_VARIANTS.includes(raw as HeaderVariant)) {
    return raw as HeaderVariant;
  }
  return "minimal";
}

export function formatHeaderVariantLog(variant: HeaderVariant): string {
  const env = process.env.NEXT_PUBLIC_HEADER_VARIANT;
  if (!env) {
    return `${variant} (default — set NEXT_PUBLIC_HEADER_VARIANT in .env.local)`;
  }
  if (env === variant) {
    return `${variant} (NEXT_PUBLIC_HEADER_VARIANT=${env})`;
  }
  return `${variant} (NEXT_PUBLIC_HEADER_VARIANT=${env} is invalid — using default)`;
}
