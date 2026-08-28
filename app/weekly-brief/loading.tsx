import { PageContainer } from "@/components/layout/page-container";

export default function WeeklyBriefLoading() {
  return (
    <PageContainer>
      <div className="mb-10 h-24 animate-pulse rounded-lg bg-card" />
      <div className="h-96 animate-pulse rounded-xl border border-card-border bg-card" />
    </PageContainer>
  );
}
