"use client";

import { cn } from "@/lib/utils/cn";

import type { AdminNotification } from "../types/admin-notification.types";
import {
  NotificationTypeIcon,
  getNotificationAccentColor,
} from "./notification-type-icon";

export function NotificationItem({
  notification,
  onClick,
  compact = false,
}: {
  notification: AdminNotification;
  onClick?: (notification: AdminNotification) => void;
  compact?: boolean;
}) {
  const isUnread = !notification.is_read;
  const accentBorder = getNotificationAccentColor(notification.type);

  return (
    <button
      type="button"
      onClick={() => onClick?.(notification)}
      className={cn(
        "flex w-full items-start gap-3 rounded-2xl border-l-[3px] px-4 py-3 text-left transition-all duration-150",
        isUnread
          ? `${accentBorder} bg-slate-50/80 hover:bg-slate-100/80`
          : "border-transparent hover:bg-slate-50/60",
        onClick && "cursor-pointer",
      )}
    >
      <NotificationTypeIcon
        type={notification.type}
        size={compact ? "sm" : "md"}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "truncate text-sm",
              isUnread ? "font-semibold text-slate-900" : "font-medium text-slate-700",
            )}
          >
            {notification.title}
          </p>
          {isUnread && (
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
          {notification.message}
        </p>
        <p className="mt-1 text-[11px] text-slate-400">
          {notification.time_ago}
        </p>
      </div>
    </button>
  );
}
