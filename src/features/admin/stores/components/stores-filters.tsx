"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { StoresListFilters } from "../types/store.types";

const filterFields = [
  createSearchFilterField("Search", "Search stores by name or owner"),
  createStatusFilterField(),
];

export function StoresFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: StoresListFilters) => void;
  onReset: () => void;
  values: StoresListFilters;
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
