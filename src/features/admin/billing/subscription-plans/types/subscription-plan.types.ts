import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminCreateSubscriptionPlanDto,
  AdminSubscriptionPlansQueryDto,
  AdminUpdateSubscriptionPlanDto,
  SubscriptionPlanDto,
} from "./subscription-plans.dto";

export type SubscriptionPlan = Camelized<SubscriptionPlanDto>;
export type SubscriptionPlansListFilters = Camelized<AdminSubscriptionPlansQueryDto> & {
  search?: string;
  status?: string;
};
export type SubscriptionPlansListResult = AdminListResult<SubscriptionPlan>;
export type SubscriptionPlanDetailsResult = AdminItemResult<SubscriptionPlan>;
export type CreateSubscriptionPlanRequest = AdminCreateSubscriptionPlanDto;
export type UpdateSubscriptionPlanRequest = AdminUpdateSubscriptionPlanDto;
