"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { CommissionsListFilters } from "../types/commission.types";

const filterFields = [
  createSearchFilterField("Search", "Search commissions by store or commission ID"),
  createStatusFilterField(),
];

export function CommissionsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: CommissionsListFilters) => void;
  onReset: () => void;
  values: CommissionsListFilters;
}) {
  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
    />
  );
}
