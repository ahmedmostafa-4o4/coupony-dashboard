import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminCreateRoleDto,
  AdminRolePermissionsUpdateDto,
  AdminRolesQueryDto,
  AdminUpdateRoleDto,
  PermissionDto,
  RoleDto,
} from "./roles.dto";

export type RolePermission = Camelized<PermissionDto>;
export type Role = Camelized<RoleDto> & {
  status?: string;
  permissions?: RolePermission[];
};

export type RolesListFilters = Camelized<AdminRolesQueryDto> & {
  search?: string;
  status?: string;
};

export type RolesListResult = AdminListResult<Role>;
export type RoleDetailsResult = AdminItemResult<Role>;
export type CreateRoleRequest = AdminCreateRoleDto;
export type UpdateRoleRequest = AdminUpdateRoleDto;
export type UpdateRolePermissionsRequest = AdminRolePermissionsUpdateDto;
