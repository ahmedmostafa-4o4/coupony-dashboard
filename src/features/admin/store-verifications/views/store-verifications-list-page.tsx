"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, KpiCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { CheckSquareIcon } from "lucide-react";
import { StoreVerificationsFilters } from "../components/store-verifications-filters";
import { StoreVerificationsTable } from "../components/store-verifications-table";
import { useStoreVerificationActions } from "../hooks/use-store-verification-actions";
import { useStoreVerificationsList } from "../hooks/use-store-verifications-list";
import type { StoreVerificationsListFilters } from "../types/store-verification.types";
import { getStoreVerificationsDictionary } from "../utils/get-dictionary";

const defaultFilters: StoreVerificationsListFilters = { search: "", status: "all" };

export function StoreVerificationsListPage({ lang }: { lang: string }) {
  const dict = getStoreVerificationsDictionary(lang);
  const [filters, setFilters] = useState<StoreVerificationsListFilters>(defaultFilters);
  
  
  
  const listState = useStoreVerificationsList(filters);
  const actions = useStoreVerificationActions(async () => { await listState.reload(); });

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
        <KpiCard
          description={dict.list.hint}
          title={dict.list.rows}
          value={listState.total}
          icon={<CheckSquareIcon />}
        />
      </div>
      <StoreVerificationsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
        dict={dict}
      />
      {listState.error ? (
        <AdminSection title={dict.list.errorState}>
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <StoreVerificationsTable
        items={listState.items}
        dict={dict}
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
              {dict.list.columns.view}
            </Link>
            <AdminConfirmDialog
              confirmLabel={dict.actions.approve.title}
              description={dict.actions.approve.description}
              isPending={actions.approveAction.isSubmitting}
              onConfirm={async () => {
                await actions.approveAction.submit(
                  String(item.id ?? ""),
                );
              }}
              title={dict.actions.approve.title}
              triggerLabel={dict.details.approveBtn}
              variant="primary"
            />
          </div>
        )}
      />
    </div>
  );
}
