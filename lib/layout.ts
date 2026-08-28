import { cn } from "@/lib/utils";

/** Shared horizontal shell — keeps header and page content aligned on wide screens. */
export const hubShellClass =
  "mx-auto w-full max-w-[1400px] 2xl:max-w-[1520px] px-5 sm:px-8 lg:px-10 xl:px-12";

export const hubPageClass = cn(hubShellClass, "py-12 lg:py-14");

export const pageEyebrowClass =
  "mb-2 text-sm font-semibold uppercase tracking-wider text-teal-dark dark:text-teal";

export const pageTitleClass =
  "text-3xl font-bold tracking-tight text-navy sm:text-4xl dark:text-slate-50";

export const pageLeadClass =
  "mt-3 max-w-3xl text-base leading-relaxed text-muted lg:max-w-4xl";

export const sectionTitleClass =
  "text-base font-bold uppercase tracking-wider text-navy dark:text-slate-200";
