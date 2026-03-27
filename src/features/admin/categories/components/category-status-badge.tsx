import { AdminStatusBadge } from "@/features/admin/shared";

export function CategoryStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
