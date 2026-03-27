"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AdminPageHeader, AdminSection, AdminStatCard, AdminConfirmDialog, createAdminDetailHref } from "@/features/admin/shared";
import { OffersFilters } from "../components/offers-filters";
import { OffersTable } from "../components/offers-table";
import { useOfferActions } from "../hooks/use-offer-actions";
import { useOffersList } from "../hooks/use-offers-list";
import type { OffersListFilters } from "../types/offer.types";

const defaultFilters: OffersListFilters = { search: "", status: "all" };

export function OffersListPage({ lang }: { lang: string }) {
  const [filters, setFilters] = useState<OffersListFilters>(defaultFilters);
  
  
  
  const listState = useOffersList(filters);
  const actions = useOfferActions(async () => { await listState.reload(); });

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
        description="Review moderation, publishing, and archival workflows."
        eyebrow="Admin"
        title="Offers"
      />
      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          hint="Offers currently loaded from the API response."
          label="Rows"
          value={listState.total}
        />
      </div>
      <OffersFilters
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        values={filters}
      />
      {listState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{listState.error}</p>
        </AdminSection>
      ) : null}

      <OffersTable
        items={listState.items}
        renderActions={(item) => (
          <div className="flex flex-wrap justify-end gap-2">
            <Link
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href={createAdminDetailHref(
                lang,
                "offers",
                String(item.id ?? ""),
              )}
            >
              View
            </Link>
            <AdminConfirmDialog
              confirmLabel="Approve"
              description="This will call the mapped admin endpoint for the selected offer."
              isPending={actions.approveAction.isSubmitting}
              onConfirm={async () => {
                await actions.approveAction.submit({
                  offerId: String(item.id ?? ""),
                });
              }}
              title="Approve Offer"
              triggerLabel="Approve"
              variant="primary"
            />
          </div>
        )}
      />
    </div>
  );
}
