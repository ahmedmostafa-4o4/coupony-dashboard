"use client";
import { PageLoading } from "@/components/shared/page-loading";
import { AdminPageHeader, getAdminEntityTitle, AdminRecordGrid, AdminSection } from "@/features/admin/shared";
import { ChatbotSessionStatusBadge } from "../components/chatbot-session-status-badge";
import { useChatbotSessionDetails } from "../hooks/use-chatbot-session-details";

export function ChatbotSessionDetailsPage({
  sessionId,
  lang,
}: {
  sessionId: string;
  lang: string;
}) {
  const detailState = useChatbotSessionDetails(sessionId);
  void lang;
  

  if (detailState.isLoading) {
    return <PageLoading label="Loading chatbot session details..." />;
  }

  if (!detailState.item) {
    return (
      <AdminSection title="Chatbot Session not found">
        <p className="text-sm text-slate-500">
          The backend did not return a chatbot session for this route.
        </p>
      </AdminSection>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <ChatbotSessionStatusBadge value={detailState.item.status} />
            
            
          </div>
        }
        description="Read the raw session payload returned by the admin API."
        eyebrow="Admin details"
        title={getAdminEntityTitle(detailState.item, sessionId)}
      />
      {detailState.error ? (
        <AdminSection title="Request error">
          <p className="text-sm text-rose-600">{detailState.error}</p>
        </AdminSection>
      ) : null}
      
      <AdminSection description="Structured fields returned for this record." title="Chatbot Session details">
        <AdminRecordGrid value={detailState.item} />
      </AdminSection>
      <AdminSection description="Raw backend payload for inspection while contracts are still being finalized." title="Raw API payload">
        <AdminRecordGrid value={detailState.raw} />
      </AdminSection>
    </div>
  );
}
