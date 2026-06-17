import { NotificationBroadcastPage } from "@/features/admin/notifications";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getGlobalDictionary(lang);

  return <NotificationBroadcastPage lang={lang} dict={dict.adminNotifications} />;
}
