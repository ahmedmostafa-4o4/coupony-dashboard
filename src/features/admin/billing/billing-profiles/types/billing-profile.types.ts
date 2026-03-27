import type { AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type { AdminBillingProfilesQueryDto, BillingProfileDto } from "./billing-profiles.dto";

export type BillingProfile = Camelized<BillingProfileDto>;
export type BillingProfilesListFilters = Camelized<AdminBillingProfilesQueryDto> & {
  search?: string;
  status?: string;
};
export type BillingProfilesListResult = AdminListResult<BillingProfile>;
