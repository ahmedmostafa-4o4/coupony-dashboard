"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { SubscriptionsListFilters } from "../types/subscription.types";

const filterFields = [
  createSearchFilterField("Search", "Search subscriptions by store or plan"),
  createStatusFilterField(),
];

export function SubscriptionsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: SubscriptionsListFilters) => void;
  onReset: () => void;
  values: SubscriptionsListFilters;
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
