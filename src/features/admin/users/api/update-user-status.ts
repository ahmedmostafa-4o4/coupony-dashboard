import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type {
  AdminUpdateUserStatusRequest,
  AdminUpdateUserStatusResponseDto,
} from "../types/users.dto";

export async function updateUserStatus(
  userId: string,
  payload: AdminUpdateUserStatusRequest
) {
  return apiClient.patch<
    AdminUpdateUserStatusResponseDto,
    AdminUpdateUserStatusRequest
  >(apiEndpoints.admin.users.status(userId), payload);
}
