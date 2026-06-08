"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, KpiCard, AdminConfirmDialog, createAdminDetailHref, AdminPagination } from "@/features/admin/shared";
import { TagsIcon } from "lucide-react";
import { StoreCategoriesFilters } from "../components/store-categories-filters";
import { StoreCategoryForm } from "../components/store-category-form";
import { StoreCategoriesTable } from "../components/store-categories-table";
import { useStoreCategoryActions } from "../hooks/use-store-category-actions";
import { useStoreCategoriesList } from "../hooks/use-store-categories-list";
import type { StoreCategoriesListFilters } from "../types/store-category.types";
import { getStoreCategoriesDictionary } from "../utils/get-dictionary";

const defaultFilters: StoreCategoriesListFilters = { search: "", status: "all", page: 1, perPage: 15 };

export function StoreCategoriesListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<StoreCategoriesListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  
  
  const listState = useStoreCategoriesList(filters);
  const actions = useStoreCategoryActions(async () => { await listState.reload(); });
  const dict = getStoreCategoriesDictionary(lang);

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
          icon={<TagsIcon />}
        />
      </div>
      <StoreCategoriesFilters
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
        <StoreCategoryForm
          description={dict.list.form.createDescription}
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
      <StoreCategoriesTable
        items={listState.items}
        dict={dict.table}
        statusDict={dict.status}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "storeCategories",
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
