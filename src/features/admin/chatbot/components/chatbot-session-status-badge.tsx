import { AdminStatusBadge } from "@/features/admin/shared";

export function ChatbotSessionStatusBadge({ value }: { value: unknown }) {
  return <AdminStatusBadge value={value} />;
}
