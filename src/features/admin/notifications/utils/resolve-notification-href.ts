import { createAdminDetailHref } from "@/features/admin/shared";
import type { AdminNotification } from "../types/admin-notification.types";

/**
 * Resolves a notification to the admin page it should deep-link to.
 * Returns `null` if the notification type is unknown or lacks the required data.
 */
export function resolveNotificationHref(
  lang: string,
  notification: AdminNotification,
): string | null {
  const d = notification.data as Record<string, string | undefined>;

  switch (notification.type) {
    case "NewStoreRegistrationNotification": {
      const storeId = d.store_id;
      return storeId ? createAdminDetailHref(lang, "stores", storeId) : null;
    }
    case "NewProductRevisionNotification": {
      const revisionId = d.revision_id;
      return revisionId
        ? createAdminDetailHref(lang, "productRevisions", revisionId)
        : null;
    }
    case "PendingManualPaymentNotification": {
      const sessionId = d.session_id;
      return sessionId
        ? createAdminDetailHref(lang, "payments", sessionId)
        : null;
    }
    case "SubscriptionCancelledNotification": {
      const subscriptionId = d.subscription_id;
      return subscriptionId
        ? createAdminDetailHref(lang, "subscriptions", subscriptionId)
        : null;
    }
    case "StoreLimitReachedNotification": {
      const storeId = d.store_id;
      return storeId ? createAdminDetailHref(lang, "stores", storeId) : null;
    }
    default:
      return null;
  }
}
