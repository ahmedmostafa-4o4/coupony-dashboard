import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminSubscriptionsQueryDto,
  AdminUpdateSubscriptionDto,
  SubscriptionDto,
} from "./subscriptions.dto";

export type Subscription = Camelized<SubscriptionDto> & {
  gracePeriodEnd?: string | null;
  degradedPeriodEnd?: string | null;
  trialEndsAt?: string | null;
  plan?: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    priceMonthly: string;
    priceYearly: string;
    currency: string;
    maxProducts: number;
    maxEmployees: number;
    maxBranches: number;
    features: string[];
  } | null;
};
export type SubscriptionsListFilters = Camelized<AdminSubscriptionsQueryDto> & {
  search?: string;
};
export type SubscriptionsListResult = AdminListResult<Subscription>;
export type SubscriptionDetailsResult = AdminItemResult<Subscription>;
export type UpdateSubscriptionRequest = AdminUpdateSubscriptionDto;
