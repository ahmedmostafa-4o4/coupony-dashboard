import { Coins } from "lucide-react";

import { AdminSection } from "@/features/admin/shared";

import type { DashboardOverview } from "../types/dashboard.types";
import type { DashboardDictionary } from "../utils/get-dictionary";

export function LoyaltyPointsWidget({
  pointsEconomy,
  dict,
}: {
  pointsEconomy?: DashboardOverview["pointsEconomy"];
  dict: DashboardDictionary["dashboard"]["loyalty"];
}) {
  if (!pointsEconomy) {
    return null;
  }

  const {
    totalPointsInCirculation = 0,
    lifetimePointsEarned = 0,
    lifetimePointsSpent = 0,
    pointsRedemptionRate = 0,
  } = pointsEconomy;

  return (
    <AdminSection
      description={dict.description}
      title={dict.title}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              {dict.redemptionRate}
            </h3>
            <Coins className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="mt-2">
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">{pointsRedemptionRate}%</div>
              <p className="text-muted-foreground text-xs">
                {dict.pointsSpent.replace("{{spent}}", lifetimePointsSpent.toLocaleString()).replace("{{earned}}", lifetimePointsEarned.toLocaleString())}
              </p>
            </div>
            <div className="bg-secondary mt-3 h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full transition-all duration-500 ease-in-out"
                style={{ width: `${Math.min(100, pointsRedemptionRate)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              {dict.outstandingLiability}
            </h3>
            <Coins className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">
              {totalPointsInCirculation.toLocaleString()}
            </div>
            <p className="text-muted-foreground text-xs">
              {dict.pointsInCirculation}
            </p>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}
