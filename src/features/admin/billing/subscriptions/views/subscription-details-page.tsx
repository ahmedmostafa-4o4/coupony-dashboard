"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminRecordGrid, AdminSection } from "@/features/admin/shared";
import { SubscriptionForm } from "../components/subscription-form";
import { SubscriptionStatusBadge } from "../components/subscription-status-badge";
import { useSubscriptionActions } from "../hooks/use-subscription-actions";
import { useSubscriptionDetails } from "../hooks/use-subscription-details";

export function SubscriptionDetailsPage({
  subscriptionId,
  lang,
}: {
  subscriptionId: string;
  lang: string;
}) {
  const detailState = useSubscriptionDetails(subscriptionId);
  void lang;
  const actions = useSubscriptionActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading subscription details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Subscription not found">
        <p className="text-sm text-slate-500">
          The backend did not return a subscription for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <SubscriptionStatusBadge value={detailState.item.status} />
            
            
          </div>
        }
        description="Fallback details view until the backend exposes a subscription lookup endpoint."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, subscriptionId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <SubscriptionForm
        description="Update subscription timing and collection settings with typed request fields."
        initialValues={detailState.item}
        isSubmitting={actions.updateAction.isSubmitting}
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            subscriptionId,
            payload,
          });
        }}
        submitLabel="Update subscription"
        title="Update subscription"
      />
      <AdminSection description="Structured fields returned for this record." title="Subscription details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
