"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { getAccessToken } from "@/lib/auth/session";

import { useAdminNotifications } from "../hooks/use-admin-notifications";
import { useNotificationSocket } from "../hooks/use-notification-socket";
import { resolveNotificationHref } from "../utils/resolve-notification-href";
import { NotificationToast } from "../components/notification-toast";
import type { AdminNotification } from "../types/admin-notification.types";

interface AdminNotificationContextValue {
  notifications: AdminNotification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  page: number;
  lastPage: number;
  total: number;
  refresh: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  markAsRead: (ids: number[]) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

const AdminNotificationContext =
  createContext<AdminNotificationContextValue | null>(null);

export function useAdminNotificationContext() {
  const ctx = useContext(AdminNotificationContext);
  if (!ctx) {
    throw new Error(
      "useAdminNotificationContext must be used within AdminNotificationProvider",
    );
  }
  return ctx;
}

export function AdminNotificationProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  const router = useRouter();
  const [toastQueue, setToastQueue] = useState<AdminNotification[]>([]);

  const {
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
  } = useAdminNotifications({ per_page: 20 });

  const handleRealtimeNotification = useCallback(
    (notification: AdminNotification) => {
      prependNotification(notification);
      setToastQueue((prev) => [...prev, notification]);
    },
    [prependNotification],
  );

  const token = typeof window !== "undefined" ? getAccessToken() : null;

  useNotificationSocket({
    onNotification: handleRealtimeNotification,
    token,
  });

  function dismissToast(id: number) {
    setToastQueue((prev) => prev.filter((n) => n.id !== id));
  }

  function handleToastClick(notification: AdminNotification) {
    const href = resolveNotificationHref(lang, notification);
    if (href) {
      router.push(href);
    }
    dismissToast(notification.id);
  }

  return (
    <AdminNotificationContext.Provider
      value={{
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
      }}
    >
      {children}

      {/* Toast container — bottom-right fixed */}
      <div className="pointer-events-none fixed bottom-6 end-6 z-[9999] flex flex-col-reverse gap-3">
        {toastQueue.slice(-3).map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onDismiss={() => dismissToast(notification.id)}
            onClick={handleToastClick}
          />
        ))}
      </div>
    </AdminNotificationContext.Provider>
  );
}
