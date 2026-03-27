import { AdminStatusBadge } from "@/features/admin/shared";

export function BillingProfileStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
