import { AdminStatusBadge } from "@/features/admin/shared";

export function CommissionStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
