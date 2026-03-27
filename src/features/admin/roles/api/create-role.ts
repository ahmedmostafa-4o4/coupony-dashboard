import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminCreateRoleResponseDto } from "../types/roles.dto";
import type { CreateRoleRequest } from "../types/role.types";

export async function createRole(payload: CreateRoleRequest) {
  return apiClient.post<AdminCreateRoleResponseDto, CreateRoleRequest>(
    apiEndpoints.admin.roles.list,
    payload
  );
}
