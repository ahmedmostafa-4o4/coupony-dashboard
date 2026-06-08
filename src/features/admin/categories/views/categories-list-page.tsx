"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, KpiCard, AdminConfirmDialog, createAdminDetailHref, AdminPagination } from "@/features/admin/shared";
import { FolderIcon } from "lucide-react";
import { CategoriesFilters } from "../components/categories-filters";
import { CategoryForm } from "../components/category-form";
import { CategoriesTable } from "../components/categories-table";
import { useCategoryActions } from "../hooks/use-category-actions";
import { useCategoriesList } from "../hooks/use-categories-list";
import type { CategoriesListFilters } from "../types/category.types";
import { getCategoriesDictionary } from "../utils/get-dictionary";

const defaultFilters: CategoriesListFilters = { search: "", status: "all", page: 1, perPage: 15 };

export function CategoriesListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<CategoriesListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  
  const listState = useCategoriesList(filters);
  const allCategoriesState = useCategoriesList({ status: "all" });
  const actions = useCategoryActions(async () => { await listState.reload(); });
  const dict = getCategoriesDictionary(lang);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
            <Button
              key="createAction"
              variant="secondary"
              onClick={() => setActiveComposer("createAction")}
            >
              {dict.list.create}
            </Button>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              {dict.list.reload}
            </Button>
          </>
        }
        description={dict.list.description}
        eyebrow={dict.list.eyebrow}
        title={dict.list.title}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          description={dict.list.stats.totalHint}
          title={dict.list.stats.total}
          value={listState.total}
          icon={<FolderIcon />}
        />
      </div>
      <CategoriesFilters
        onChange={(newFilters) => setFilters({ ...newFilters, page: 1 })}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
        dict={dict.filters}
      />
      {listState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
      {activeComposer === "createAction" ? (
        <CategoryForm
          description={dict.list.form.createDescription}
          categoriesList={allCategoriesState.items}
          isSubmitting={actions.createAction.isSubmitting}
          mode="create"
          onSubmit={async (payload) => {
            const result = await actions.createAction.submit(payload);

            if (result) {
              setActiveComposer(null);
            }
          }}
          submitLabel={dict.list.form.createBtn}
          title={dict.list.form.createTitle}
          dict={dict.form}
        />
      ) : null}
      <CategoriesTable
        items={listState.items}
        dict={dict.table}
        statusDict={dict.status}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "categories",
                String(item.id ?? ""),
              )}
            >
              {dict.list.actions.view}
            </Link>
            <AdminConfirmDialog
              confirmLabel={dict.list.actions.delete}
              description={dict.list.actions.deleteDesc}
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(
                  String(item.id ?? ""),
                );
              }}
              title={dict.list.actions.deleteTitle}
              triggerLabel={dict.list.actions.delete}
              variant="danger"
            />
          </div>
        )}
      />
      <AdminPagination
        currentPage={Number(filters.page) || 1}
        lastPage={Number(listState.meta?.lastPage) || 0}
        perPage={Number(filters.perPage) || 15}
        onPageChange={(page) => setFilters({ ...filters, page })}
        onPerPageChange={(perPage) =>
          setFilters({ ...filters, perPage, page: 1 })
        }
      />
    </div>
  );
}
