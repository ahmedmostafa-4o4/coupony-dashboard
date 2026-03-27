import { AdminStatusBadge } from "@/features/admin/shared";

export function InvoiceStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
