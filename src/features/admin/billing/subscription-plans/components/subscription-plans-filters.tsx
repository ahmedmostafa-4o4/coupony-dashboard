"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { SubscriptionPlansListFilters } from "../types/subscription-plan.types";

const filterFields = [
  createSearchFilterField("Search", "Search subscription plans by name"),
  createStatusFilterField(),
];

export function SubscriptionPlansFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: SubscriptionPlansListFilters) => void;
  onReset: () => void;
  values: SubscriptionPlansListFilters;
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
