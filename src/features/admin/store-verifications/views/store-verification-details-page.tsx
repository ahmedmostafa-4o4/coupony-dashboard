"use client";
import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminActionDialog,
  AdminConfirmDialog,
  AdminPageHeader,
  getAdminEntityTitle, AdminRecordGrid,
  AdminSection,
  type AdminFormField,
} from "@/features/admin/shared";
import { StoreVerificationStatusBadge } from "../components/store-verification-status-badge";
import { useStoreVerificationActions } from "../hooks/use-store-verification-actions";
import {
  storeVerificationRejectActionSchema,
  type StoreVerificationRejectActionValues,
} from "../schemas/store-verification-action.schema";
import { useStoreVerificationDetails } from "../hooks/use-store-verification-details";

const rejectFields: AdminFormField<StoreVerificationRejectActionValues>[] = [
  {
    key: "rejectionReason",
    label: "Rejection reason",
    placeholder: "Explain why this verification was rejected.",
    type: "textarea",
  },
];

export function StoreVerificationDetailsPage({
  verificationId,
  lang,
}: {
  verificationId: string;
  lang: string;
}) {
  const detailState = useStoreVerificationDetails(verificationId);
  void lang;
  const actions = useStoreVerificationActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading store verification details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Store Verification not found">
        <p className="text-sm text-slate-500">
          The backend did not return a store verification for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StoreVerificationStatusBadge value={detailState.item.status} />
            
            <AdminConfirmDialog
              confirmLabel="Approve"
              description="This will call the mapped admin endpoint for the selected store verification."
              isPending={actions.approveAction.isSubmitting}
              onConfirm={async () => {
                await actions.approveAction.submit(verificationId);
              }}
              title="Approve Store Verification"
              triggerLabel="Approve"
              variant="primary"
            />
            <AdminActionDialog
              confirmLabel="Reject"
              description="Provide the rejection reason required by the verification endpoint."
              fields={rejectFields}
              isPending={actions.rejectAction.isSubmitting}
              onSubmit={(payload) =>
                actions.rejectAction.submit({
                  payload,
                  verificationId,
                })
              }
              schema={storeVerificationRejectActionSchema}
              title="Reject Store Verification"
              triggerLabel="Reject"
              variant="danger"
            />
          </div>
        }
        description="Inspect verification payloads and moderation actions."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, verificationId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      
      <AdminSection description="Structured fields returned for this record." title="Store Verification details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
