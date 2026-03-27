"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminRecordGrid, AdminSection, AdminConfirmDialog } from "@/features/admin/shared";
import { CategoryForm } from "../components/category-form";
import { CategoryStatusBadge } from "../components/category-status-badge";
import { useCategoryActions } from "../hooks/use-category-actions";
import { useCategoryDetails } from "../hooks/use-category-details";

export function CategoryDetailsPage({
  categoryId,
  lang,
}: {
  categoryId: string;
  lang: string;
}) {
  const detailState = useCategoryDetails(categoryId);
  void lang;
  const actions = useCategoryActions(async () => { await detailState.reload(); });

  if (detailState.isLoading) {
    return <PageLoading label="Loading category details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Category not found">
        <p className="text-sm text-slate-500">
          The backend did not return a category for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <CategoryStatusBadge
              value={detailState.item.isActive ? "active" : "inactive"}
            />
            
            <AdminConfirmDialog
              confirmLabel="Delete"
              description="This will call the mapped admin endpoint for the selected category."
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(categoryId);
              }}
              title="Delete Category"
              triggerLabel="Delete"
              variant="danger"
            />
          </div>
        }
        description="Fallback details view until the backend exposes category lookups."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, categoryId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <CategoryForm
        description="Update the category fields returned by the fallback detail adapter."
        initialValues={detailState.item}
        isSubmitting={actions.updateAction.isSubmitting}
        mode="update"
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            categoryId,
            payload,
          });
        }}
        submitLabel="Update category"
        title="Update category"
      />
      <AdminSection description="Structured fields returned for this record." title="Category details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
