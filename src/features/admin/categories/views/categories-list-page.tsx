"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { CategoriesFilters } from "../components/categories-filters";
import { CategoryForm } from "../components/category-form";
import { CategoriesTable } from "../components/categories-table";
import { useCategoryActions } from "../hooks/use-category-actions";
import { useCategoriesList } from "../hooks/use-categories-list";
import type { CategoriesListFilters } from "../types/category.types";

const defaultFilters: CategoriesListFilters = { search: "", status: "all" };

export function CategoriesListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<CategoriesListFilters>(defaultFilters);
  const [activeComposer, setActiveComposer] = useState<string | null>(null);
  
  
  const listState = useCategoriesList(filters);
  const actions = useCategoryActions(async () => { await listState.reload(); });

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
              Create category
            </Button>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>
          </>
        }
        description="Manage customer-facing offer categories."
        eyebrow="Admin"
        title="Categories"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Categories currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <CategoriesFilters
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
        <CategoryForm
          description="Create a customer-facing category using the typed category contract."
          isSubmitting={actions.createAction.isSubmitting}
          mode="create"
          onSubmit={async (payload) => {
            const result = await actions.createAction.submit(payload);

            if (result) {
              setActiveComposer(null);
            }
          }}
          submitLabel="Create category"
          title="Create category"
        />
      ) : null}
      <CategoriesTable
        items={listState.items}
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
              View
            </Link>
            <AdminConfirmDialog
              confirmLabel="Delete"
              description="This will call the mapped admin endpoint for the selected category."
              isPending={actions.deleteAction.isSubmitting}
              onConfirm={async () => {
                await actions.deleteAction.submit(
                  String(item.id ?? ""),
                );
              }}
              title="Delete Category"
              triggerLabel="Delete"
              variant="danger"
            />
          </div>
        )}
      />
    </div>
  );
}
