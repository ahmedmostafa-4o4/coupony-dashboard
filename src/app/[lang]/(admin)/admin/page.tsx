import { DashboardPage } from "@/features/admin/dashboard";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <DashboardPage lang={lang} />;
}
