import { AdminStatusBadge } from "@/features/admin/shared";

export function CustomerTicketStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
