"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard } from "@/features/admin/shared";
import { BillingProfilesFilters } from "../components/billing-profiles-filters";
import { BillingProfilesTable } from "../components/billing-profiles-table";
import { useBillingProfilesList } from "../hooks/use-billing-profiles-list";
import type { BillingProfilesListFilters } from "../types/billing-profile.types";

const defaultFilters: BillingProfilesListFilters = { search: "", status: "all" };

export function BillingProfilesListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<BillingProfilesListFilters>(defaultFilters);
  
  void lang;
  
  const listState = useBillingProfilesList(filters);
  

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
        description="Reference store billing profile data returned by admin APIs."
        eyebrow="Admin"
        title="Billing Profiles"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Billing Profiles currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <BillingProfilesFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <BillingProfilesTable
        items={listState.items}

      />
    </div>
  );
}
