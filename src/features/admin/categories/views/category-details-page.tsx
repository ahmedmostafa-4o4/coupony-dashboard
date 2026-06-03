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
import { CategoryForm } from "../components/category-form";
import { CategoryStatusBadge } from "../components/category-status-badge";
import { useCategoryActions } from "../hooks/use-category-actions";
import { useCategoryDetails } from "../hooks/use-category-details";
import { useCategoriesList } from "../hooks/use-categories-list";
import { getCategoriesDictionary } from "../utils/get-dictionary";

export function CategoryDetailsPage({
  categoryId,
  lang,
}: {
  categoryId: string;
  lang: string;
}) {
  const detailState = useCategoryDetails(categoryId);
  const categoriesState = useCategoriesList({ status: "all" });
  const actions = useCategoryActions(async () => { await detailState.reload(); });
  const dict = getCategoriesDictionary(lang);

  if (detailState.isLoading || categoriesState.isLoading) {
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

  const parentCategory = detailState.item.parentId
    ? categoriesState.items.find((c) => String(c.id) === String(detailState.item?.parentId))
    : null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <CategoryStatusBadge
              value={detailState.item.isActive ? "active" : "inactive"}
              dict={dict.status}
            />
            
            <AdminConfirmDialog
              confirmLabel={dict.list.actions.delete}
              description={dict.list.actions.deleteDesc}
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(categoryId);
              }}
              title={dict.list.actions.deleteTitle}
              triggerLabel={dict.list.actions.delete}
              variant="danger"
            />
          </div>
        }
        description={dict.details.description}
        eyebrow={dict.details.eyebrow}
        title={getAdminEntityTitle(detailState.item, categoryId)}
      />
      {detailState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      <CategoryForm
        description={dict.details.formUpdateDesc}
        initialValues={detailState.item}
        categoriesList={categoriesState.items}
        isSubmitting={actions.updateAction.isSubmitting}
        mode="update"
        onSubmit={async (payload) => {
          await actions.updateAction.submit({
            categoryId,
            payload,
          });
        }}
        submitLabel={dict.details.formUpdateBtn}
        title={dict.details.formUpdateTitle}
        dict={dict.form}
      />
      <AdminSection description={dict.details.iconDesc} title={dict.details.iconTitle}>
        <AdminImagePreview
          alt={`${detailState.item.name} icon`}
          className="h-28 w-28"
          fallbackLabel={dict.details.iconFallback}
          src={detailState.item.iconUrl}
        />
      </AdminSection>
      <AdminSection description={dict.details.hierarchyDesc} title={dict.details.hierarchyTitle}>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500 mb-1 font-medium">{dict.details.parentCategory}</p>
          {parentCategory ? (
            <div className="flex items-center gap-3">
              {parentCategory.iconUrl ? (
                <img
                  src={parentCategory.iconUrl}
                  alt="Parent Icon"
                  className="w-10 h-10 rounded-full object-cover border border-slate-100"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <span className="text-slate-400 text-xs">{dict.details.noIcon}</span>
                </div>
              )}
              <div>
                <p className="font-medium text-slate-900">{parentCategory.nameEn} / {parentCategory.nameAr}</p>
                <p className="text-xs text-slate-500">ID: {parentCategory.id}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium text-slate-900">{dict.details.topLevel}</p>
          )}
        </div>
      </AdminSection>
      </div>
  );
}

