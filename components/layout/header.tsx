"use client";

import { Suspense } from "react";
import { HeaderClassic } from "@/components/layout/header-classic";
import { HeaderMinimal } from "@/components/layout/header-minimal";
import { HeaderCommand } from "@/components/layout/header-command";
import {
  getHeaderVariant,
  type HeaderVariant,
} from "@/lib/header-variant";

/**
 * Header variant switch (NEXT_PUBLIC_HEADER_VARIANT):
 * - minimal  — slim underline nav (default)
 * - classic  — pill nav + mobile strip
 * - command  — centered capsule nav
 */
const variant: HeaderVariant = getHeaderVariant(
  process.env.NEXT_PUBLIC_HEADER_VARIANT
);

const variants = {
  classic: HeaderClassic,
  minimal: HeaderMinimal,
  command: HeaderCommand,
} as const;

function HeaderInner() {
  const Component = variants[variant] ?? HeaderMinimal;

  if (process.env.NODE_ENV === "development") {
    console.info(`[header] rendering variant: ${variant}`);
  }

  return (
    <div data-header-variant={variant} className="contents">
      <Component />
    </div>
  );
}

export function Header() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-40 h-[3.75rem] border-b border-card-border bg-background/90" />
      }
    >
      <HeaderInner />
    </Suspense>
  );
}

export { HeaderClassic, HeaderMinimal, HeaderCommand };
