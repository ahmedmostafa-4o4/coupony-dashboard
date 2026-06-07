"use client";

import { AdminFilterBar, type AdminFilterField, StoreSelectFilter, UserSelectFilter } from "@/features/admin/shared";
import type { OfferClaimsFilters } from "../types/offer-claim.types";
import type { OfferClaimsDictionary } from "../utils/get-dictionary";

export function OfferClaimsFilters({
  filters,
  onChange,
  dict,
}: {
  filters: OfferClaimsFilters;
  onChange: (filters: OfferClaimsFilters) => void;
  dict: OfferClaimsDictionary;
}) {
  const filterFields: AdminFilterField[] = [
    {
      key: "status",
      type: "select",
      label: dict.filters.status,
      options: [
        { label: dict.filters.statusOptions.all, value: "all" },
        { label: dict.filters.statusOptions.active, value: "active" },
        { label: dict.filters.statusOptions.redeemed, value: "redeemed" },
        { label: dict.filters.statusOptions.cancelled, value: "cancelled" },
        { label: dict.filters.statusOptions.expired, value: "expired" },
      ],
    },
    {
      key: "userId",
      type: "custom",
      label: dict.filters.userId,
      render: (value, onChange) => (
        <UserSelectFilter value={String(value || "")} onChange={onChange} />
      ),
    },
    {
      key: "storeId",
      type: "custom",
      label: dict.filters.storeId,
      render: (value, onChange) => (
        <StoreSelectFilter value={String(value || "")} onChange={onChange} />
      ),
    },
    {
      key: "startDate",
      keySecondary: "endDate",
      type: "daterange",
      label: dict.filters.dateRange,
    },
  ];

  return <AdminFilterBar fields={filterFields} values={filters as any} onChange={onChange as any} onReset={() => onChange({})} />;
}
