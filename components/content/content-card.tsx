import { ArrowRight, Sparkles } from "lucide-react";
import type { ContentItem } from "@/lib/content";
import { isHighlight } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ContentCardProps {
  item: ContentItem;
  onViewDetails: () => void;
}

export function ContentCard({ item, onViewDetails }: ContentCardProps) {
  return (
    <article className="group flex flex-col rounded-lg border border-card-border bg-card px-5 py-4 shadow-sm transition-colors hover:border-navy/25 hover:shadow-md dark:hover:border-teal/25">
      <div className="mb-2.5">
        <Badge variant="type">{item.type}</Badge>
      </div>

      <h3 className="mb-2 text-sm font-bold leading-snug text-navy group-hover:text-navy-light dark:text-slate-100 dark:group-hover:text-teal">
        {item.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {item.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {item.category.map((cat) => (
          <Badge key={cat} variant="default" className="normal-case tracking-normal">
            {cat}
          </Badge>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={onViewDetails}
      >
        View Details
        <ArrowRight className="h-3.5 w-3.5" />
      </Button>

      {isHighlight(item) && (
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-teal-dark dark:text-teal">
          <Sparkles className="h-3 w-3" />
          Highlight
        </div>
      )}
    </article>
  );
}
