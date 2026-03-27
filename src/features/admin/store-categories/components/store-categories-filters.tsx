"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { StoreCategoriesListFilters } from "../types/store-category.types";

const filterFields = [
  createSearchFilterField("Search", "Search store categories by name"),
  createStatusFilterField(),
];

export function StoreCategoriesFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: StoreCategoriesListFilters) => void;
  onReset: () => void;
  values: StoreCategoriesListFilters;
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
