"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { StoreCategoriesFilters } from "../components/store-categories-filters";
import { StoreCategoryForm } from "../components/store-category-form";
import { StoreCategoriesTable } from "../components/store-categories-table";
import { useStoreCategoryActions } from "../hooks/use-store-category-actions";
import { useStoreCategoriesList } from "../hooks/use-store-categories-list";
import type { StoreCategoriesListFilters } from "../types/store-category.types";

const defaultFilters: StoreCategoriesListFilters = { search: "", status: "all" };

export function StoreCategoriesListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<StoreCategoriesListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  
  
  const listState = useStoreCategoriesList(filters);
  const actions = useStoreCategoryActions(async () => { await listState.reload(); });

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
              Create store category
            </Button>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>
          </>
        }
        description="Manage merchant-facing store categories."
        eyebrow="Admin"
        title="Store Categories"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Store Categories currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <StoreCategoriesFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}
      {activeComposer === "createAction" ? (
        <StoreCategoryForm
          description="Create a merchant-facing category using the typed store-category contract."
          isSubmitting={actions.createAction.isSubmitting}
          mode="create"
          onSubmit={async (payload) => {
            const result = await actions.createAction.submit(payload);

            if (result) {
              setActiveComposer(null);
            }
          }}
          submitLabel="Create store category"
          title="Create store category"
        />
      ) : null}
      <StoreCategoriesTable
        items={listState.items}
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
              View
            </Link>
            <AdminConfirmDialog
              confirmLabel="Delete"
              description="This will call the mapped admin endpoint for the selected store category."
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(
                  String(item.id ?? ""),
                );
              }}
              title="Delete Store Category"
              triggerLabel="Delete"
              variant="danger"
            />
          </div>
        )}
      />
    </div>
  );
}
