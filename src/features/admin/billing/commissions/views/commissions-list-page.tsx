"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { CommissionsFilters } from "../components/commissions-filters";
import { CommissionsTable } from "../components/commissions-table";
import { useCommissionActions } from "../hooks/use-commission-actions";
import { useCommissionsList } from "../hooks/use-commissions-list";
import type { CommissionsListFilters } from "../types/commission.types";

const defaultFilters: CommissionsListFilters = { search: "", status: "all" };

export function CommissionsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<CommissionsListFilters>(defaultFilters);
  
  
  
  const listState = useCommissionsList(filters);
  const actions = useCommissionActions(async () => { await listState.reload(); });

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
        description="Track payout state across invoicing and settlement."
        eyebrow="Admin"
        title="Commissions"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Commissions currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <CommissionsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <CommissionsTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "commissions",
                String(item.id ?? ""),
              )}
            >
              View
            </Link>
            <AdminConfirmDialog
              confirmLabel="Mark invoiced"
              description="This will call the mapped admin endpoint for the selected commission."
              isPending={actions.markInvoicedAction.isSubmitting}
              onConfirm={async () => {
                await actions.markInvoicedAction.submit({
                  commissionId: String(item.id ?? ""),
                });
              }}
              title="Mark invoiced Commission"
              triggerLabel="Mark invoiced"
              variant="primary"
            />
            <AdminConfirmDialog
              confirmLabel="Mark paid"
              description="This will call the mapped admin endpoint for the selected commission."
              isPending={actions.markPaidAction.isSubmitting}
              onConfirm={async () => {
                await actions.markPaidAction.submit({
                  commissionId: String(item.id ?? ""),
                });
              }}
              title="Mark paid Commission"
              triggerLabel="Mark paid"
              variant="primary"
            />
          </div>
        )}
      />
    </div>
  );
}
