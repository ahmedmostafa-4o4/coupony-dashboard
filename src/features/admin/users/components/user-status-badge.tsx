import { AdminStatusBadge } from "@/features/admin/shared";

export function UserStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
