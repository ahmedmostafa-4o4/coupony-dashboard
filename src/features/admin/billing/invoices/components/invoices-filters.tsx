"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { InvoicesListFilters } from "../types/invoice.types";

const filterFields = [
  createSearchFilterField("Search", "Search invoices by store or invoice ID"),
  createStatusFilterField(),
];

export function InvoicesFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: InvoicesListFilters) => void;
  onReset: () => void;
  values: InvoicesListFilters;
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
