import { toAdminItemResult } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { camelizeKeys } from "@/lib/utils/case";
import type { Camelized } from "@/types";

import { mapUserDetails } from "../utils/user.mappers";
import type { AdminUserDetailsResponseDto } from "../types/users.dto";

export async function getUserById(userId: string) {
  const response = await apiClient.get<AdminUserDetailsResponseDto>(
    apiEndpoints.admin.users.detail(userId)
  );

  return toAdminItemResult(
    mapUserDetails(camelizeKeys(response.data) as Camelized<AdminUserDetailsResponseDto["data"]>),
    response
  );
}
