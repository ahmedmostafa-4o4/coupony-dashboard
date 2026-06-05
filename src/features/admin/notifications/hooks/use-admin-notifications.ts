"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getAdminNotifications } from "../api/get-admin-notifications";
import { markNotificationsRead } from "../api/mark-notifications-read";
import type {
  AdminNotification,
  AdminNotificationsQueryParams,
} from "../types/admin-notification.types";

export function useAdminNotifications(
  initialParams: AdminNotificationsQueryParams = { per_page: 20 },
) {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const paramsRef = useRef(initialParams);

  const fetchNotifications = useCallback(
    async (params?: AdminNotificationsQueryParams) => {
      try {
        setIsLoading(true);
        setError(null);
        const mergedParams = { ...paramsRef.current, ...params };
        const response = await getAdminNotifications(mergedParams);
        setNotifications(response.data);
        setUnreadCount(response.meta.unread_count);
        setPage(response.meta.current_page);
        setLastPage(response.meta.last_page);
        setTotal(response.meta.total);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch notifications",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const refresh = useCallback(() => {
    return fetchNotifications({ page: 1 });
  }, [fetchNotifications]);

  const goToPage = useCallback(
    (p: number) => {
      return fetchNotifications({ ...paramsRef.current, page: p });
    },
    [fetchNotifications],
  );

  const markAsRead = useCallback(
    async (ids: number[]) => {
      try {
        const response = await markNotificationsRead(ids);
        setUnreadCount(response.data.unread_count);
        setNotifications((prev) =>
          prev.map((n) =>
            ids.includes(n.id) ? { ...n, is_read: true, read_at: new Date().toISOString() } : n,
          ),
        );
      } catch {
        await refresh();
      }
    },
    [refresh],
  );

  const markAllAsRead = useCallback(async () => {
    try {
      const response = await markNotificationsRead([]);
      setUnreadCount(response.data.unread_count);
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, is_read: true, read_at: new Date().toISOString() })),
      );
    } catch {
      await refresh();
    }
  }, [refresh]);

  /** Prepend a real-time notification from the WebSocket. */
  const prependNotification = useCallback((notification: AdminNotification) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnreadCount((prev) => prev + 1);
    setTotal((prev) => prev + 1);
  }, []);

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    page,
    lastPage,
    total,
    refresh,
    goToPage,
    markAsRead,
    markAllAsRead,
    prependNotification,
    setUnreadCount,
  };
}
