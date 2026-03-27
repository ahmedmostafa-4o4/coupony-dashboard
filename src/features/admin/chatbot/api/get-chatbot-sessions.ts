import { mapPaginatedResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { buildAdminQuery } from "@/features/admin/shared";

import { mapChatbotSession } from "../utils/chatbot.mappers";
import type { AdminChatSessionsListResponseDto } from "../types/chatbot.dto";
import type { ChatbotSessionsListFilters } from "../types/chatbot-session.types";

export async function getChatbotSessions(filters: ChatbotSessionsListFilters = {}) {
  const response = await apiClient.get<AdminChatSessionsListResponseDto>(
    apiEndpoints.admin.chatbot.sessions.list,
    {
      query: buildAdminQuery(filters),
    }
  );

  return mapPaginatedResponse(response, mapChatbotSession);
}
