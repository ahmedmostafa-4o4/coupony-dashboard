"use client";

import { RefreshCw } from "lucide-react";

import { PageLoading } from "@/components/shared/page-loading";
import {
  AdminPageHeader,
  AdminSection,
} from "@/features/admin/shared";

import { ActionRequiredBanner } from "../components/action-required-banner";
import { DashboardOverviewGrid } from "../components/dashboard-overview-grid";
import { LoyaltyPointsWidget } from "../components/loyalty-points-widget";
import { DashboardChartsGrid } from "../components/dashboard-charts-grid";
import { useDashboardOverview } from "../hooks/use-dashboard-overview";
import { getDashboardDictionary } from "../utils/get-dictionary";
import { SubscriptionAnalyticsWidget } from "@/features/admin/billing/subscriptions/components/subscription-analytics-widget";

export function DashboardPage({ lang }: { lang: string }) {
  const dashboardState = useDashboardOverview();
  const dict = getDashboardDictionary(lang);

  void lang;

  if (dashboardState.isLoading) {
    return <PageLoading label={dict.dashboard.loading} />;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description={dict.dashboard.description}
        eyebrow={dict.dashboard.eyebrow}
        title={dict.dashboard.title}
        actions={
          <button
            onClick={() => void dashboardState.reload()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-slate-100 hover:text-accent-foreground h-10 py-2 px-4"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {dict.dashboard.refresh}
          </button>
        }
      />
      {dashboardState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{dashboardState.error}</p>
        </AdminSection>
      ) : null}
      
      <SubscriptionAnalyticsWidget />

      <ActionRequiredBanner operational={dashboardState.item?.operational} dict={dict.dashboard.actionRequired} />
      <DashboardOverviewGrid overview={dashboardState.item} dict={dict.dashboard.overview} />
      <LoyaltyPointsWidget pointsEconomy={dashboardState.item?.pointsEconomy} dict={dict.dashboard.loyalty} />
      <DashboardChartsGrid charts={dashboardState.item?.charts} dict={dict.dashboard.charts} />

    </div>
  );
}
