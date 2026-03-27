import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import {
  parseJsonObject,
  splitList,
  trimOptional,
} from "@/features/admin/shared/utils/admin-form-schema";

import type { BroadcastNotificationRequest } from "../types/notification-broadcast.types";

export interface NotificationBroadcastFormValues {
  channel: string;
  dataJson: string;
  message: string;
  referenceId: string;
  referenceType: string;
  roleNames: string;
  storeIds: string;
  title: string;
  type: string;
  userIds: string;
}

export const notificationBroadcastFormSchema: AdminFormSchema<
  NotificationBroadcastFormValues,
  BroadcastNotificationRequest
> = {
  defaultValues: {
    channel: "push",
    dataJson: "",
    message: "",
    referenceId: "",
    referenceType: "",
    roleNames: "",
    storeIds: "",
    title: "",
    type: "admin_broadcast",
    userIds: "",
  },
  transform(values) {
    return {
      channel: values.channel as BroadcastNotificationRequest["channel"],
      data: parseJsonObject(values.dataJson),
      message: values.message.trim(),
      recipient_filter: {
        role: splitList(values.roleNames),
        store_ids: splitList(values.storeIds),
        user_ids: splitList(values.userIds),
      },
      reference_id: trimOptional(values.referenceId),
      reference_type: trimOptional(values.referenceType),
      title: values.title.trim(),
      type: values.type.trim(),
    };
  },
  validate(values) {
    return {
      message: values.message.trim() ? undefined : "Message is required.",
      title: values.title.trim() ? undefined : "Title is required.",
      type: values.type.trim() ? undefined : "Type is required.",
    };
  },
};
