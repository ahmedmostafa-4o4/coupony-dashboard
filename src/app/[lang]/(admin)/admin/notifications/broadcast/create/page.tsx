import { NotificationBroadcastCreatePage } from "@/features/admin/notifications/views/notification-broadcast-create-page";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <NotificationBroadcastCreatePage lang={lang} />;
}
