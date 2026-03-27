"use client";

import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminPageHeader,
  AdminSection,
} from "@/features/admin/shared";

import { RedemptionTimeline } from "../components/redemption-timeline";
import { useRedemptionDetails } from "../hooks/use-redemption-details";
import { useRedemptionTimeline } from "../hooks/use-redemption-timeline";

export function RedemptionTimelinePage({
  lang,
  redemptionId,
}: {
  lang: string;
  redemptionId: string;
}) {
  const detailState = useRedemptionDetails(redemptionId);
  const timelineState = useRedemptionTimeline(redemptionId);

  void lang;

  if (detailState.isLoading || timelineState.isLoading) {
    return <PageLoading label="Loading redemption timeline..." />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description="Investigate the event sequence returned for this redemption."
        eyebrow="Operations"
        title={`Redemption Timeline ${redemptionId}`}
      />
      {detailState.error || timelineState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">
            {detailState.error ?? timelineState.error}
          </p>
        </AdminSection>
      ) : null}
      <RedemptionTimeline items={timelineState.items} />
    </div>
  );
}
