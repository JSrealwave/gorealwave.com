import {
  pageEyebrowClass,
  pageLeadClass,
  pageTitleClass,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  lead,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-10 border-b border-card-border pb-8", className)}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          {eyebrow ? <p className={pageEyebrowClass}>{eyebrow}</p> : null}
          <h1 className={pageTitleClass}>{title}</h1>
          {lead ? <p className={pageLeadClass}>{lead}</p> : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </div>
  );
}
