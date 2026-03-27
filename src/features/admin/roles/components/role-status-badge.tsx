import { AdminStatusBadge } from "@/features/admin/shared";

export function RoleStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
