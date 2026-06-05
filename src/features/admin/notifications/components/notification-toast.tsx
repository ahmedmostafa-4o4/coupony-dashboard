"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils/cn";

import type { AdminNotification } from "../types/admin-notification.types";
import { NotificationTypeIcon } from "./notification-type-icon";

export function NotificationToast({
  notification,
  onDismiss,
  onClick,
}: {
  notification: AdminNotification;
  onDismiss: () => void;
  onClick: (notification: AdminNotification) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Slide in
    const showTimer = setTimeout(() => setIsVisible(true), 50);

    // Progress bar countdown
    const startTime = Date.now();
    const duration = 5000;
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(progressInterval);
      }
    }, 50);

    // Auto-dismiss
    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
      clearInterval(progressInterval);
    };
  }, [onDismiss]);

  return (
    <div
      className={cn(
        "pointer-events-auto w-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)] transition-all duration-300 ease-out",
        isVisible
          ? "translate-x-0 opacity-100"
          : "translate-x-[120%] opacity-0",
      )}
    >
      <button
        type="button"
        onClick={() => {
          onClick(notification);
          setIsVisible(false);
          setTimeout(onDismiss, 300);
        }}
        className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-slate-50"
      >
        <NotificationTypeIcon type={notification.type} size="md" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {notification.title}
          </p>
          <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
            {notification.message}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">Just now</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
            setTimeout(onDismiss, 300);
          }}
          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Dismiss notification"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12" />
            <path d="M18 6 6 18" />
          </svg>
        </button>
      </button>

      {/* Progress bar */}
      <div className="h-[2px] w-full bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
