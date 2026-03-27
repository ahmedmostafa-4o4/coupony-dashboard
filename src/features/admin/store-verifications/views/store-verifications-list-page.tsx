"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { StoreVerificationsFilters } from "../components/store-verifications-filters";
import { StoreVerificationsTable } from "../components/store-verifications-table";
import { useStoreVerificationActions } from "../hooks/use-store-verification-actions";
import { useStoreVerificationsList } from "../hooks/use-store-verifications-list";
import type { StoreVerificationsListFilters } from "../types/store-verification.types";

const defaultFilters: StoreVerificationsListFilters = { search: "", status: "all" };

export function StoreVerificationsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<StoreVerificationsListFilters>(defaultFilters);
  
  
  
  const listState = useStoreVerificationsList(filters);
  const actions = useStoreVerificationActions(async () => { await listState.reload(); });

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
        description="Process merchant verification submissions."
        eyebrow="Admin"
        title="Store Verifications"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Store Verifications currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <StoreVerificationsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <StoreVerificationsTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "storeVerifications",
                String(item.id ?? ""),
              )}
            >
              View
            </Link>
            <AdminConfirmDialog
              confirmLabel="Approve"
              description="This will call the mapped admin endpoint for the selected store verification."
              isPending={actions.approveAction.isSubmitting}
              onConfirm={async () => {
                await actions.approveAction.submit(
                  String(item.id ?? ""),
                );
              }}
              title="Approve Store Verification"
              triggerLabel="Approve"
              variant="primary"
            />
          </div>
        )}
      />
    </div>
  );
}
