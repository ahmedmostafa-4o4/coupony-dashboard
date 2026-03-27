import { AdminStatusBadge } from "@/features/admin/shared";

export function SellerTicketStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
