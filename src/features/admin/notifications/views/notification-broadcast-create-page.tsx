"use client";

import {
  AdminPageHeader,
  AdminSection,
} from "@/features/admin/shared";
import { useRouter } from "next/navigation";

import { NotificationBroadcastForm } from "../components/notification-broadcast-form";
import { useNotificationBroadcastActions } from "../hooks/use-notification-broadcast-actions";
import type { NotificationsDictionary } from "../utils/get-dictionary";

export function NotificationBroadcastCreatePage({ lang, dict }: { lang: string; dict: NotificationsDictionary }) {
  const actions = useNotificationBroadcastActions();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description={dict.broadcastCreate.description}
        eyebrow={dict.broadcastCreate.eyebrow}
        title={dict.broadcastCreate.title}
      />
      {actions.broadcastAction.error ? (
        <AdminSection title={dict.broadcastCreate.error}>
          <p className="text-sm text-rose-600">
            {actions.broadcastAction.error}
          </p>
        </AdminSection>
      ) : null}
      <NotificationBroadcastForm
        dict={dict}
        description={dict.broadcastCreate.formDesc}
        isSubmitting={actions.broadcastAction.isSubmitting}
        onSubmit={async (payload) => {
          await actions.broadcastAction.submit(payload);
          router.push(`/${lang}/admin/notifications/broadcast`);
        }}
        submitLabel={dict.broadcastCreate.send}
        title={dict.broadcastCreate.formTitle}
      />
    </div>
  );
}
