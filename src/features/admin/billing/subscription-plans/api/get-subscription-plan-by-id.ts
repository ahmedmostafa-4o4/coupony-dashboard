import { getSubscriptionPlans } from "./get-subscription-plans";

import { adaptSubscriptionPlanDetailsFallback } from "../utils/subscription-plan-details.adapter";

export async function getSubscriptionPlanById(planId: string) {
  const response = await getSubscriptionPlans();

  return adaptSubscriptionPlanDetailsFallback(planId, response);
}
