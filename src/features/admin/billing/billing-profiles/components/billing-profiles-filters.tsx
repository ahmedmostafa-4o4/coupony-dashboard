"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { BillingProfilesListFilters } from "../types/billing-profile.types";

const filterFields = [
  createSearchFilterField("Search", "Search billing profiles by store or account"),
  createStatusFilterField(),
];

export function BillingProfilesFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: BillingProfilesListFilters) => void;
  onReset: () => void;
  values: BillingProfilesListFilters;
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
