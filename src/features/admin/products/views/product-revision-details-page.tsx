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
  type ProductRevisionApproveActionValues,
} from "../schemas/product-revision-action.schema";
import { ProductRevisionRejectDialog } from "../components/product-revision-reject-dialog";
import { getProductsDictionary } from "../utils/get-dictionary";

export function ProductRevisionDetailsPage({
  revisionId,
  lang,
}: {
  revisionId: string;
  lang: string;
}) {
  const detailState = useProductRevisionDetails(revisionId);
  const dict = getProductsDictionary(lang);

  const approveFields: AdminFormField<ProductRevisionApproveActionValues>[] = [
    {
      key: "notes",
      label: dict.list.actions.notes,
      placeholder: dict.list.actions.notesPlaceholder,
      type: "textarea",
    },
  ];

  const actions = useProductRevisionActions(async () => {
    await detailState.reload();
  });

  const actionError = actions.approveAction.error ?? actions.rejectAction.error;

  if (detailState.isLoading) {
    return <PageLoading label={dict.revisionDetails.loading} />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title={dict.revisionDetails.notFound}>
        <p className="text-sm text-slate-500">
          {dict.revisionDetails.notFoundDesc}
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
              dict={dict.status}
            />
            <AdminActionDialog
              confirmLabel={dict.list.actions.approve}
              description={dict.list.actions.approveDesc}
              fields={approveFields}
              isPending={actions.approveAction.isSubmitting}
              onSubmit={(payload) =>
                actions.approveAction.submit({
                  revisionId,
                  payload,
                })
              }
              schema={productRevisionApproveActionSchema}
              title={dict.list.actions.approveTitle}
              triggerLabel={dict.list.actions.approve}
              variant="primary"
            />
            <ProductRevisionRejectDialog
              isPending={actions.rejectAction.isSubmitting}
              onSubmit={(payload) =>
                actions.rejectAction.submit({
                  revisionId,
                  payload,
                })
              }
              triggerLabel={dict.list.actions.reject}
              revision={revision}
              dict={dict.rejectDialog}
            />
          </div>
        }
        description={dict.revisionDetails.description}
        eyebrow={dict.details.eyebrow}
        title={getAdminEntityTitle(revision, revisionId)}
      />
      {detailState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      {actionError ? (
        <AdminSection title={dict.list.errors.action}>
          <p className="text-sm text-rose-600">{actionError}</p>
        </AdminSection>
      ) : null}

      <AdminSection
        title={dict.revisionDetails.overview.title}
        description={dict.revisionDetails.overview.desc}
      >
        <ProductRevisionOverview revision={revision} dict={dict.revisionOverview} />
      </AdminSection>

      <AdminSection
        title={dict.revisionDetails.status.title}
        description={dict.revisionDetails.status.desc}
      >
        <ProductRevisionDecisionPanel revision={revision} dict={dict.revisionDecision} statusDict={dict.status} />
      </AdminSection>

      <AdminSection
        title={dict.revisionDetails.payload.title}
        description={dict.revisionDetails.payload.desc}
      >
        <ProductRevisionPayloadSections revision={revision} dict={dict.revisionPayload} rejectDict={dict.rejectDialog} />
      </AdminSection>

      <AdminSection
        title={dict.revisionDetails.metadata.title}
        description={dict.revisionDetails.metadata.desc}
      >
        <ProductRevisionMetadataSection revision={revision} dict={dict.revisionMetadata} />
      </AdminSection>

    </div>
  );
}



