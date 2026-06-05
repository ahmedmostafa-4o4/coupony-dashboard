import { AdminStatCard } from "@/features/admin/shared";
import { useSubscriptionAnalytics } from "../hooks/use-subscription-analytics";

export function SubscriptionAnalyticsWidget() {
  const { data, isLoading } = useSubscriptionAnalytics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <AdminStatCard
        label="Active Subscribers"
        value={isLoading ? "..." : data?.activeSubscribers ?? 0}
        hint="Subscriptions currently active"
      />
      <AdminStatCard
        label="Total Revenue"
        value={isLoading ? "..." : `£${data?.totalRevenue?.toLocaleString() ?? "0"}`}
        hint="From paid payment sessions"
      />
      <AdminStatCard
        label="MRR"
        value={isLoading ? "..." : `£${data?.mrr?.toLocaleString() ?? "0"}`}
        hint="Monthly Recurring Revenue"
      />
      <AdminStatCard
        label="Churn"
        value={isLoading ? "..." : data?.churnLast30Days ?? 0}
        hint="Cancelled or suspended (30d)"
      />
    </div>
  );
}
