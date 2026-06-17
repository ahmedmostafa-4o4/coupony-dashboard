import { NotificationBroadcastDetailsPage } from "@/features/admin/notifications/views/notification-broadcast-details-page";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const dict = await getGlobalDictionary(lang);
  return <NotificationBroadcastDetailsPage lang={lang} id={id} dict={dict.adminNotifications} />;
}
