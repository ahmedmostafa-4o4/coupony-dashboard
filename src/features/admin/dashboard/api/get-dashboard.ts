import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapDashboardOverview } from "../utils/dashboard.mappers";
import type { AdminDashboardResponseDto } from "../types/dashboard.dto";

export async function getDashboardOverview() {
  const response = await apiClient.get<AdminDashboardResponseDto>(
    apiEndpoints.admin.dashboard
  );

  return mapItemResponse(response, mapDashboardOverview);
}
