import type { Camelized } from "@/types";

import type {
  AdminBroadcastNotificationDto,
  AdminBroadcastRecipientFilterDto,
  BroadcastChannel,
} from "./notifications.dto";

export type BroadcastChannelOption = BroadcastChannel;
export type BroadcastRecipientFilter = Camelized<AdminBroadcastRecipientFilterDto>;
export type BroadcastNotificationRequest = AdminBroadcastNotificationDto;
