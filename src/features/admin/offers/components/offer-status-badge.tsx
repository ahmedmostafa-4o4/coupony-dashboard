import { AdminStatusBadge } from "@/features/admin/shared";

export function OfferStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
