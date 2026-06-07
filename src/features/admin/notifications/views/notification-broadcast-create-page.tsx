"use client";

import {
  AdminPageHeader,
  AdminSection,
} from "@/features/admin/shared";
import { useRouter } from "next/navigation";

import { NotificationBroadcastForm } from "../components/notification-broadcast-form";
import { useNotificationBroadcastActions } from "../hooks/use-notification-broadcast-actions";

export function NotificationBroadcastCreatePage({ lang }: { lang: string }) {
  const actions = useNotificationBroadcastActions();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description="Send a typed admin broadcast request to the notification pipeline."
        eyebrow="Support"
        title="Create Broadcast"
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
          router.push(`/${lang}/admin/notifications/broadcast`);
        }}
        submitLabel="Send broadcast"
        title="Broadcast payload"
      />
    </div>
  );
}
