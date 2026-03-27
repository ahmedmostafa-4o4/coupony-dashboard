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
import { OfferStatusBadge } from "../components/offer-status-badge";
import { useOfferActions } from "../hooks/use-offer-actions";
import {
  offerApproveActionSchema,
  offerArchiveActionSchema,
  offerRejectActionSchema,
  type OfferApproveActionValues,
  type OfferArchiveActionValues,
  type OfferRejectActionValues,
} from "../schemas/offer-action.schema";
import { useOfferDetails } from "../hooks/use-offer-details";

const approveFields: AdminFormField<OfferApproveActionValues>[] = [
  {
    key: "approvalNotes",
    label: "Approval notes",
    placeholder: "Optional approval note.",
    type: "textarea",
  },
];

const rejectFields: AdminFormField<OfferRejectActionValues>[] = [
  {
    key: "approvalNotes",
    label: "Rejection notes",
    placeholder: "Explain why this offer is rejected.",
    type: "textarea",
  },
];

const archiveFields: AdminFormField<OfferArchiveActionValues>[] = [
  {
    key: "reason",
    label: "Archive reason",
    placeholder: "Optional archive reason.",
    type: "textarea",
  },
];

export function OfferDetailsPage({
  offerId,
  lang,
}: {
  offerId: string;
  lang: string;
}) {
  const detailState = useOfferDetails(offerId);
  void lang;
  const actions = useOfferActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading offer details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Offer not found">
        <p className="text-sm text-slate-500">
          The backend did not return a offer for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <OfferStatusBadge value={detailState.item.status} />
            
            <AdminActionDialog
              confirmLabel="Approve"
              description="Optionally record moderator notes for the approval."
              fields={approveFields}
              isPending={actions.approveAction.isSubmitting}
              onSubmit={(payload) =>
                actions.approveAction.submit({
                  offerId,
                  payload,
                })
              }
              schema={offerApproveActionSchema}
              title="Approve Offer"
              triggerLabel="Approve"
              variant="primary"
            />
            <AdminActionDialog
              confirmLabel="Reject"
              description="Rejection notes are required by the moderation endpoint."
              fields={rejectFields}
              isPending={actions.rejectAction.isSubmitting}
              onSubmit={(payload) =>
                actions.rejectAction.submit({
                  offerId,
                  payload,
                })
              }
              schema={offerRejectActionSchema}
              title="Reject Offer"
              triggerLabel="Reject"
              variant="danger"
            />
            <AdminConfirmDialog
              confirmLabel="Publish"
              description="This will call the mapped admin endpoint for the selected offer."
              isPending={actions.publishAction.isSubmitting}
              onConfirm={async () => {
                await actions.publishAction.submit(offerId);
              }}
              title="Publish Offer"
              triggerLabel="Publish"
              variant="primary"
            />
            <AdminActionDialog
              confirmLabel="Archive"
              description="Optionally record why this offer is being archived."
              fields={archiveFields}
              isPending={actions.archiveAction.isSubmitting}
              onSubmit={(payload) =>
                actions.archiveAction.submit({
                  offerId,
                  payload,
                })
              }
              schema={offerArchiveActionSchema}
              title="Archive Offer"
              triggerLabel="Archive"
              variant="danger"
            />
          </div>
        }
        description="Inspect moderation state and perform publishing actions."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, offerId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      
      <AdminSection description="Structured fields returned for this record." title="Offer details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
