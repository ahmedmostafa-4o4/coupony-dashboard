"use client";

import {
  AdminPageHeader,
  AdminSection,
} from "@/features/admin/shared";

import { NotificationBroadcastForm } from "../components/notification-broadcast-form";
import { useNotificationBroadcastActions } from "../hooks/use-notification-broadcast-actions";

export function NotificationBroadcastPage({ lang }: { lang: string }) {
  const actions = useNotificationBroadcastActions();

  void lang;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description="Send a typed admin broadcast request to the notification pipeline."
        eyebrow="Support"
        title="Notification Broadcast"
      />
      {actions.broadcastAction.error ? (
        <AdminSection title="Broadcast error">
          <p className="text-sm text-rose-600">
            {actions.broadcastAction.error}
          </p>
        </AdminSection>
      ) : null}
      <NotificationBroadcastForm
        description="Compose a typed notification payload with recipient filters and optional metadata."
        isSubmitting={actions.broadcastAction.isSubmitting}
        onSubmit={async (payload) => {
          await actions.broadcastAction.submit(payload);
        }}
        submitLabel="Send broadcast"
        title="Broadcast payload"
      />
      <AdminSection title="Endpoint mapping">
        <p className="text-sm leading-6 text-slate-500">
          This page is wired to <code>/admin/notifications/broadcast</code>.
        </p>
      </AdminSection>
    </div>
  );
}
