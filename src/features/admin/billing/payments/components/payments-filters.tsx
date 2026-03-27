"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { PaymentsListFilters } from "../types/payment.types";

const filterFields = [
  createSearchFilterField("Search", "Search payments by invoice or payment ID"),
  createStatusFilterField(),
];

export function PaymentsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: PaymentsListFilters) => void;
  onReset: () => void;
  values: PaymentsListFilters;
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
