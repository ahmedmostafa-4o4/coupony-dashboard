import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import type {
  AdminNotificationsResponse,
  AdminNotificationsQueryParams,
} from "../types/admin-notification.types";

export async function getAdminNotifications(
  params: AdminNotificationsQueryParams = {},
): Promise<AdminNotificationsResponse> {
  const searchParams = new URLSearchParams();

  if (params.per_page) {
    searchParams.set("per_page", String(params.per_page));
  }
  if (params.page) {
    searchParams.set("page", String(params.page));
  }
  if (params.unread_only) {
    searchParams.set("unread_only", "1");
  }

  const query = searchParams.toString();
  const url = `${apiEndpoints.admin.notifications.list}${query ? `?${query}` : ""}`;

  return apiClient.get<AdminNotificationsResponse>(url);
}
