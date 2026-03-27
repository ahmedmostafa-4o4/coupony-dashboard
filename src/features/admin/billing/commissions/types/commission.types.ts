import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type { AdminCommissionNoteDto, AdminCommissionsQueryDto, CommissionDto } from "./commissions.dto";

export type Commission = Camelized<CommissionDto>;
export type CommissionsListFilters = Camelized<AdminCommissionsQueryDto> & {
  search?: string;
};
export type CommissionsListResult = AdminListResult<Commission>;
export type CommissionDetailsResult = AdminItemResult<Commission>;
export type CommissionActionRequest = AdminCommissionNoteDto;
