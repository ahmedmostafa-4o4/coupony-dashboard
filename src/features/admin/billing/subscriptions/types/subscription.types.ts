import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminSubscriptionsQueryDto,
  AdminUpdateSubscriptionDto,
  SubscriptionDto,
} from "./subscriptions.dto";

export type Subscription = Camelized<SubscriptionDto>;
export type SubscriptionsListFilters = Camelized<AdminSubscriptionsQueryDto> & {
  search?: string;
};
export type SubscriptionsListResult = AdminListResult<Subscription>;
export type SubscriptionDetailsResult = AdminItemResult<Subscription>;
export type UpdateSubscriptionRequest = AdminUpdateSubscriptionDto;
