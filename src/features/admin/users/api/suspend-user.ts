import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminSuspendUserResponseDto } from "../types/users.dto";
import type { UserActionReasonRequest } from "../types/user.types";

export async function suspendUser(
  userId: string,
  payload: UserActionReasonRequest = {}
) {
  return apiClient.post<AdminSuspendUserResponseDto, UserActionReasonRequest>(
    apiEndpoints.admin.users.suspend(userId),
    payload
  );
}
