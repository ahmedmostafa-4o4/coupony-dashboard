"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { CategoriesListFilters } from "../types/category.types";

import type { CategoriesDictionary } from "../utils/get-dictionary";

export function CategoriesFilters({
  onChange,
  onReset,
  values,
  dict,
}: {
  onChange: (nextValues: CategoriesListFilters) => void;
  onReset: () => void;
  values: CategoriesListFilters;
  dict: CategoriesDictionary["filters"];
}) {
  const filterFields = [
    createSearchFilterField(dict.search, dict.searchPlaceholder),
    createStatusFilterField(dict.status, [
      { label: dict.statusOptions.all, value: "all" },
      { label: dict.statusOptions.active, value: "active" },
      { label: dict.statusOptions.inactive, value: "inactive" },
    ]),
  ];
  return (
    <AdminFilterBar
      fields={filterFields}
      onChange={onChange}
      onReset={onReset}
      values={values}
    />
  );
}
