import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  onePagerContainer,
  onePagerFrame,
  onePagerShell,
  type OnePagerVariant,
} from "@/lib/one-pager/theme";

type OnePagerDocumentFrameProps = {
  pdfMode: boolean;
  pdfClean?: boolean;
  wide?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps one-pager body content in the pro PDF shell + frame when `?pdf=1` is active.
 * Skips decorative framing when `?pdf=1&clean=1` (Playwright export).
 * No-op in normal web view — pass children through unchanged.
 */
export function OnePagerDocumentFrame({
  pdfMode,
  pdfClean = false,
  wide = false,
  children,
  className,
}: OnePagerDocumentFrameProps) {
  if (!pdfMode || pdfClean) {
    return <>{children}</>;
  }

  return (
    <div className={onePagerShell(wide)}>
      <div className={onePagerFrame(className)}>{children}</div>
    </div>
  );
}

type OnePagerDocumentBodyProps = {
  pdfMode: boolean;
  pdfClean?: boolean;
  wide?: boolean;
  variant?: OnePagerVariant;
  children: ReactNode;
  className?: string;
};

/** Shell + frame + inner container padding — the usual Everpure-style layout. */
export function OnePagerDocumentBody({
  pdfMode,
  pdfClean = false,
  wide = false,
  variant = "standard",
  children,
  className,
}: OnePagerDocumentBodyProps) {
  const body = (
    <div className={cn(onePagerContainer(pdfMode, wide, variant), className)}>
      {children}
    </div>
  );

  return (
    <OnePagerDocumentFrame pdfMode={pdfMode} pdfClean={pdfClean} wide={wide}>
      {body}
    </OnePagerDocumentFrame>
  );
}
