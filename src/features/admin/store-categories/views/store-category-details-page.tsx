"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminRecordGrid, AdminSection, AdminConfirmDialog } from "@/features/admin/shared";
import { StoreCategoryForm } from "../components/store-category-form";
import { StoreCategoryStatusBadge } from "../components/store-category-status-badge";
import { useStoreCategoryActions } from "../hooks/use-store-category-actions";
import { useStoreCategoryDetails } from "../hooks/use-store-category-details";

export function StoreCategoryDetailsPage({
  storeCategoryId,
  lang,
}: {
  storeCategoryId: string;
  lang: string;
}) {
  const detailState = useStoreCategoryDetails(storeCategoryId);
  void lang;
  const actions = useStoreCategoryActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading store category details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Store Category not found">
        <p className="text-sm text-slate-500">
          The backend did not return a store category for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StoreCategoryStatusBadge
              value={detailState.item.isActive ? "active" : "inactive"}
            />
            
            <AdminConfirmDialog
              confirmLabel="Delete"
              description="This will call the mapped admin endpoint for the selected store category."
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(storeCategoryId);
              }}
              title="Delete Store Category"
              triggerLabel="Delete"
              variant="danger"
            />
          </div>
        }
        description="Fallback details view until the backend exposes store category lookups."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, storeCategoryId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <StoreCategoryForm
        description="Update the store-category fields returned by the fallback detail adapter."
        initialValues={detailState.item}
        isSubmitting={actions.updateAction.isSubmitting}
        mode="update"
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            storeCategoryId,
            payload,
          });
        }}
        submitLabel="Update store category"
        title="Update store category"
      />
      <AdminSection description="Structured fields returned for this record." title="Store Category details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
