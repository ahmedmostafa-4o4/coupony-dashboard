"use client";
import Link from "next/link";
import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminActionDialog,
  AdminPageHeader,
  getAdminEntityTitle, AdminRecordGrid,
  AdminSection,
  createAdminDetailHref,
  type AdminFormField,
} from "@/features/admin/shared";
import { StoreForm } from "../components/store-form";
import { StoreStatusBadge } from "../components/store-status-badge";
import { useStoreActions } from "../hooks/use-store-actions";
import {
  storeApproveActionSchema,
  storeCloseActionSchema,
  storeRejectActionSchema,
  storeSuspendActionSchema,
  type StoreApproveActionValues,
  type StoreCloseActionValues,
  type StoreRejectActionValues,
  type StoreSuspendActionValues,
} from "../schemas/store-action.schema";
import { useStoreDetails } from "../hooks/use-store-details";

const approveFields: AdminFormField<StoreApproveActionValues>[] = [
  {
    key: "adminNotes",
    label: "Admin notes",
    placeholder: "Optional approval note.",
    type: "textarea",
  },
];

const rejectFields: AdminFormField<StoreRejectActionValues>[] = [
  {
    key: "rejectionReason",
    label: "Rejection reason",
    placeholder: "Why was this store rejected?",
    type: "textarea",
  },
  {
    key: "adminNotes",
    label: "Admin notes",
    placeholder: "Optional internal note.",
    type: "textarea",
  },
];

const suspendFields: AdminFormField<StoreSuspendActionValues>[] = [
  {
    key: "reason",
    label: "Suspend reason",
    placeholder: "Explain why this store is being suspended.",
    type: "textarea",
  },
];

const closeFields: AdminFormField<StoreCloseActionValues>[] = [
  {
    key: "reason",
    label: "Close reason",
    placeholder: "Optional reason for closing the store.",
    type: "textarea",
  },
];

export function StoreDetailsPage({
  storeId,
  lang,
}: {
  storeId: string;
  lang: string;
}) {
  const detailState = useStoreDetails(storeId);
  
  const actions = useStoreActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading store details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Store not found">
        <p className="text-sm text-slate-500">
          The backend did not return a store for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StoreStatusBadge value={detailState.item.status} />
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(lang, "stores", storeId, "billing")}
            >
              Store billing profile
            </Link>
            <AdminActionDialog
              confirmLabel="Approve"
              description="Optionally record moderator notes when approving this store."
              fields={approveFields}
              isPending={actions.approveAction.isSubmitting}
              onSubmit={(payload) =>
                actions.approveAction.submit({
                  payload,
                  storeId,
                })
              }
              schema={storeApproveActionSchema}
              title="Approve Store"
              triggerLabel="Approve"
              variant="primary"
            />
            <AdminActionDialog
              confirmLabel="Reject"
              description="Provide the rejection reason required by the moderation endpoint."
              fields={rejectFields}
              isPending={actions.rejectAction.isSubmitting}
              onSubmit={(payload) =>
                actions.rejectAction.submit({
                  payload,
                  storeId,
                })
              }
              schema={storeRejectActionSchema}
              title="Reject Store"
              triggerLabel="Reject"
              variant="danger"
            />
            <AdminActionDialog
              confirmLabel="Suspend"
              description="Provide the suspend reason required by the store moderation contract."
              fields={suspendFields}
              isPending={actions.suspendAction.isSubmitting}
              onSubmit={(payload) =>
                actions.suspendAction.submit({
                  payload,
                  storeId,
                })
              }
              schema={storeSuspendActionSchema}
              title="Suspend Store"
              triggerLabel="Suspend"
              variant="danger"
            />
            <AdminActionDialog
              confirmLabel="Close"
              description="Optionally record why this store is being closed."
              fields={closeFields}
              isPending={actions.closeAction.isSubmitting}
              onSubmit={(payload) =>
                actions.closeAction.submit({
                  payload,
                  storeId,
                })
              }
              schema={storeCloseActionSchema}
              title="Close Store"
              triggerLabel="Close"
              variant="danger"
            />
          </div>
        }
        description="Inspect merchant details, moderation history, and operational actions."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, storeId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <StoreForm
        description="Update merchant moderation, billing, and contact fields."
        initialValues={detailState.item}
        isSubmitting={actions.updateAction.isSubmitting}
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            storeId,
            payload,
          });
        }}
        submitLabel="Update store"
        title="Update store"
      />
      <AdminSection description="Structured fields returned for this record." title="Store details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
