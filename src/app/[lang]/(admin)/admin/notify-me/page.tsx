import { NotifyMeRequestsListPage } from "@/features/admin/notify-me";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <NotifyMeRequestsListPage lang={lang} />;
}
