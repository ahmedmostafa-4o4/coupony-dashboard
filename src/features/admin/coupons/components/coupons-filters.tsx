"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { CouponsListFilters } from "../types/coupon.types";

const filterFields = [
  createSearchFilterField("Search", "Search coupons by code or offer"),
  createStatusFilterField(),
];

export function CouponsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: CouponsListFilters) => void;
  onReset: () => void;
  values: CouponsListFilters;
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
