import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminDeleteRoleResponseDto } from "../types/roles.dto";

export async function deleteRole(roleId: string) {
  return apiClient.delete<AdminDeleteRoleResponseDto>(
    apiEndpoints.admin.roles.detail(roleId)
  );
}
