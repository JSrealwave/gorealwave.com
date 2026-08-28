import type { Metadata } from "next";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { products } from "@/lib/products";
import { ProductsClient } from "./products-client";

export const metadata: Metadata = {
  title: "Product Catalog | Realwave Enablement Hub",
  description:
    "Interactive Realwave product catalog and ePlus pricing for sellers and partners.",
};

export default async function ProductsPage() {
  await auth();

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Sales Enablement"
        title="Product Catalog"
        lead={`${products.length} SKUs with transparent ePlus pricing for RealEdge, RealIntelligence, RealIQ, and RealVue. Search, filter, and copy a quote request for your deal team.`}
      />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsClient />
      </Suspense>
    </PageContainer>
  );
}

function ProductsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-80 animate-pulse rounded-xl border border-card-border bg-card"
        />
      ))}
    </div>
  );
}
