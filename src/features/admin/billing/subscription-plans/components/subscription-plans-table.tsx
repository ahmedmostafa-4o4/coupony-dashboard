import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate, formatAdminCurrency } from "@/features/admin/shared";
import { SubscriptionPlanStatusBadge } from "./subscription-plan-status-badge";

import type { SubscriptionPlan } from "../types/subscription-plan.types";

import type { GlobalDictionary } from "@/messages/get-dictionary";

export function SubscriptionPlansTable({
  items,
  renderActions,
  dict,
}: {
  items: SubscriptionPlan[];
  renderActions?: (item: SubscriptionPlan) => ReactNode;
  dict: GlobalDictionary;
}) {
  const columns: AdminColumn<SubscriptionPlan>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
    },
    {
      id: "name",
      header: dict.adminSubscriptionPlans.details.name,
      accessorKey: "name",
    },
    {
      id: "status",
      header: dict.adminSubscriptionPlans.details.status,
      cell: (item) => (
        <SubscriptionPlanStatusBadge
          value={item.isActive ? "active" : "inactive"}
        />
      ),
    },
    {
      id: "priceMonthly",
      header: "Monthly Price",
      cell: (item) => formatAdminCurrency(
        typeof item.prices?.monthly === "number" ? item.prices.monthly : Number(item.prices?.monthly),
      ),
    },
    {
      id: "priceYearly",
      header: "Yearly Price",
      cell: (item) => formatAdminCurrency(
        typeof item.prices?.yearly === "number" ? item.prices.yearly : Number(item.prices?.yearly),
      ),
    },
    {
      id: "maxProducts",
      header: dict.adminSubscriptionPlans.details.maxProducts,
      cell: (item) => item.entitlements?.maxProducts ?? "Unlimited",
    },
    {
      id: "maxBranches",
      header: dict.adminSubscriptionPlans.details.maxBranches,
      cell: (item) => item.entitlements?.maxBranches ?? "Unlimited",
    },
    {
      id: "maxEmployees",
      header: dict.adminSubscriptionPlans.details.maxEmployees,
      cell: (item) => item.entitlements?.maxEmployees ?? "Unlimited",
    },
    {
      id: "updatedAt",
      header: dict.adminSubscriptionPlans.details.updatedAt,
      cell: (item) => formatAdminDate(item.updatedAt),
    },
  ];

  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription={dict.adminSubscriptionPlans.list.emptyDesc}
      emptyTitle={dict.adminSubscriptionPlans.list.noPlans}
    />
  );
}
