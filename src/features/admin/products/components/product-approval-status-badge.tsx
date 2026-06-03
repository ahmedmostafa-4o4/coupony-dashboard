import { AdminStatusBadge } from "@/features/admin/shared";

export function ProductApprovalStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
