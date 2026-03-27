import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminRemoveUserRoleResponseDto } from "../types/users.dto";

export async function removeUserRole(userId: string, assignmentId: string) {
  return apiClient.delete<AdminRemoveUserRoleResponseDto>(
    apiEndpoints.admin.users.roleAssignment(userId, assignmentId)
  );
}
