"use client";

import { useState } from "react";
import { Check, Copy, FileDown } from "lucide-react";
import type { ContentItem } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ContentModalProps {
  item: ContentItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContentModal({ item, open, onOpenChange }: ContentModalProps) {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/library?asset=${item.id}`
      : `/library?asset=${item.id}`;

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2 pr-8">
            <Badge variant="type">{item.type}</Badge>
            {item.category.map((cat) => (
              <Badge key={cat}>{cat}</Badge>
            ))}
          </div>
          <DialogTitle className="pt-2">{item.title}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="rounded-md border border-card-border border-l-[3px] border-l-teal bg-background px-4 py-3 dark:bg-slate-800/40">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-navy dark:text-teal">
              Key Message
            </p>
            <p className="text-sm leading-relaxed text-foreground/90 dark:text-slate-200">
              {item.keyMessage}
            </p>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Highlights
            </p>
            <ul className="space-y-2">
              {item.highlights.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-sm leading-relaxed text-foreground/80 dark:text-slate-300"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 border-t border-card-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="accent" onClick={handleCopyLink}>
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Link Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
            <p className="flex items-center gap-2 text-xs text-slate-400">
              <FileDown className="h-3.5 w-3.5" />
              Download PDF coming soon
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
