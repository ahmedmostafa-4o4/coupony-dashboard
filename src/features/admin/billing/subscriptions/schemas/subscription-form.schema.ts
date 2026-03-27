import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import { trimOptional } from "@/features/admin/shared/utils/admin-form-schema";

import type {
  Subscription,
  UpdateSubscriptionRequest,
} from "../types/subscription.types";

export interface SubscriptionFormValues {
  billingCycle: string;
  cancelAtPeriodEnd: boolean;
  cancelledAt: string;
  collectionMethod: string;
  currentPeriodEnd: string;
  currentPeriodStart: string;
  status: string;
  trialEnd: string;
  trialStart: string;
}

export const subscriptionFormSchema: AdminFormSchema<
  SubscriptionFormValues,
  UpdateSubscriptionRequest
> = {
  defaultValues: {
    billingCycle: "",
    cancelAtPeriodEnd: false,
    cancelledAt: "",
    collectionMethod: "",
    currentPeriodEnd: "",
    currentPeriodStart: "",
    status: "",
    trialEnd: "",
    trialStart: "",
  },
  transform(values) {
    return {
      billing_cycle: trimOptional(values.billingCycle),
      cancel_at_period_end: values.cancelAtPeriodEnd,
      cancelled_at: trimOptional(values.cancelledAt),
      collection_method: trimOptional(values.collectionMethod),
      current_period_end: trimOptional(values.currentPeriodEnd),
      current_period_start: trimOptional(values.currentPeriodStart),
      status: trimOptional(values.status),
      trial_end: trimOptional(values.trialEnd),
      trial_start: trimOptional(values.trialStart),
    };
  },
  validate() {
    return {};
  },
};

export function toSubscriptionFormValues(
  subscription?: Subscription | null
): SubscriptionFormValues {
  return {
    billingCycle: String(subscription?.billingCycle ?? ""),
    cancelAtPeriodEnd: Boolean(subscription?.cancelAtPeriodEnd ?? false),
    cancelledAt: String(subscription?.cancelledAt ?? ""),
    collectionMethod: String(subscription?.collectionMethod ?? ""),
    currentPeriodEnd: String(subscription?.currentPeriodEnd ?? ""),
    currentPeriodStart: String(subscription?.currentPeriodStart ?? ""),
    status: String(subscription?.status ?? ""),
    trialEnd: String(subscription?.trialEnd ?? ""),
    trialStart: String(subscription?.trialStart ?? ""),
  };
}
