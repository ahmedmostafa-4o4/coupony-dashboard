"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { SellerTicketsListFilters } from "../types/seller-ticket.types";

const filterFields = [
  createSearchFilterField("Search", "Search seller tickets by subject or seller"),
  createStatusFilterField(),
];

export function SellerTicketsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: SellerTicketsListFilters) => void;
  onReset: () => void;
  values: SellerTicketsListFilters;
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
