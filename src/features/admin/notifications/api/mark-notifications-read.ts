import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type {
  MarkAsReadRequest,
  MarkAsReadResponse,
} from "../types/admin-notification.types";

export async function markNotificationsRead(
  notificationIds: number[] = [],
): Promise<MarkAsReadResponse> {
  return apiClient.post<MarkAsReadResponse, MarkAsReadRequest>(
    apiEndpoints.admin.notifications.markAsRead,
    { notification_ids: notificationIds },
  );
}
