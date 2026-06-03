import { AdminStatusBadge } from "@/features/admin/shared";

export function ProductStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
