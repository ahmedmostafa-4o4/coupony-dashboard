import type { ReactNode } from "react";

import { AdminDataTable, type AdminColumn, formatAdminDate } from "@/features/admin/shared";
import { ChatbotSessionStatusBadge } from "./chatbot-session-status-badge";

import type { ChatbotSession } from "../types/chatbot-session.types";

const columns: AdminColumn<ChatbotSession>[] = [
  {
    id: "id",
    header: "ID",
    accessorKey: "id",
  },
  {
    id: "userId",
    header: "User ID",
    accessorKey: "userId",
  },
  {
    id: "status",
    header: "Status",
    cell: (item) => <ChatbotSessionStatusBadge value={item.status} />,
  },
  {
    id: "startedAt",
    header: "Started",
    cell: (item) => formatAdminDate(item.startedAt),
  },
  {
    id: "updatedAt",
    header: "Updated",
    cell: (item) => formatAdminDate(item.updatedAt),
  },
];

export function ChatbotSessionsTable({
  items,
  renderActions,
}: {
  items: ChatbotSession[];
  renderActions?: (item: ChatbotSession) => ReactNode;
}) {
  return (
    <AdminDataTable
      columns={columns}
      data={items}
      rowKey={(item) => String(item.id ?? JSON.stringify(item))}
      renderRowActions={renderActions}
      emptyDescription="The backend has not returned any chatbot sessions yet."
      emptyTitle="No chatbot sessions found"
    />
  );
}
