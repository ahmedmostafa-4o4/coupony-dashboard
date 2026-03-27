import { AdminStatusBadge } from "@/features/admin/shared";

export function StoreStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
