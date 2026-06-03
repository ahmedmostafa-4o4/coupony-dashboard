import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ApiSuccessResponse } from "@/types/admin-api.dto";

export async function revokeUserSession(userId: string, sessionId: string) {
  return apiClient.delete<ApiSuccessResponse<void>>(
    apiEndpoints.admin.users.revokeSession(userId, sessionId)
  );
}
