"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { RedemptionsListFilters } from "../types/redemption.types";

const filterFields = [
  createSearchFilterField("Search", "Search redemptions by coupon or user"),
  createStatusFilterField(),
];

export function RedemptionsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: RedemptionsListFilters) => void;
  onReset: () => void;
  values: RedemptionsListFilters;
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
