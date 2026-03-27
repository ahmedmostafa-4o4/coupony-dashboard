import { AuditLogsListPage } from "@/features/admin/audit-logs";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <AuditLogsListPage lang={lang} />;
}
