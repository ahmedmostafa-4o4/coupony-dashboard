"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { GlobalDictionary } from "@/messages/get-dictionary";
import type { SubscriptionsListFilters } from "../types/subscription.types";

export function SubscriptionsFilters({
  onChange,
  onReset,
  values,
  dict,
}: {
  onChange: (nextValues: SubscriptionsListFilters) => void;
  onReset: () => void;
  values: SubscriptionsListFilters;
  dict: GlobalDictionary;
}) {
  const filterFields = [
    createSearchFilterField(dict.adminSubscriptions.list.search || "Search", dict.adminSubscriptions.list.searchDesc || "Search subscriptions by store or plan"),
    createStatusFilterField(
      dict.adminSubscriptions.list.filters?.status || "Status",
      [
        { label: dict.adminSubscriptions.list.filters?.allStatuses || "All statuses", value: "all" },
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Suspended", value: "suspended" },
        { label: "Cancelled", value: "cancelled" }
      ]
    ),
  ];
  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
      resetLabel={dict.adminSubscriptions.list.filters?.reset || "Reset"}
    />
  );
}
