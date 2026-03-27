import type { AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type { AdminPermissionsQueryDto, PermissionDto } from "./permissions.dto";

export type Permission = Camelized<PermissionDto>;
export type PermissionsListFilters = Camelized<AdminPermissionsQueryDto> & {
  search?: string;
  status?: string;
};
export type PermissionsListResult = AdminListResult<Permission>;
