"use client";

import { useAdminResource } from "@/features/admin/shared";

import { getChatbotSessionById } from "../api/get-chatbot-session-by-id";
import type { ChatbotSession } from "../types/chatbot-session.types";

export function useChatbotSessionDetails(sessionId: string) {
  return useAdminResource<ChatbotSession>({
    id: sessionId,
    getItem: getChatbotSessionById,
  });
}
