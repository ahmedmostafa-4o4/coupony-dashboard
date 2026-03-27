"use client";

import { AdminFilterBar, createSearchFilterField } from "@/features/admin/shared";

import type { PermissionsListFilters } from "../types/permission.types";

const filterFields = [
  createSearchFilterField("Search", "Search permissions by key or resource"),

];

export function PermissionsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: PermissionsListFilters) => void;
  onReset: () => void;
  values: PermissionsListFilters;
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
