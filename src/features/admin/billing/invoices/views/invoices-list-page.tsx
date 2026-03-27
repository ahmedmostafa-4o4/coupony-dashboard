"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { InvoicesFilters } from "../components/invoices-filters";
import { InvoicesTable } from "../components/invoices-table";
import { useInvoiceActions } from "../hooks/use-invoice-actions";
import { useInvoicesList } from "../hooks/use-invoices-list";
import type { InvoicesListFilters } from "../types/invoice.types";

const defaultFilters: InvoicesListFilters = { search: "", status: "all" };

export function InvoicesListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<InvoicesListFilters>(defaultFilters);
  
  
  
  const listState = useInvoicesList(filters);
  const actions = useInvoiceActions(async () => { await listState.reload(); });

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
        description="Issue, void, and reconcile invoice states."
        eyebrow="Admin"
        title="Invoices"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Invoices currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <InvoicesFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <InvoicesTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "invoices",
                String(item.id ?? ""),
              )}
            >
              View
            </Link>
            <AdminConfirmDialog
              confirmLabel="Issue"
              description="This will call the mapped admin endpoint for the selected invoice."
              isPending={actions.issueAction.isSubmitting}
              onConfirm={async () => {
                await actions.issueAction.submit({
                  invoiceId: String(item.id ?? ""),
                });
              }}
              title="Issue Invoice"
              triggerLabel="Issue"
              variant="primary"
            />
            <AdminConfirmDialog
              confirmLabel="Mark paid"
              description="This will call the mapped admin endpoint for the selected invoice."
              isPending={actions.markPaidAction.isSubmitting}
              onConfirm={async () => {
                await actions.markPaidAction.submit({
                  invoiceId: String(item.id ?? ""),
                });
              }}
              title="Mark paid Invoice"
              triggerLabel="Mark paid"
              variant="primary"
            />
          </div>
        )}
      />
    </div>
  );
}
