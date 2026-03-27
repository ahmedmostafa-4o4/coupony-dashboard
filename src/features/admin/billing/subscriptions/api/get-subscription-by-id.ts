import { getSubscriptions } from "./get-subscriptions";

import { adaptSubscriptionDetailsFallback } from "../utils/subscription-details.adapter";

export async function getSubscriptionById(subscriptionId: string) {
  const response = await getSubscriptions();

  return adaptSubscriptionDetailsFallback(subscriptionId, response);
}
