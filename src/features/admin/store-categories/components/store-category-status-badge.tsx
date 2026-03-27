import { AdminStatusBadge } from "@/features/admin/shared";

export function StoreCategoryStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
