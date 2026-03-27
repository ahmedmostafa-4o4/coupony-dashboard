import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminActivateUserResponseDto } from "../types/users.dto";

export async function activateUser(userId: string) {
  return apiClient.post<AdminActivateUserResponseDto>(
    apiEndpoints.admin.users.activate(userId)
  );
}
