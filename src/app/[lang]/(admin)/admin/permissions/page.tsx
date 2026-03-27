import { PermissionsListPage } from "@/features/admin/permissions";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <PermissionsListPage lang={lang} />;
}
