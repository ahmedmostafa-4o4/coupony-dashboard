import { AdminStatusBadge } from "@/features/admin/shared";

export function NotifyMeRequestStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
