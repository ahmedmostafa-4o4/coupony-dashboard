import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type { AdminBroadcastNotificationResponseDto } from "../types/notifications.dto";
import type { BroadcastNotificationRequest } from "../types/notification-broadcast.types";

export async function broadcastNotification(
  payload: BroadcastNotificationRequest
) {
  return apiClient.post<
    AdminBroadcastNotificationResponseDto,
    BroadcastNotificationRequest
  >(apiEndpoints.admin.notifications.broadcast, payload);
}
