"use client";

import { useAdminCollection } from "@/features/admin/shared";
import { getBroadcasts } from "../api/get-broadcasts";
import type { NotificationBroadcast } from "../types/notification-broadcast.types";

export function useBroadcasts(filters: { page?: number; per_page?: number }) {
  return useAdminCollection<NotificationBroadcast, { page?: number; per_page?: number }>({
    filters,
    getItems: getBroadcasts,
  });
}
