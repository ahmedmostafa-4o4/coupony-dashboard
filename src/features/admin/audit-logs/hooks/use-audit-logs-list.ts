"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getAuditLogs } from "../api/get-audit-logs";
import type { AuditLog, AuditLogsListFilters } from "../types/audit-log.types";

export function useAuditLogsList(filters: AuditLogsListFilters) {
  return useAdminCollection<AuditLog, AuditLogsListFilters>({
    filters,
    getItems: getAuditLogs,
  });
}
