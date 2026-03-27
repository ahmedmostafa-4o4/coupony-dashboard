import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminDeleteUserResponseDto } from "../types/users.dto";
import type { UserActionReasonRequest } from "../types/user.types";

export async function deleteUser(
  userId: string,
  payload: UserActionReasonRequest = {}
) {
  return apiClient.post<AdminDeleteUserResponseDto, UserActionReasonRequest>(
    apiEndpoints.admin.users.delete(userId),
    payload
  );
}
