import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateRoleResponseDto } from "../types/roles.dto";
import type { UpdateRoleRequest } from "../types/role.types";

export async function updateRole(roleId: string, payload: UpdateRoleRequest) {
  return apiClient.patch<AdminUpdateRoleResponseDto, UpdateRoleRequest>(
    apiEndpoints.admin.roles.detail(roleId),
    payload
  );
}
