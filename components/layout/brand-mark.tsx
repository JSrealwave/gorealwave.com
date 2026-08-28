import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy shadow-sm ring-1 ring-navy/20 transition group-hover:ring-teal/40 dark:bg-navy-light dark:ring-white/10">
        <span className="text-[11px] font-bold tracking-tight text-white">RW</span>
      </div>
      <div className="hidden sm:block">
        <p className="text-[0.9375rem] leading-tight">
          <span className="font-bold text-navy dark:text-teal">Realwave</span>
          <span className="font-normal text-foreground/80 dark:text-slate-300">
            {" "}
            Enablement Hub
          </span>
        </p>
        <p className="text-xs text-muted">Internal seller enablement</p>
      </div>
    </Link>
  );
}
