import { ChatbotSessionDetailsPage } from "@/features/admin/chatbot";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; sessionId: string }>;
}) {
  const { lang, sessionId } = await params;

  return <ChatbotSessionDetailsPage sessionId={sessionId} lang={lang} />;
}
