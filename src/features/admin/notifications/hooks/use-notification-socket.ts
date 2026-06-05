"use client";

import { useEffect, useRef } from "react";

import type { AdminNotification } from "../types/admin-notification.types";

/**
 * Hook to subscribe to real-time admin notifications via Pusher + Laravel Echo.
 *
 * Requires `laravel-echo` and `pusher-js` to be installed:
 *   npm install laravel-echo pusher-js
 *
 * Environment variables:
 *   NEXT_PUBLIC_PUSHER_APP_KEY
 *   NEXT_PUBLIC_PUSHER_APP_CLUSTER
 */
export function useNotificationSocket({
  onNotification,
  token,
}: {
  onNotification: (notification: AdminNotification) => void;
  token: string | null;
}) {
  const onNotificationRef = useRef(onNotification);
  onNotificationRef.current = onNotification;

  useEffect(() => {
    if (!token) return;

    const appKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? "mt1";

    if (!appKey) {
      console.warn(
        "[useNotificationSocket] NEXT_PUBLIC_PUSHER_APP_KEY is not set, skipping WebSocket connection.",
      );
      return;
    }

    let echoInstance: unknown = null;

    async function connect() {
      try {
        const [{ default: Echo }, PusherModule] = await Promise.all([
          import("laravel-echo"),
          import("pusher-js"),
        ]);

        const Pusher =
          "default" in PusherModule ? PusherModule.default : PusherModule;

        // Make Pusher available globally for Echo
        (window as unknown as Record<string, unknown>).Pusher = Pusher;

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const authEndpoint = baseUrl 
          ? `${new URL(baseUrl).origin}/broadcasting/auth`
          : "/broadcasting/auth";

        const echo = new Echo({
          broadcaster: "pusher",
          key: appKey,
          cluster,
          forceTLS: true,
          authEndpoint,
          auth: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        echoInstance = echo;

        echo
          .private("admin.notifications")
          .notification((notification: AdminNotification) => {
            onNotificationRef.current(notification);
          });
      } catch (err) {
        console.warn("[useNotificationSocket] Failed to connect:", err);
      }
    }

    connect();

    return () => {
      if (echoInstance && typeof (echoInstance as { disconnect: () => void }).disconnect === "function") {
        (echoInstance as { disconnect: () => void }).disconnect();
      }
    };
  }, [token]);
}
