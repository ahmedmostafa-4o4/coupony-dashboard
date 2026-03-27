import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminChatSessionsQueryDto,
  ChatMessageDto,
  ChatSessionDto,
} from "./chatbot.dto";

export type ChatMessage = Camelized<ChatMessageDto>;
export type ChatbotSession = Camelized<ChatSessionDto> & {
  messages?: ChatMessage[];
  startedAt?: Camelized<ChatSessionDto>["createdAt"];
  status?: Camelized<ChatSessionDto>["sessionStatus"];
};
export type ChatbotSessionsListFilters = Camelized<AdminChatSessionsQueryDto> & {
  search?: string;
  status?: string;
};
export type ChatbotSessionsListResult = AdminListResult<ChatbotSession>;
export type ChatbotSessionDetailsResult = AdminItemResult<ChatbotSession>;
