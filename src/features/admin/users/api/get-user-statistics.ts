import { toAdminItemResult } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { camelizeKeys } from "@/lib/utils/case";
import type { Camelized } from "@/types";

import type { AdminUserStatisticsResponseDto } from "../types/users.dto";

export async function getUserStatistics() {
  const response = await apiClient.get<AdminUserStatisticsResponseDto>(
    apiEndpoints.admin.users.statistics
  );

  return toAdminItemResult(
    camelizeKeys(response.data) as unknown as Camelized<
      AdminUserStatisticsResponseDto["data"]
    >,
    response
  );
}
