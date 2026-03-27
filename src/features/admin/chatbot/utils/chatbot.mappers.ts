import type { Camelized } from "@/types";

import type {
  AdminChatSessionDetailsResponseDto,
  ChatSessionDto,
} from "../types/chatbot.dto";
import type { ChatbotSession } from "../types/chatbot-session.types";

export function mapChatbotSession(
  item: Camelized<ChatSessionDto>
): ChatbotSession {
  return {
    ...item,
    startedAt: item.createdAt,
    status: item.sessionStatus,
  };
}

export function mapChatbotSessionDetails(
  data: Camelized<AdminChatSessionDetailsResponseDto["data"]>
): ChatbotSession {
  return {
    ...mapChatbotSession(data.session),
    messages: data.messages ?? [],
  };
}
