import { NotificationBroadcastCreatePage } from "@/features/admin/notifications/views/notification-broadcast-create-page";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getGlobalDictionary(lang);
  return <NotificationBroadcastCreatePage lang={lang} dict={dict.adminNotifications} />;
}
