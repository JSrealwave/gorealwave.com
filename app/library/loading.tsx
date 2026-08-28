import { PageContainer } from "@/components/layout/page-container";

export default function LibraryLoading() {
  return (
    <PageContainer>
      <div className="mb-10 h-24 animate-pulse rounded-lg bg-card" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-60 animate-pulse rounded-xl border border-card-border bg-card"
          />
        ))}
      </div>
    </PageContainer>
  );
}
