"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, createAdminDetailHref } from "@/features/admin/shared";
import { SubscriptionsFilters } from "../components/subscriptions-filters";
import { SubscriptionsTable } from "../components/subscriptions-table";
import { useSubscriptionsList } from "../hooks/use-subscriptions-list";
import type { SubscriptionsListFilters } from "../types/subscription.types";

const defaultFilters: SubscriptionsListFilters = { search: "", status: "all" };

export function SubscriptionsListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<SubscriptionsListFilters>(defaultFilters);
  
  
  
  const listState = useSubscriptionsList(filters);
  

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
        description="Manage merchant subscription lifecycle and status."
        eyebrow="Admin"
        title="Subscriptions"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Subscriptions currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <SubscriptionsFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <SubscriptionsTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "subscriptions",
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
