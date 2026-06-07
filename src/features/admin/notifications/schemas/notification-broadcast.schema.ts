import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";

import type { BroadcastNotificationRequest } from "../types/notification-broadcast.types";

export interface NotificationBroadcastFormValues {
  title: string;
  message: string;
  channels: string[];
  targetRoles: string[];
  targetUserIds: string[];
}

export const notificationBroadcastFormSchema: AdminFormSchema<
  NotificationBroadcastFormValues,
  BroadcastNotificationRequest
> = {
  defaultValues: {
    title: "",
    message: "",
    channels: [],
    targetRoles: [],
    targetUserIds: [],
  },
  transform(values) {
    return {
      title: values.title.trim(),
      message: values.message.trim(),
      channels: values.channels,
      target_roles: values.targetRoles,
      target_user_ids: values.targetUserIds,
    };
  },
  validate(values) {
    return {
      title: values.title.trim() ? undefined : "Title is required.",
      message: values.message.trim() ? undefined : "Message is required.",
      channels: values.channels.length > 0 ? undefined : "At least one channel is required.",
    };
  },
};
