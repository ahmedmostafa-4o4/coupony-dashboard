import { AdminStatusBadge } from "@/features/admin/shared";

export function CouponStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
