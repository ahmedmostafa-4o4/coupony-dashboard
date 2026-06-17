import { NotificationsListPage } from "@/features/admin/notifications/views/notifications-list-page";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getGlobalDictionary(lang);

  return <NotificationsListPage lang={lang} dict={dict.adminNotifications} />;
}
