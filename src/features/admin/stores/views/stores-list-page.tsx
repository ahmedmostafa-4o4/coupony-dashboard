"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { StoresFilters } from "../components/stores-filters";
import { StoresTable } from "../components/stores-table";
import { useStoreActions } from "../hooks/use-store-actions";
import { useStoresList } from "../hooks/use-stores-list";
import type { StoresListFilters } from "../types/store.types";

const defaultFilters: StoresListFilters = { search: "", status: "all" };

export function StoresListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<StoresListFilters>(defaultFilters);
  
  
  
  const listState = useStoresList(filters);
  const actions = useStoreActions(async () => { await listState.reload(); });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <>
            <Button variant="secondary" onClick={() => void listState.reload()}>
              Reload
            </Button>
          </>
        }
        description="Review merchant status, moderation, and billing setup."
        eyebrow="Admin"
        title="Stores"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Stores currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <StoresFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <StoresTable
        items={listState.items}
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
              View
            </Link>
            <AdminConfirmDialog
              confirmLabel="Approve"
              description="This will call the mapped admin endpoint for the selected store."
              isPending={actions.approveAction.isSubmitting}
              onConfirm={async () => {
                await actions.approveAction.submit({
                  storeId: String(item.id ?? ""),
                });
              }}
              title="Approve Store"
              triggerLabel="Approve"
              variant="primary"
            />
          </div>
        )}
      />
    </div>
  );
}
