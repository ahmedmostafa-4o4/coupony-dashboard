import type {
  AdminBroadcastNotificationDto,
} from "./notifications.dto";

export type BroadcastNotificationRequest = AdminBroadcastNotificationDto;

export interface NotificationBroadcastAdmin {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface NotificationBroadcast {
  id: string;
  admin_id: string;
  title: string;
  message: string;
  channels: string[];
  target_roles: string[] | null;
  target_user_ids: string[] | null;
  status: "pending" | "processing" | "completed" | "failed";
  total_sent: number;
  total_failed: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  admin?: NotificationBroadcastAdmin;
}
