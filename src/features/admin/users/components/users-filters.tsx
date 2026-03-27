"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { UsersListFilters } from "../types/user.types";

const filterFields = [
  createSearchFilterField("Search", "Search users by name or email"),
  createStatusFilterField(),
];

export function UsersFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: UsersListFilters) => void;
  onReset: () => void;
  values: UsersListFilters;
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
