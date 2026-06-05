"use client";

import type { ReactNode } from "react";

import type { NotificationType } from "../types/admin-notification.types";

interface TypeConfig {
  icon: ReactNode;
  bgClass: string;
  textClass: string;
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 9.5 6 5h12l2 4.5" />
      <path d="M5 9h14v10H5z" />
      <path d="M9 19v-4h6v4" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="5" y="6" width="14" height="12" rx="2.5" />
      <path d="M5 10h14" />
    </svg>
  );
}

function XCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="8" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 5v4" />
      <path d="M17 10a5 5 0 1 0-10 0c0 2.4-1 3.4-2 4.5h14c-1-1.1-2-2.1-2-4.5Z" />
      <path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  );
}

const TYPE_CONFIG: Record<string, TypeConfig> = {
  NewStoreRegistrationNotification: {
    icon: <StoreIcon />,
    bgClass: "bg-blue-100",
    textClass: "text-blue-600",
  },
  NewProductRevisionNotification: {
    icon: <PackageIcon />,
    bgClass: "bg-violet-100",
    textClass: "text-violet-600",
  },
  PendingManualPaymentNotification: {
    icon: <CreditCardIcon />,
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-600",
  },
  SubscriptionCancelledNotification: {
    icon: <XCircleIcon />,
    bgClass: "bg-rose-100",
    textClass: "text-rose-600",
  },
  StoreLimitReachedNotification: {
    icon: <AlertTriangleIcon />,
    bgClass: "bg-amber-100",
    textClass: "text-amber-600",
  },
};

const DEFAULT_CONFIG: TypeConfig = {
  icon: <BellIcon />,
  bgClass: "bg-slate-100",
  textClass: "text-slate-600",
};

export function NotificationTypeIcon({
  type,
  size = "sm",
}: {
  type: NotificationType | string;
  size?: "sm" | "md";
}) {
  const config = TYPE_CONFIG[type] ?? DEFAULT_CONFIG;
  const sizeClass = size === "md" ? "h-10 w-10" : "h-8 w-8";

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl ${config.bgClass} ${config.textClass} ${sizeClass}`}
    >
      {config.icon}
    </span>
  );
}

export function getNotificationAccentColor(type: NotificationType | string): string {
  const config = TYPE_CONFIG[type];
  if (!config) return "border-slate-200";

  switch (type) {
    case "NewStoreRegistrationNotification": return "border-blue-400";
    case "NewProductRevisionNotification": return "border-violet-400";
    case "PendingManualPaymentNotification": return "border-emerald-400";
    case "SubscriptionCancelledNotification": return "border-rose-400";
    case "StoreLimitReachedNotification": return "border-amber-400";
    default: return "border-slate-200";
  }
}
