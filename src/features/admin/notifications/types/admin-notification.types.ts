/* =========================================================
   Admin Notification Types
   ========================================================= */

export type NotificationType =
  | "NewStoreRegistrationNotification"
  | "NewProductRevisionNotification"
  | "PendingManualPaymentNotification"
  | "SubscriptionCancelledNotification"
  | "StoreLimitReachedNotification";

export interface AdminNotification {
  id: number;
  user_id: string;
  type: NotificationType | string;
  title: string;
  message: string;
  data: Record<string, unknown>;
  image_url: string | null;
  badge_status: string | null;
  channel: string;
  status: string;
  reference_type: string | null;
  reference_id: string | null;
  sent_at: string | null;
  read_at: string | null;
  created_at: string;
  updated_at: string;
  is_read: boolean;
  is_sent: boolean;
  time_ago: string;
}

export interface AdminNotificationMeta {
  current_page: number;
  last_page: number;
  total: number;
  unread_count: number;
}

export interface AdminNotificationsResponse {
  success?: boolean;
  message: string;
  data: AdminNotification[];
  meta: AdminNotificationMeta;
}

export interface MarkAsReadRequest {
  notification_ids: number[];
}

export interface MarkAsReadResponse {
  success?: boolean;
  message: string;
  data: {
    unread_count: number;
  };
}

export interface AdminNotificationsQueryParams {
  per_page?: number;
  page?: number;
  unread_only?: boolean;
}
