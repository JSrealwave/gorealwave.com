import { PageContainer } from "@/components/layout/page-container";

export default function ProductsLoading() {
  return (
    <PageContainer>
      <div className="mb-10 h-24 animate-pulse rounded-lg bg-card" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-xl border border-card-border bg-card"
          />
        ))}
      </div>
    </PageContainer>
  );
}
