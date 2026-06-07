"use client";

import { AdminFilterBar, type AdminFilterField } from "@/features/admin/shared";
import type { TravelBannersFilters } from "../types/travel-banner.types";
import type { TravelBannersDictionary } from "../utils/get-dictionary";

export function TravelBannersFilters({
  filters,
  onChange,
  dict,
}: {
  filters: TravelBannersFilters;
  onChange: (filters: TravelBannersFilters) => void;
  dict: TravelBannersDictionary;
}) {
  const filterFields: AdminFilterField[] = [
    {
      key: "search",
      type: "text",
      label: dict.filters.search,
      placeholder: dict.list.searchPlaceholder,
    },
    {
      key: "is_active",
      type: "select",
      label: dict.filters.status,
      options: [
        { label: dict.filters.statusOptions.all, value: "all" },
        { label: dict.filters.statusOptions.active, value: "true" },
        { label: dict.filters.statusOptions.inactive, value: "false" },
      ],
    },
  ];

  return <AdminFilterBar fields={filterFields} values={filters} onChange={onChange as any} />;
}
