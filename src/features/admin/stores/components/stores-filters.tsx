"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { StoresListFilters } from "../types/store.types";
import type { StoresDictionary } from "../utils/get-dictionary";

export function StoresFilters({
  onChange,
  onReset,
  values,
  dict,
}: {
  onChange: (nextValues: StoresListFilters) => void;
  onReset: () => void;
  values: StoresListFilters;
  dict: StoresDictionary["filters"];
}) {
  const filterFields = [
    createSearchFilterField(dict.searchPlaceholder, dict.searchPlaceholder),
    createStatusFilterField(dict.statusPlaceholder, [
      { label: dict.statusOptions.all, value: "all" },
      { label: dict.statusOptions.active, value: "active" },
      { label: dict.statusOptions.inactive, value: "inactive" },
      { label: dict.statusOptions.suspended, value: "suspended" },
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
