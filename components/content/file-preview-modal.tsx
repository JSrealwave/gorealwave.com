"use client";

import { useEffect, useState } from "react";
import { ExternalLink, FileDown } from "lucide-react";
import type { FilePreview } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FilePreviewModalProps {
  preview: FilePreview | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FilePreviewModal({
  preview,
  open,
  onOpenChange,
}: FilePreviewModalProps) {
  const [unavailable, setUnavailable] = useState(false);
  const src = preview?.src ?? "";
  const title = preview?.title ?? "Preview";
  const kind = preview?.type;
  const showMedia = open && Boolean(preview);

  useEffect(() => {
    if (!open || !src) {
      setUnavailable(!src);
      return;
    }

    const controller = new AbortController();
    setUnavailable(false);

    fetch(src, { method: "HEAD", signal: controller.signal })
      .then((response) => {
        if (response.status === 404 || response.status === 410) {
          setUnavailable(true);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        // HEAD is optional; iframe/video still try to load.
      });

    return () => controller.abort();
  }, [open, src]);

  return (
    <Dialog open={open && preview !== null} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex w-[min(96vw,72rem)] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-[min(96vw,72rem)]"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          const target = event.currentTarget;
          if (!(target instanceof HTMLElement)) return;
          const closeButton = target.querySelector("button");
          if (closeButton instanceof HTMLElement) closeButton.focus();
        }}
        onEscapeKeyDown={() => onOpenChange(false)}
      >
        <DialogHeader className="space-y-3 px-6 pb-3 pt-6 pr-12">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {kind === "video"
              ? "Video preview"
              : kind === "drawing"
                ? "Drawing preview"
                : "PDF preview"}
          </DialogDescription>
          {src ? (
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={src} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Open in new tab
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={src} download>
                  <FileDown className="h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>
          ) : null}
        </DialogHeader>

        <div className="min-h-[70vh] flex-1 bg-slate-950/40 px-6 pb-6">
          {!showMedia || !kind ? null : unavailable || !src ? (
            <UnavailableNotice src={src} title={title} />
          ) : kind === "pdf" ? (
            <iframe
              src={`${src}#toolbar=1&navpanes=0`}
              className="h-full min-h-[70vh] w-full rounded-lg border border-card-border bg-white"
              title={title}
              tabIndex={-1}
            />
          ) : kind === "video" ? (
            <video
              className="h-full min-h-[70vh] w-full rounded-lg border border-card-border bg-black object-contain"
              src={src}
              controls
              preload="metadata"
              onError={() => setUnavailable(true)}
            >
              Your browser does not support embedded video.
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- static public drawing
            <img
              src={src}
              alt={title}
              className="mx-auto h-full min-h-[70vh] w-full rounded-lg border border-card-border bg-slate-950 object-contain"
              onError={() => setUnavailable(true)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UnavailableNotice({ src, title }: { src: string; title: string }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-card-border bg-card px-6 py-10 text-center">
      <p className="text-sm font-bold text-navy dark:text-slate-100">
        Preview isn’t available
      </p>
      <p className="max-w-md text-sm text-muted">
        {src
          ? `This file could not be loaded for in-page preview (${title}).`
          : "This asset does not have a file URL yet."}
      </p>
      {src ? (
        <Button asChild variant="accent" size="sm">
          <a href={src} download>
            <FileDown className="h-4 w-4" />
            Download
          </a>
        </Button>
      ) : null}
    </div>
  );
}
