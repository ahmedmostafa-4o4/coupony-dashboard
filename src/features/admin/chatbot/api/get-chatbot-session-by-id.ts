import { mapItemResponse } from "@/lib/api/admin-contract";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";

import { mapChatbotSessionDetails } from "../utils/chatbot.mappers";
import type { AdminChatSessionDetailsResponseDto } from "../types/chatbot.dto";

export async function getChatbotSessionById(sessionId: string) {
  const response = await apiClient.get<AdminChatSessionDetailsResponseDto>(
    apiEndpoints.admin.chatbot.sessions.detail(sessionId)
  );

  return mapItemResponse(response, mapChatbotSessionDetails);
}
