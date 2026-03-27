"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminRecordGrid, AdminSection, AdminConfirmDialog } from "@/features/admin/shared";
import { CommissionStatusBadge } from "../components/commission-status-badge";
import { useCommissionActions } from "../hooks/use-commission-actions";
import { useCommissionDetails } from "../hooks/use-commission-details";

export function CommissionDetailsPage({
  commissionId,
  lang,
}: {
  commissionId: string;
  lang: string;
}) {
  const detailState = useCommissionDetails(commissionId);
  void lang;
  const actions = useCommissionActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading commission details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Commission not found">
        <p className="text-sm text-slate-500">
          The backend did not return a commission for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <CommissionStatusBadge value={detailState.item.status} />
            
            <AdminConfirmDialog
              confirmLabel="Mark invoiced"
              description="This will call the mapped admin endpoint for the selected commission."
              isPending={actions.markInvoicedAction.isSubmitting}
              onConfirm={async () => {
                await actions.markInvoicedAction.submit({ commissionId });
              }}
              title="Mark invoiced Commission"
              triggerLabel="Mark invoiced"
              variant="primary"
            />
            <AdminConfirmDialog
              confirmLabel="Mark paid"
              description="This will call the mapped admin endpoint for the selected commission."
              isPending={actions.markPaidAction.isSubmitting}
              onConfirm={async () => {
                await actions.markPaidAction.submit({ commissionId });
              }}
              title="Mark paid Commission"
              triggerLabel="Mark paid"
              variant="primary"
            />
            <AdminConfirmDialog
              confirmLabel="Waive"
              description="This will call the mapped admin endpoint for the selected commission."
              isPending={actions.waiveAction.isSubmitting}
              onConfirm={async () => {
                await actions.waiveAction.submit({ commissionId });
              }}
              title="Waive Commission"
              triggerLabel="Waive"
              variant="danger"
            />
          </div>
        }
        description="Fallback details view until the backend exposes dedicated commission lookups."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, commissionId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      
      <AdminSection description="Structured fields returned for this record." title="Commission details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
