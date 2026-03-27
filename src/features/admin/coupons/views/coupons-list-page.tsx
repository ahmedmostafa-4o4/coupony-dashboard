"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, createAdminDetailHref } from "@/features/admin/shared";
import { CouponsFilters } from "../components/coupons-filters";
import { CouponsTable } from "../components/coupons-table";
import { useCouponsList } from "../hooks/use-coupons-list";
import type { CouponsListFilters } from "../types/coupon.types";

const defaultFilters: CouponsListFilters = { search: "", status: "all" };

export function CouponsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<CouponsListFilters>(defaultFilters);
  
  
  
  const listState = useCouponsList(filters);
  

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
        description="Inspect coupon rows and patch backend-managed fields."
        eyebrow="Admin"
        title="Coupons"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Coupons currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <CouponsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <CouponsTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "coupons",
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
