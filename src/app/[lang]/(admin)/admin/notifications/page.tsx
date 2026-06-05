import { NotificationsListPage } from "@/features/admin/notifications/views/notifications-list-page";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <NotificationsListPage lang={lang} />;
}
