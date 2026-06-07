import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { NotificationBroadcast } from "../types/notification-broadcast.types";

export async function getBroadcast(id: string): Promise<{ data: NotificationBroadcast }> {
  return apiClient.get(
    `${apiEndpoints.admin.notifications.broadcasts}/${id}`,
  );
}
