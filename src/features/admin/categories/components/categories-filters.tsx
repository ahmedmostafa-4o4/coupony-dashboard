"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { CategoriesListFilters } from "../types/category.types";

const filterFields = [
  createSearchFilterField("Search", "Search categories by name"),
  createStatusFilterField(),
];

export function CategoriesFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: CategoriesListFilters) => void;
  onReset: () => void;
  values: CategoriesListFilters;
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
