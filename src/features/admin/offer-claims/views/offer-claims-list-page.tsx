"use client";

import { AdminPageHeader, AdminStatCard } from "@/features/admin/shared";
import { getOfferClaimsDictionary } from "../utils/get-dictionary";
import { OfferClaimsTable } from "../components/offer-claims-table";
import { OfferClaimsFilters } from "../components/offer-claims-filters";
import { useOfferClaims } from "../hooks/use-offer-claims";
import { useState } from "react";
import type { OfferClaimsFilters as IOfferClaimsFilters } from "../types/offer-claim.types";

export function OfferClaimsListPage({ lang }: { lang: string }) {
  const dict = getOfferClaimsDictionary(lang);
  const [filters, setFilters] = useState<IOfferClaimsFilters>({});

  const { meta } = useOfferClaims(filters);

  // Derive stats manually if API doesn't provide them, or mock them
  // In a real app we'd fetch this from a summary endpoint
  const total = meta?.total || 0;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dict.title}
        description={dict.description}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminStatCard
          label={dict.stats.total}
          value={total.toString()}
        />
        <AdminStatCard
          label={dict.stats.active}
          value="-"
        />
        <AdminStatCard
          label={dict.stats.cancelled}
          value="-"
        />
      </div>

      <div className="space-y-4">
        <OfferClaimsFilters
          filters={filters}
          onChange={setFilters}
          dict={dict}
        />

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <OfferClaimsTable lang={lang} dict={dict} filters={filters} />
        </div>
      </div>
    </div>
  );
}
