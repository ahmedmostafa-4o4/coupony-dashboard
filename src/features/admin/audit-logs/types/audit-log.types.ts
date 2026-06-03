import type { AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type { AdminAuditLogsQueryDto, AuditLogDto } from "./audit-logs.dto";

export type AuditLog = Camelized<AuditLogDto>;
export type AuditLogsListFilters = Camelized<AdminAuditLogsQueryDto>;
export type AuditLogsListResult = AdminListResult<AuditLog>;
