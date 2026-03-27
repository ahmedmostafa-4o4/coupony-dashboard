import { NotificationBroadcastPage } from "@/features/admin/notifications";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <NotificationBroadcastPage lang={lang} />;
}
