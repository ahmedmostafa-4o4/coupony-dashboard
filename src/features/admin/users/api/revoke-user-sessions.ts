import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function revokeUserSessions(userId: string) {
  return apiClient.delete<ApiSuccessResponse<void>>(
    apiEndpoints.admin.users.revokeAllSessions(userId)
  );
}
