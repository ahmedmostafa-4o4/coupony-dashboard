"use client";

import { useAdminResource } from "@/features/admin/shared";
import { getBroadcast } from "../api/get-broadcast";
import type { NotificationBroadcast } from "../types/notification-broadcast.types";

export function useBroadcast(id: string) {
  return useAdminResource<NotificationBroadcast>({
    id,
    getItem: getBroadcast,
  });
}
