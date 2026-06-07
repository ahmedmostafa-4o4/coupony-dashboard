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

        const handleNotification = (rawPayload: any) => {
            // Laravel's BroadcastNotificationCreated wraps the toBroadcast array inside 'notification' or raw array
            const dataObj = rawPayload.notification || rawPayload;
            const now = new Date().toISOString();

            const normalized: AdminNotification = {
              id: rawPayload.id || dataObj.id || Date.now(), // Fallback to timestamp if backend UUID string
              user_id: dataObj.user_id || "",
              type: rawPayload.type || dataObj.type || "notification",
              title: dataObj.title || rawPayload.title || "New Notification",
              message: dataObj.message || rawPayload.message || "",
              data: dataObj.data || rawPayload.data || {},
              image_url: dataObj.image_url || rawPayload.image_url || null,
              badge_status: dataObj.badge_status || rawPayload.badge_status || null,
              channel: dataObj.channel || rawPayload.channel || "database",
              status: dataObj.status || rawPayload.status || "sent",
              reference_type: dataObj.reference_type || rawPayload.reference_type || null,
              reference_id: dataObj.reference_id || rawPayload.reference_id || null,
              sent_at: dataObj.sent_at || rawPayload.sent_at || now,
              read_at: null,
              created_at: dataObj.created_at || rawPayload.created_at || now,
              updated_at: dataObj.updated_at || rawPayload.updated_at || now,
              is_read: false,
              is_sent: true,
              time_ago: "Just now",
            };

            onNotificationRef.current(normalized);
        };

        echo
          .private("admin.notifications")
          .notification(handleNotification)
          .listen(".notification.sent", handleNotification);
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
