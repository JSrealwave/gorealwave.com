"use client";

import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function WeeklyBriefSection() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="rounded-lg border border-card-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-md border border-teal/20 bg-teal/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy dark:border-teal/30 dark:bg-teal/10 dark:text-teal">
              <Mail className="h-3.5 w-3.5" />
              Weekly Brief
            </div>
            <h2 className="text-xl font-bold text-navy dark:text-slate-50">
              Generate This Week&apos;s Brief
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              Compose a seller-ready email with the latest Realwave highlights,
              new assets, and priority talking points. This is a Phase 1 mock —
              the email composer connects in a future release.
            </p>
          </div>

          <Button
            variant="accent"
            size="lg"
            className="shrink-0"
            onClick={() => {
              setSubmitted(false);
              setOpen(true);
            }}
          >
            <Sparkles className="h-4 w-4" />
            Generate This Week&apos;s Brief
          </Button>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Weekly Brief Generator</DialogTitle>
            <DialogDescription>
              Preview the brief workflow. In Phase 2, this will connect to your
              email composer and asset feed.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="rounded-md border border-card-border border-l-[3px] border-l-teal bg-background px-5 py-6 text-center dark:bg-slate-800/40">
              <Sparkles className="mx-auto mb-3 h-7 w-7 text-teal" />
              <p className="font-bold text-navy dark:text-slate-50">
                Brief queued for generation
              </p>
              <p className="mt-1 text-sm text-muted">
                Your weekly brief will be ready shortly. Email delivery coming
                in Phase 2.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="audience"
                  className="text-xs font-semibold uppercase tracking-wider text-muted"
                >
                  Audience
                </label>
                <Input
                  id="audience"
                  placeholder="e.g. All ePlus Realwave sellers"
                  defaultValue="All ePlus Realwave sellers"
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
                  placeholder="e.g. Spatial Intelligence launch, Retail one-pager"
                  defaultValue="Spatial Intelligence overview + Retail one-pager"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 border-t border-card-border pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="accent">
                  Generate Brief
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
