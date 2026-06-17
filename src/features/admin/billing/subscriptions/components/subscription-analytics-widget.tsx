import { AdminStatCard } from "@/features/admin/shared";
import type { GlobalDictionary } from "@/messages/get-dictionary";
import { useSubscriptionAnalytics } from "../hooks/use-subscription-analytics";

export function SubscriptionAnalyticsWidget({ dict }: { dict: GlobalDictionary }) {
  const { data, isLoading } = useSubscriptionAnalytics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <AdminStatCard
        label={dict.adminSubscriptions.analytics.activeSubscriptions || "Active Subscribers"}
        value={isLoading ? "..." : data?.activeSubscribers ?? 0}
        hint={dict.adminSubscriptions.analytics.hints?.active || "Subscriptions currently active"}
      />
      <AdminStatCard
        label={dict.adminSubscriptions.analytics.revenue || "Total Revenue"}
        value={isLoading ? "..." : `£${data?.totalRevenue?.toLocaleString() ?? "0"}`}
        hint={dict.adminSubscriptions.analytics.hints?.revenue || "From paid payment sessions"}
      />
      <AdminStatCard
        label={dict.adminSubscriptions.analytics.mrr || "MRR"}
        value={isLoading ? "..." : `£${data?.mrr?.toLocaleString() ?? "0"}`}
        hint={dict.adminSubscriptions.analytics.hints?.mrr || "Monthly Recurring Revenue"}
      />
      <AdminStatCard
        label={dict.adminSubscriptions.analytics.churnRate || "Churn"}
        value={isLoading ? "..." : data?.churnLast30Days ?? 0}
        hint={dict.adminSubscriptions.analytics.hints?.churn || "Cancelled or suspended (30d)"}
      />
    </div>
  );
}
