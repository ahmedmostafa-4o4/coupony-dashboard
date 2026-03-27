import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminUpdateUserResponseDto } from "../types/users.dto";
import type { UpdateUserRequest } from "../types/user.types";

export async function updateUser(userId: string, payload: UpdateUserRequest) {
  return apiClient.patch<AdminUpdateUserResponseDto, UpdateUserRequest>(
    apiEndpoints.admin.users.detail(userId),
    payload
  );
}
