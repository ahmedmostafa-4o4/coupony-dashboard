"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, createAdminDetailHref } from "@/features/admin/shared";
import { RedemptionsFilters } from "../components/redemptions-filters";
import { RedemptionsTable } from "../components/redemptions-table";
import { useRedemptionsList } from "../hooks/use-redemptions-list";
import type { RedemptionsListFilters } from "../types/redemption.types";

const defaultFilters: RedemptionsListFilters = { search: "", status: "all" };

export function RedemptionsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<RedemptionsListFilters>(defaultFilters);
  
  
  
  const listState = useRedemptionsList(filters);

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
        description="Investigate redemption activity and fraud responses."
        eyebrow="Admin"
        title="Redemptions"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Redemptions currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <RedemptionsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <RedemptionsTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "redemptions",
                String(item.id ?? ""),
              )}
            >
              View
            </Link>
          </div>
        )}
      />
    </div>
  );
}
