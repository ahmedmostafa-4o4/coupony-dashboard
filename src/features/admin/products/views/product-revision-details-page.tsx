"use client";

import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminActionDialog,
  AdminPageHeader,
  AdminRecordGrid,
  AdminSection,
  getAdminEntityTitle,
  type AdminFormField,
} from "@/features/admin/shared";

import { ProductRevisionDecisionPanel } from "../components/product-revision-decision-panel";
import { ProductRevisionMetadataSection } from "../components/product-revision-metadata-section";
import { ProductRevisionOverview } from "../components/product-revision-overview";
import { ProductRevisionPayloadSections } from "../components/product-revision-payload-sections";
import { ProductRevisionStatusBadge } from "../components/product-revision-status-badge";
import { useProductRevisionActions } from "../hooks/use-product-revision-actions";
import { useProductRevisionDetails } from "../hooks/use-product-revision-details";
import {
  productRevisionApproveActionSchema,
  productRevisionRejectActionSchema,
  type ProductRevisionApproveActionValues,
  type ProductRevisionRejectActionValues,
} from "../schemas/product-revision-action.schema";

const approveFields: AdminFormField<ProductRevisionApproveActionValues>[] = [
  {
    key: "notes",
    label: "Notes",
    placeholder: "Optional approval note for the audit trail.",
    type: "textarea",
  },
];

const rejectFields: AdminFormField<ProductRevisionRejectActionValues>[] = [
  {
    key: "reason",
    label: "Reason",
    placeholder: "Explain why this revision is being rejected.",
    type: "textarea",
  },
  {
    key: "notes",
    label: "Notes",
    placeholder: "Optional internal note.",
    type: "textarea",
  },
];

export function ProductRevisionDetailsPage({
  revisionId,
  lang,
}: {
  revisionId: string;
  lang: string;
}) {
  const detailState = useProductRevisionDetails(revisionId);
  void lang;
  const actions = useProductRevisionActions(async () => {
    await detailState.reload();
  });

  const actionError = actions.approveAction.error ?? actions.rejectAction.error;

  if (detailState.isLoading) {
    return <PageLoading label="Loading product revision details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Product Revision not found">
        <p className="text-sm text-slate-500">
          The backend did not return a product revision for this route.
        </p>
      </AdminSection>
    );
  }

  const revision = detailState.item;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <ProductRevisionStatusBadge
              value={revision.statusLabel ?? revision.status}
            />
            <AdminActionDialog
              confirmLabel="Approve"
              description="Optionally include review notes before approving this revision."
              fields={approveFields}
              isPending={actions.approveAction.isSubmitting}
              onSubmit={(payload) =>
                actions.approveAction.submit({
                  revisionId,
                  payload,
                })
              }
              schema={productRevisionApproveActionSchema}
              title="Approve Product Revision"
              triggerLabel="Approve"
              variant="primary"
            />
            <AdminActionDialog
              confirmLabel="Reject"
              description="Provide the required rejection reason and any optional notes."
              fields={rejectFields}
              isPending={actions.rejectAction.isSubmitting}
              onSubmit={(payload) =>
                actions.rejectAction.submit({
                  revisionId,
                  payload,
                })
              }
              schema={productRevisionRejectActionSchema}
              title="Reject Product Revision"
              triggerLabel="Reject"
              variant="danger"
            />
          </div>
        }
        description="Inspect the submitted change set before approving or rejecting it."
        eyebrow="Admin details"
        title={getAdminEntityTitle(revision, revisionId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      {actionError ? (
        <AdminSection title="Action error">
          <p className="text-sm text-rose-600">{actionError}</p>
        </AdminSection>
      ) : null}

      <AdminSection
        title="Revision overview"
        description="High-level revision summary for quick admin review."
      >
        <ProductRevisionOverview revision={revision} />
      </AdminSection>

      <AdminSection
        title="Revision status"
        description="Moderation state and current decision context."
      >
        <ProductRevisionDecisionPanel revision={revision} />
      </AdminSection>

      <AdminSection
        title="Product payload overview"
        description="Readable breakdown of the submitted product data."
      >
        <ProductRevisionPayloadSections revision={revision} />
      </AdminSection>

      <AdminSection
        title="Review metadata"
        description="Reference metadata and counts returned with the revision."
      >
        <ProductRevisionMetadataSection revision={revision} />
      </AdminSection>

    </div>
  );
}


