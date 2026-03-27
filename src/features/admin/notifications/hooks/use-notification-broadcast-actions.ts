"use client";

import { useAdminAction } from "@/features/admin/shared";

import { broadcastNotification } from "../api/broadcast-notification";

export function useNotificationBroadcastActions(
  onSuccess?: () => Promise<void> | void
) {
  return {
    broadcastAction: useAdminAction({
      action: broadcastNotification,
      onSuccess,
    }),
  };
}
