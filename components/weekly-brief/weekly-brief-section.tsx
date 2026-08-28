"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Mail, Sparkles } from "lucide-react";
import {
  getFeaturedBriefAssets,
  buildBriefText,
  getWeekOfLabel,
} from "@/lib/weekly-brief";
import { getHighlightItem } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DEFAULT_AUDIENCE = "All ePlus Realwave sellers";
const DEFAULT_FOCUS =
  "IVS market outlook + product catalog pricing for open opportunities";

export function WeeklyBriefSection() {
  const highlight = getHighlightItem();
  const featured = getFeaturedBriefAssets();
  const weekOf = getWeekOfLabel();
  const [audience, setAudience] = useState(DEFAULT_AUDIENCE);
  const [focus, setFocus] = useState(DEFAULT_FOCUS);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const briefText = useMemo(
    () =>
      buildBriefText({
        audience,
        focus,
        highlight,
        featured,
        weekOf,
      }),
    [audience, focus, highlight, featured, weekOf]
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <section className="overflow-hidden rounded-xl border border-card-border bg-card shadow-sm">
        <div className="flex flex-col gap-4 border-b border-card-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-navy dark:text-teal">
              <Mail className="h-3.5 w-3.5" />
              Week of {weekOf}
            </div>
            <h2 className="mt-2 text-xl font-bold text-navy dark:text-slate-50">
              Seller brief
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
              Copy this week&apos;s highlights into email or Slack. Audience:{" "}
              {audience}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCustomizeOpen(true)}
            >
              Customize
            </Button>
            <Button variant="accent" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy brief
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              This week&apos;s highlight
            </p>
            <div className="rounded-lg border border-card-border border-l-[3px] border-l-teal bg-background p-5 dark:bg-slate-800/40">
              <Badge variant="type">{highlight.type}</Badge>
              <h3 className="mt-3 text-lg font-bold text-navy dark:text-slate-100">
                {highlight.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90 dark:text-slate-200">
                {highlight.keyMessage}
              </p>
              <ul className="mt-4 space-y-2">
                {highlight.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-sm text-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                    {point}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="sm" className="mt-5">
                <Link
                  href={
                    highlight.publicUrl ?? `/library?asset=${highlight.id}`
                  }
                >
                  Open highlight
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Featured assets
            </p>
            <ul className="divide-y divide-card-border rounded-lg border border-card-border">
              {featured.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="type">{item.type}</Badge>
                      <p className="font-semibold text-navy dark:text-slate-100">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">
                      {item.description}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="shrink-0"
                  >
                    <Link
                      href={item.publicUrl ?? `/library?asset=${item.id}`}
                    >
                      Open
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
              Suggested next steps
            </p>
            <ul className="space-y-2 text-sm text-muted">
              {[
                "Share this week's highlight with open opportunities",
                "Pull SKUs and ePlus pricing from the product catalog for active quotes",
                "Download PDFs from the library before customer meetings",
              ].map((step) => (
                <li key={step} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Dialog open={customizeOpen} onOpenChange={setCustomizeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize this week&apos;s brief</DialogTitle>
            <DialogDescription>
              These fields are copied into the brief text. Email delivery is
              not connected yet — copy and paste into your team channel.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              setAudience(String(data.get("audience") || DEFAULT_AUDIENCE));
              setFocus(String(data.get("focus") || DEFAULT_FOCUS));
              setCustomizeOpen(false);
            }}
          >
            <div className="space-y-2">
              <label
                htmlFor="audience"
                className="text-xs font-semibold uppercase tracking-wider text-muted"
              >
                Audience
              </label>
              <Input
                id="audience"
                name="audience"
                defaultValue={audience}
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="focus"
                className="text-xs font-semibold uppercase tracking-wider text-muted"
              >
                This week&apos;s focus
              </label>
              <Input
                id="focus"
                name="focus"
                defaultValue={focus}
                required
              />
            </div>
            <div className="flex justify-end gap-3 border-t border-card-border pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCustomizeOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="accent">
                <Sparkles className="h-4 w-4" />
                Update brief
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
