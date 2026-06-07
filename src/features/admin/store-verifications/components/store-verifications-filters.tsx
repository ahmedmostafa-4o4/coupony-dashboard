"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField, StoreSelectFilter } from "@/features/admin/shared";

import type { StoreVerificationsListFilters } from "../types/store-verification.types";
import type { StoreVerificationsDictionary } from "../utils/get-dictionary";

export function StoreVerificationsFilters({
  onChange,
  onReset,
  values,
  dict,
}: {
  onChange: (nextValues: StoreVerificationsListFilters) => void;
  onReset: () => void;
  values: StoreVerificationsListFilters;
  dict: StoreVerificationsDictionary;
}) {
  const filterFields = [
    createSearchFilterField("Search", "Search verifications by store or ID"),
    {
      key: "store_id",
      label: dict.list.columns.store,
      type: "custom" as const,
      render: (value: any, onChange: (v: any) => void) => (
        <StoreSelectFilter 
          value={value as string} 
          onChange={onChange} 
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
  ];

  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
    />
  );
}
