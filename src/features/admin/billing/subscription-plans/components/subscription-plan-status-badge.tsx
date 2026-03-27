import { AdminStatusBadge } from "@/features/admin/shared";

export function SubscriptionPlanStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
