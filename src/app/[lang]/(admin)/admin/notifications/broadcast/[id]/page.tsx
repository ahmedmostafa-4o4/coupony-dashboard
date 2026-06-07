import { NotificationBroadcastDetailsPage } from "@/features/admin/notifications/views/notification-broadcast-details-page";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  return <NotificationBroadcastDetailsPage lang={lang} id={id} />;
}
