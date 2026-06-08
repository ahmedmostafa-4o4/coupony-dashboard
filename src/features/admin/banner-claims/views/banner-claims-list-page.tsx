"use client";

import { AdminPageHeader, KpiCard } from "@/features/admin/shared";
import { TicketIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { getBannerClaimsDictionary } from "../utils/get-dictionary";
import { BannerClaimsTable } from "../components/banner-claims-table";
import { BannerClaimsFilters } from "../components/banner-claims-filters";
import { useBannerClaims } from "../hooks/use-banner-claims";
import { useState } from "react";
import type { BannerClaimsFilters as IBannerClaimsFilters } from "../types/banner-claim.types";

export function BannerClaimsListPage({ lang }: { lang: string }) {
  const dict = getBannerClaimsDictionary(lang);
  const [filters, setFilters] = useState<IBannerClaimsFilters>({});

  const { meta } = useBannerClaims(filters);

  const total = meta?.total || 0;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dict.title}
        description={dict.description}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          title={dict.stats.total}
          value={total.toString()}
          description=""
          icon={<TicketIcon />}
        />
        <KpiCard
          title={dict.stats.active}
          value="-"
          description=""
          icon={<CheckCircleIcon />}
        />
        <KpiCard
          title={dict.stats.cancelled}
          value="-"
          description=""
          icon={<XCircleIcon />}
        />
      </div>

      <div className="space-y-4">
        <BannerClaimsFilters
          filters={filters}
          onChange={setFilters}
          dict={dict}
        />

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <BannerClaimsTable lang={lang} dict={dict} filters={filters} />
        </div>
      </div>
    </div>
  );
}
