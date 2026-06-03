"use client";
import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminConfirmDialog,
  AdminImagePreview,
  AdminPageHeader,
  AdminRecordGrid,
  AdminSection,
  getAdminEntityTitle,
} from "@/features/admin/shared";
import { StoreCategoryForm } from "../components/store-category-form";
import { StoreCategoryStatusBadge } from "../components/store-category-status-badge";
import { useStoreCategoryActions } from "../hooks/use-store-category-actions";
import { useStoreCategoryDetails } from "../hooks/use-store-category-details";
import { getStoreCategoriesDictionary } from "../utils/get-dictionary";

export function StoreCategoryDetailsPage({
  storeCategoryId,
  lang,
}: {
  storeCategoryId: string;
  lang: string;
}) {
  const detailState = useStoreCategoryDetails(storeCategoryId);
  const actions = useStoreCategoryActions(async () => { await detailState.reload(); });
  const dict = getStoreCategoriesDictionary(lang);

  if (detailState.isLoading) {
    return <PageLoading label={dict.details.loading} />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title={dict.details.notFound}>
        <p className="text-sm text-slate-500">
          {dict.details.notFoundDesc}
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
              dict={dict.status}
            />
            
            <AdminConfirmDialog
              confirmLabel={dict.list.actions.delete}
              description={dict.list.actions.deleteDesc}
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(storeCategoryId);
              }}
              title={dict.list.actions.deleteTitle}
              triggerLabel={dict.list.actions.delete}
              variant="danger"
            />
          </div>
        }
        description={dict.details.description}
        eyebrow={dict.details.eyebrow}
        title={getAdminEntityTitle(detailState.item, storeCategoryId)}
      />
      {detailState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <StoreCategoryForm
        description={dict.details.formUpdateDesc}
        initialValues={detailState.item}
        isSubmitting={actions.updateAction.isSubmitting}
        mode="update"
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            storeCategoryId,
            payload,
          });
        }}
        submitLabel={dict.details.formUpdateBtn}
        title={dict.details.formUpdateTitle}
        dict={dict.form}
      />
      <AdminSection description={dict.form.iconHint} title={dict.form.icon}>
        <AdminImagePreview
          alt={`${detailState.item.name} icon`}
          className="h-28 w-28"
          fallbackLabel={dict.details.iconFallback ?? "No icon"}
          src={detailState.item.iconUrl}
        />
      </AdminSection>
      <AdminSection description={dict.form.imageCategoryHint} title={dict.form.imageCategory}>
        <AdminImagePreview
          alt={`${detailState.item.name} image`}
          className="h-48 w-48 rounded-md"
          fallbackLabel={dict.details.iconFallback ?? "No image"}
          src={detailState.item.imageCategory}
        />
      </AdminSection>
      </div>
  );
}
