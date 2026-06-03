"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { StoreCategoriesListFilters } from "../types/store-category.types";

import type { StoreCategoriesDictionary } from "../utils/get-dictionary";

export function StoreCategoriesFilters({
  onChange,
  onReset,
  values,
  dict,
}: {
  onChange: (nextValues: StoreCategoriesListFilters) => void;
  onReset: () => void;
  values: StoreCategoriesListFilters;
  dict: StoreCategoriesDictionary["filters"];
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
