"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ContentLibrary } from "@/components/content/content-library";
import { ContentModal } from "@/components/content/content-modal";
import { getItemById } from "@/lib/content";

export function LibraryClient() {
  const searchParams = useSearchParams();
  const assetId = searchParams.get("asset");
  const [deepLinkItemId, setDeepLinkItemId] = useState<string | null>(null);

  useEffect(() => {
    if (assetId) {
      setDeepLinkItemId(assetId);
    }
  }, [assetId]);

  const deepLinkItem = deepLinkItemId
    ? getItemById(deepLinkItemId) ?? null
    : null;

  return (
    <>
      <ContentLibrary />
      <ContentModal
        item={deepLinkItem}
        open={deepLinkItem !== null}
        onOpenChange={(open) => {
          if (!open) setDeepLinkItemId(null);
        }}
      />
    </>
  );
}
