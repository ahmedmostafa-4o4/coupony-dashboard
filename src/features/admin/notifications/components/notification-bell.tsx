"use client";

import { useState } from "react";

import { cn } from "@/lib/utils/cn";

import { useAdminNotificationContext } from "../context/admin-notification-provider";
import { NotificationDropdown } from "./notification-dropdown";

export function NotificationBell({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAllAsRead, markAsRead } =
    useAdminNotificationContext();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50",
          isOpen && "bg-slate-100 ring-2 ring-slate-300",
        )}
        aria-label="Notifications"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v4" />
          <path d="M17 10a5 5 0 1 0-10 0c0 2.4-1 3.4-2 4.5h14c-1-1.1-2-2.1-2-4.5Z" />
          <path d="M10 18a2 2 0 0 0 4 0" />
        </svg>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-sm">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <NotificationDropdown
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAllAsRead={markAllAsRead}
        onNotificationClick={(notification) => {
          if (!notification.is_read) {
            markAsRead([notification.id]);
          }
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        lang={lang}
      />
    </div>
  );
}
