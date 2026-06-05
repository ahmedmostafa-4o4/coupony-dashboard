"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref, AdminPagination } from "@/features/admin/shared";
import { StoresFilters } from "../components/stores-filters";
import { StoresTable } from "../components/stores-table";
import { useStoreActions } from "../hooks/use-store-actions";
import { useStoresList } from "../hooks/use-stores-list";
import type { StoresListFilters } from "../types/store.types";
import { getStoresDictionary } from "../utils/get-dictionary";

const defaultFilters: StoresListFilters = { search: "", status: "all" };

export function StoresListPage({ lang }: { lang: string }) {
  const dict = getStoresDictionary(lang);
  const [filters, setFilters] = useState<StoresListFilters>(defaultFilters);
  
  
  
  const listState = useStoresList(filters);
  const actions = useStoreActions(async () => { await listState.reload(); });

  const meta = listState.meta as { currentPage?: number; lastPage?: number; perPage?: number } | undefined;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
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
        <AdminStatCard
          hint={dict.list.rowsHint}
          label={dict.list.rows}
          value={listState.total}
        />
      </div>
      <StoresFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
        dict={dict.filters}
      />
      {listState.error ? (
        <AdminSection title={dict.list.errors.request}>
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <StoresTable
        items={listState.items}
        dict={dict.table}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "stores",
                String(item.id ?? ""),
              )}
            >
              {dict.table.actions.view}
            </Link>
            <AdminConfirmDialog
              confirmLabel={dict.details.verifications.approve}
              description="This will call the mapped admin endpoint for the selected store."
              isPending={actions.approveAction.isSubmitting}
              onConfirm={async () => {
                await actions.approveAction.submit({
                  storeId: String(item.id ?? ""),
                });
              }}
              title="Approve Store"
              triggerLabel={dict.details.verifications.approve}
              variant="primary"
            />
          </div>
        )}
      />

      <AdminPagination
        currentPage={meta?.currentPage ?? 1}
        lastPage={meta?.lastPage ?? 1}
        perPage={meta?.perPage ?? 15}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        onPerPageChange={(perPage) => setFilters((prev) => ({ ...prev, perPage, page: 1 }))}
      />
    </div>
  );
}
