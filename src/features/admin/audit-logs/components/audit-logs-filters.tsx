"use client";

import { AdminFilterBar, createSearchFilterField } from "@/features/admin/shared";

import type { AuditLogsListFilters } from "../types/audit-log.types";

import { createDateRangeFilterField } from "@/features/admin/shared";
import type { AdminFilterField } from "@/features/admin/shared/types/admin-common.types";

const filterFields: AdminFilterField[] = [
  {
    key: "event",
    label: "Event Action",
    type: "select",
    options: [
      { label: "All Events", value: "all" },
      { label: "Created", value: "created" },
      { label: "Updated", value: "updated" },
      { label: "Deleted", value: "deleted" },
    ],
  },
  {
    key: "subjectType",
    label: "Target Type",
    type: "select",
    options: [
      { label: "All Types", value: "all" },
      { label: "User", value: "App\\Domain\\User\\Models\\User" },
      { label: "Role", value: "App\\Domain\\Role\\Models\\Role" },
      { label: "Store", value: "App\\Domain\\Store\\Models\\Store" },
    ],
  },
  createDateRangeFilterField("Date Range", "fromDate", "toDate"),
];

export function AuditLogsFilters({
  onChange,
  onReset,
  values,
}: {
  onChange: (nextValues: AuditLogsListFilters) => void;
  onReset: () => void;
  values: AuditLogsListFilters;
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
