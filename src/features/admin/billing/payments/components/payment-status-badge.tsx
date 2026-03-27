import { AdminStatusBadge } from "@/features/admin/shared";

export function PaymentStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
