import { AdminStatusBadge } from "@/features/admin/shared";

export function ProductRevisionStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
