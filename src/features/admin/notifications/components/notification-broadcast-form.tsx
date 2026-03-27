"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  notificationBroadcastFormSchema,
  type NotificationBroadcastFormValues,
} from "../schemas/notification-broadcast.schema";
import type { BroadcastNotificationRequest } from "../types/notification-broadcast.types";

const fields: AdminFormField<NotificationBroadcastFormValues>[] = [
  { key: "title", label: "Title", placeholder: "Important platform update" },
  {
    key: "type",
    label: "Type",
    placeholder: "admin_broadcast",
  },
  {
    key: "channel",
    label: "Channel",
    options: [
      { label: "Push", value: "push" },
      { label: "Email", value: "email" },
      { label: "SMS", value: "sms" },
      { label: "In-app", value: "in_app" },
    ],
    type: "select",
  },
  {
    key: "message",
    label: "Message",
    placeholder: "Write the broadcast message shown to recipients.",
    type: "textarea",
  },
  {
    key: "roleNames",
    label: "Recipient roles",
    description: "Comma or newline separated role slugs.",
    placeholder: "customer, seller",
    type: "textarea",
  },
  {
    key: "userIds",
    label: "Recipient user IDs",
    description: "Optional specific user UUIDs.",
    placeholder: "user-uuid-1, user-uuid-2",
    type: "textarea",
  },
  {
    key: "storeIds",
    label: "Recipient store IDs",
    description: "Optional specific store UUIDs.",
    placeholder: "store-uuid-1, store-uuid-2",
    type: "textarea",
  },
  { key: "referenceType", label: "Reference type", placeholder: "offer" },
  { key: "referenceId", label: "Reference ID", placeholder: "Optional UUID" },
  {
    key: "dataJson",
    label: "Extra data JSON",
    placeholder: '{\"deepLink\":\"/offers/123\"}',
    type: "textarea",
  },
];

export function NotificationBroadcastForm({
  description,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  isSubmitting?: boolean;
  onSubmit: (payload: BroadcastNotificationRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={notificationBroadcastFormSchema}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
