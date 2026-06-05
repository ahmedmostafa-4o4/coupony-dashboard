"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils/cn";
import { createAdminHref } from "@/features/admin/shared";

import type { AdminNotification } from "../types/admin-notification.types";
import { resolveNotificationHref } from "../utils/resolve-notification-href";
import { NotificationItem } from "./notification-item";

export function NotificationDropdown({
  notifications,
  unreadCount,
  onMarkAllAsRead,
  onNotificationClick,
  isOpen,
  onClose,
  lang,
}: {
  notifications: AdminNotification[];
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: AdminNotification) => void;
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const recentNotifications = notifications.slice(0, 5);

  // Click-outside-to-close
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleItemClick(notification: AdminNotification) {
    onNotificationClick(notification);
    const href = resolveNotificationHref(lang, notification);
    if (href) {
      router.push(href);
    }
    onClose();
  }

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "absolute end-0 top-full z-50 mt-2 w-[400px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]",
        "animate-in fade-in slide-in-from-top-2 duration-200",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-900">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="text-xs font-medium text-blue-600 transition hover:text-blue-800"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="max-h-[360px] overflow-y-auto">
        {recentNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
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
            </div>
            <p className="mt-3 text-sm font-medium text-slate-500">
              All caught up!
            </p>
            <p className="text-xs text-slate-400">No new notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 p-1.5">
            {recentNotifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onClick={handleItemClick}
                compact
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-5 py-3">
        <Link
          href={createAdminHref(lang, "notificationCenter")}
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 transition hover:text-slate-900"
        >
          View all notifications
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
