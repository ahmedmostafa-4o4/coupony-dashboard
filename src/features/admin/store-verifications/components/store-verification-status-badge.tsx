import { AdminStatusBadge } from "@/features/admin/shared";

export function StoreVerificationStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
