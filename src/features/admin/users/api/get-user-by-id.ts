import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapUserDetails } from "../utils/user.mappers";
import type { AdminUserDetailsResponseDto } from "../types/users.dto";

export async function getUserById(userId: string) {
  const response = await apiClient.get<AdminUserDetailsResponseDto>(
    apiEndpoints.admin.users.detail(userId)
  );

  return mapItemResponse(response, mapUserDetails);
}
