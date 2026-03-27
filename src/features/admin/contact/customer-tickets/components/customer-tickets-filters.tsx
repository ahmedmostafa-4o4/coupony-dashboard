"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { CustomerTicketsListFilters } from "../types/customer-ticket.types";

const filterFields = [
  createSearchFilterField("Search", "Search customer tickets by subject or user"),
  createStatusFilterField(),
];

export function CustomerTicketsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: CustomerTicketsListFilters) => void;
  onReset: () => void;
  values: CustomerTicketsListFilters;
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
