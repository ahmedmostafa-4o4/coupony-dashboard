"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { RolesListFilters } from "../types/role.types";

const filterFields = [
  createSearchFilterField("Search", "Search roles by name or description"),
  createStatusFilterField(),
];

export function RolesFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: RolesListFilters) => void;
  onReset: () => void;
  values: RolesListFilters;
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
