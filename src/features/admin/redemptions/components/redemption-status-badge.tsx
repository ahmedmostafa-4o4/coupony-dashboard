import { AdminStatusBadge } from "@/features/admin/shared";

export function RedemptionStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
