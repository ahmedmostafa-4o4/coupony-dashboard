"use client";

import { AdminFilterBar, createSearchFilterField } from "@/features/admin/shared";

import type { AuditLogsListFilters } from "../types/audit-log.types";

const filterFields = [
  createSearchFilterField("Search", "Search audit logs by actor or action"),

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
