"use client";

import { AdminFilterBar, createSearchFilterField, createStatusFilterField } from "@/features/admin/shared";

import type { NotifyMeRequestsListFilters } from "../types/notify-me-request.types";

const filterFields = [
  createSearchFilterField("Search", "Search notify-me requests by email"),
  createStatusFilterField(),
];

export function NotifyMeRequestsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: NotifyMeRequestsListFilters) => void;
  onReset: () => void;
  values: NotifyMeRequestsListFilters;
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
