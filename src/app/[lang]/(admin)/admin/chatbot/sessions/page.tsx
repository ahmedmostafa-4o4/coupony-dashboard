import { ChatbotSessionsListPage } from "@/features/admin/chatbot";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <ChatbotSessionsListPage lang={lang} />;
}
