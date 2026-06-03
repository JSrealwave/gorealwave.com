import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-teal/25 bg-teal/8 text-navy dark:border-teal/30 dark:bg-teal/10 dark:text-teal",
        navy: "border-navy/15 bg-navy/5 text-navy dark:border-navy-light/25 dark:bg-navy/15 dark:text-slate-200",
        outline:
          "border-card-border bg-card text-muted dark:border-slate-600 dark:bg-slate-800/40 dark:text-slate-400",
        type: "border-card-border bg-background text-muted dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
