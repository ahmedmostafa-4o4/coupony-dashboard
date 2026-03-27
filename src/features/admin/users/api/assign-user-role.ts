import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminAssignUserRoleResponseDto } from "../types/users.dto";
import type { AssignUserRoleRequest } from "../types/user.types";

export async function assignUserRole(
  userId: string,
  payload: AssignUserRoleRequest
) {
  return apiClient.post<AdminAssignUserRoleResponseDto, AssignUserRoleRequest>(
    apiEndpoints.admin.users.roles(userId),
    payload
  );
}
