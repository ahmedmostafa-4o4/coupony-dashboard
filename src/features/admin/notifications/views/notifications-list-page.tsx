"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  AdminPageHeader,
  AdminSection,
  KpiCard,
  AdminPagination,
} from "@/features/admin/shared";
import { BellIcon, BellRingIcon, CheckIcon } from "lucide-react";

import { useAdminNotificationContext } from "../context/admin-notification-provider";
import { NotificationItem } from "../components/notification-item";
import { resolveNotificationHref } from "../utils/resolve-notification-href";
import type { AdminNotification } from "../types/admin-notification.types";
import type { NotificationsDictionary } from "../utils/get-dictionary";

type FilterTab = "all" | "unread";

export function NotificationsListPage({ lang, dict }: { lang: string; dict: NotificationsDictionary }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const {
    notifications,
    unreadCount,
    isLoading,
    total,
    page,
    lastPage,
    goToPage,
    markAsRead,
    markAllAsRead,
  } = useAdminNotificationContext();

  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.is_read)
      : notifications;

  function handleNotificationClick(notification: AdminNotification) {
    if (!notification.is_read) {
      markAsRead([notification.id]);
    }
    const href = resolveNotificationHref(lang, notification);
    if (href) {
      router.push(href);
    }
  }

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: dict.list.all },
    { key: "unread", label: dict.list.unreadTab.replace("{count}", unreadCount.toString()) },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description={dict.list.description}
        eyebrow={dict.list.eyebrow}
        title={dict.list.title}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          title={dict.list.total}
          value={total}
          description=""
          icon={<BellIcon />}
        />
        <KpiCard
          title={dict.list.unread}
          value={unreadCount}
          description=""
          icon={<BellRingIcon />}
        />
        <KpiCard
          title={dict.list.read}
          value={Math.max(0, total - unreadCount)}
          description=""
          icon={<CheckIcon />}
        />
      </div>

      {/* Filters + Actions */}
      <AdminSection title={dict.list.sectionTitle}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-lg px-4 py-2 text-xs font-medium transition ${
                  activeTab === tab.key
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mark all as read */}
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 rounded-xl bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 12 2 2 4-4" />
                <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
              </svg>
              {dict.list.markAllRead}
            </button>
          )}
        </div>

        {/* Notification list */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800" />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
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
            <p className="mt-4 text-sm font-medium text-slate-600">
              {activeTab === "unread"
                ? dict.list.noUnread
                : dict.list.noNotifications}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {activeTab === "unread"
                ? dict.list.caughtUp
                : dict.list.willAppear}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {lastPage > 1 && activeTab === "all" && (
          <div className="mt-4 flex justify-center">
            <AdminPagination
              currentPage={page}
              lastPage={lastPage}
              perPage={20}
              onPageChange={goToPage}
              onPerPageChange={() => {}}
            />
          </div>
        )}
      </AdminSection>
    </div>
  );
}
