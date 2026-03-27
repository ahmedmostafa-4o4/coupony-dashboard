import { AdminStatusBadge } from "@/features/admin/shared";

export function SubscriptionStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
