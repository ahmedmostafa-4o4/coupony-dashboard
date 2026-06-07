"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField, StoreSelectFilter } from "@/features/admin/shared";

import type { BannersListFilters } from "../types/banner.types";
import type { BannersDictionary } from "../utils/get-dictionary";

export function BannersFilters({
  filters,
  onChange,
  dict,
}: {
  filters: BannersListFilters;
  onChange: (f: BannersListFilters) => void;
  dict: BannersDictionary;
}) {
  const filterFields = [
    createSearchFilterField("Search", "Search by discount or CTA label"),
    {
      key: "store_id",
      label: dict.list.columns.store,
      type: "custom" as const,
      render: (value: unknown, onFieldChange: (v: unknown) => void) => (
        <StoreSelectFilter 
          value={value as string} 
          onChange={onFieldChange} 
          placeholder="Filter by store..." 
        />
      ),
    },
    createStatusFilterField(dict.list.columns.status, [
      "all",
      { label: dict.status.pending, value: "pending" },
      { label: dict.status.approved, value: "approved" },
      { label: dict.status.rejected, value: "rejected" },
    ]),
    {
      key: "is_active",
      label: dict.list.columns.active,
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Active Only", value: "true" },
        { label: "Inactive Only", value: "false" },
      ],
    },
  ] as any[];

  return <AdminFilterBar fields={filterFields} values={filters} onChange={onChange as any} />;
}
