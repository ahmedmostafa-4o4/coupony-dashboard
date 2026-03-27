"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { StoreVerificationsListFilters } from "../types/store-verification.types";

const filterFields = [
  createSearchFilterField("Search", "Search verifications by store or ID"),
  createStatusFilterField(),
];

export function StoreVerificationsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: StoreVerificationsListFilters) => void;
  onReset: () => void;
  values: StoreVerificationsListFilters;
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
