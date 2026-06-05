import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { toAdminItemResult } from "@/lib/api/admin-contract";
import type { SubscriptionDto } from "../types/subscriptions.dto";
import type { SubscriptionDetailsResult } from "../types/subscription.types";

export async function getSubscriptionById(subscriptionId: string): Promise<SubscriptionDetailsResult> {
  const response = await apiClient.get<{ data: SubscriptionDto | SubscriptionDto[] }>(
    apiEndpoints.admin.billing.subscriptions.detail(subscriptionId)
  );

  const jsonBody: any = response;
  const itemData: any = Array.isArray(jsonBody.data) ? jsonBody.data[0] : jsonBody.data;

  if (!itemData) {
    return toAdminItemResult(null as unknown as any, jsonBody);
  }

  return toAdminItemResult({
    id: itemData.id,
    storeId: itemData.store_id,
    planId: itemData.plan_id,
    status: itemData.status,
    billingCycle: itemData.billing_cycle,
    collectionMethod: itemData.collection_method,
    currentPeriodStart: itemData.current_period_start,
    currentPeriodEnd: itemData.current_period_end,
    gracePeriodEnd: itemData.grace_period_end,
    degradedPeriodEnd: itemData.degraded_period_end,
    trialStart: itemData.trial_start,
    trialEndsAt: itemData.trial_ends_at,
    trialEnd: itemData.trial_end,
    cancelAtPeriodEnd: itemData.cancel_at_period_end,
    cancelledAt: itemData.cancelled_at,
    createdAt: itemData.created_at,
    updatedAt: itemData.updated_at,
    plan: itemData.plan ? {
      id: itemData.plan.id,
      name: itemData.plan.name,
      slug: itemData.plan.slug,
      description: itemData.plan.description,
      priceMonthly: itemData.plan.price_monthly,
      priceYearly: itemData.plan.price_yearly,
      currency: itemData.plan.currency,
      maxProducts: itemData.plan.max_products,
      maxEmployees: itemData.plan.max_employees,
      maxBranches: itemData.plan.max_branches,
      features: itemData.plan.features,
    } : null,
  }, jsonBody);
}
