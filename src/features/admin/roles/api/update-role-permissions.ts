import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateRolePermissionsResponseDto } from "../types/roles.dto";
import type { UpdateRolePermissionsRequest } from "../types/role.types";

export async function updateRolePermissions(
  roleId: string,
  payload: UpdateRolePermissionsRequest
) {
  return apiClient.put<
    AdminUpdateRolePermissionsResponseDto,
    UpdateRolePermissionsRequest
  >(apiEndpoints.admin.roles.permissions(roleId), payload);
}
