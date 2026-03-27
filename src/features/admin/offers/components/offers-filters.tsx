"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { OffersListFilters } from "../types/offer.types";

const filterFields = [
  createSearchFilterField("Search", "Search offers by title or store"),
  createStatusFilterField(),
];

export function OffersFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: OffersListFilters) => void;
  onReset: () => void;
  values: OffersListFilters;
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
