"use client";

import { useAdminCollection } from "@/features/admin/shared";

import { getChatbotSessions } from "../api/get-chatbot-sessions";
import type { ChatbotSession, ChatbotSessionsListFilters } from "../types/chatbot-session.types";

export function useChatbotSessionsList(filters: ChatbotSessionsListFilters) {
  return useAdminCollection<ChatbotSession, ChatbotSessionsListFilters>({
    filters,
    getItems: getChatbotSessions,
  });
}
