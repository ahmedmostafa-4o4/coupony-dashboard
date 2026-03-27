"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminRecordGrid, AdminSection, AdminConfirmDialog } from "@/features/admin/shared";
import { SubscriptionPlanForm } from "../components/subscription-plan-form";
import { SubscriptionPlanStatusBadge } from "../components/subscription-plan-status-badge";
import { useSubscriptionPlanActions } from "../hooks/use-subscription-plan-actions";
import { useSubscriptionPlanDetails } from "../hooks/use-subscription-plan-details";

export function SubscriptionPlanDetailsPage({
  planId,
  lang,
}: {
  planId: string;
  lang: string;
}) {
  const detailState = useSubscriptionPlanDetails(planId);
  void lang;
  const actions = useSubscriptionPlanActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading subscription plan details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Subscription Plan not found">
        <p className="text-sm text-slate-500">
          The backend did not return a subscription plan for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <SubscriptionPlanStatusBadge
              value={detailState.item.isActive ? "active" : "inactive"}
            />
            
            <AdminConfirmDialog
              confirmLabel="Delete"
              description="This will call the mapped admin endpoint for the selected subscription plan."
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(planId);
              }}
              title="Delete Subscription Plan"
              triggerLabel="Delete"
              variant="danger"
            />
          </div>
        }
        description="Fallback details view until the backend exposes a subscription plan lookup endpoint."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, planId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <SubscriptionPlanForm
        description="Update plan pricing and capacity metadata using typed fields."
        initialValues={detailState.item}
        isSubmitting={actions.updateAction.isSubmitting}
        mode="update"
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            planId,
            payload,
          });
        }}
        submitLabel="Update plan"
        title="Update plan"
      />
      <AdminSection description="Structured fields returned for this record." title="Subscription Plan details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
