import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminDeleteUserResponseDto } from "../types/users.dto";
import type { UserActionReasonRequest } from "../types/user.types";

export async function deleteUser(
  userId: string,
  payload: UserActionReasonRequest = {}
) {
  void payload;

  return apiClient.delete<AdminDeleteUserResponseDto>(
    apiEndpoints.admin.users.delete(userId)
  );
}
