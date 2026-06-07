import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";
import type { ApiCollectionResponse } from "@/types";

import type { NotificationBroadcast } from "../types/notification-broadcast.types";

export interface GetBroadcastsParams extends Record<string, unknown> {
  page?: number;
  per_page?: number;
}

export async function getBroadcasts(
  params: GetBroadcastsParams = {},
): Promise<ApiCollectionResponse<NotificationBroadcast>> {
  return apiClient.get(apiEndpoints.admin.notifications.broadcasts, {
    query: buildAdminQuery(params),
  });
}
