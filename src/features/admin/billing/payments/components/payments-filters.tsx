"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { PaymentsListFilters } from "../types/payment.types";
import type { GlobalDictionary } from "@/messages/get-dictionary";

export function PaymentsFilters({
  onChange,
  onReset,
  values,
  dict,
}: {
  onChange: (nextValues: PaymentsListFilters) => void;
  onReset: () => void;
  values: PaymentsListFilters;
  dict: GlobalDictionary;
}) {
  const filterFields = [
    createSearchFilterField(dict.adminPayments.list.search, dict.adminPayments.list.searchDesc),
    createStatusFilterField(
      dict.adminPayments.list.filters?.status || "Status",
      [
        { label: dict.adminPayments.list.filters?.allStatuses || "All statuses", value: "all" },
        { label: "Paid", value: "paid" },
        { label: "Pending", value: "pending" },
        { label: "Failed", value: "failed" },
        { label: "Refunded", value: "refunded" }
      ]
    ),
  ];

  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
      resetLabel={dict.adminPayments.list.filters?.reset || "Reset"}
    />
  );
}
