"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { GlobalDictionary } from "@/messages/get-dictionary";
import type { SubscriptionPlansListFilters } from "../types/subscription-plan.types";

export function SubscriptionPlansFilters({
  onChange,
  onReset,
  values,
  dict,
}: {
  onChange: (nextValues: SubscriptionPlansListFilters) => void;
  onReset: () => void;
  values: SubscriptionPlansListFilters;
  dict: GlobalDictionary;
}) {
  const filterFields = [
    createSearchFilterField(dict.adminSubscriptionPlans.list.search, dict.adminSubscriptionPlans.list.searchDesc),
    createStatusFilterField(
      dict.adminSubscriptionPlans.list.filters?.status || "Status",
      [
        { label: dict.adminSubscriptionPlans.list.filters?.allStatuses || "All statuses", value: "all" },
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
        { label: "Archived", value: "archived" }
      ]
    ),
  ];
  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
      resetLabel={dict.adminSubscriptionPlans.list.filters?.reset || "Reset"}
    />
  );
}
