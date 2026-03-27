import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import type { AdminAuditLogsListResponseDto } from "../types/audit-logs.dto";
import type { AuditLogsListFilters } from "../types/audit-log.types";

export async function getAuditLogs(filters: AuditLogsListFilters = {}) {
  const response = await apiClient.get<AdminAuditLogsListResponseDto>(
    apiEndpoints.admin.auditLogs.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response);
}
