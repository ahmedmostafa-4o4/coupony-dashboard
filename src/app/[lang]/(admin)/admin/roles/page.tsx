import { RolesListPage } from "@/features/admin/roles";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <RolesListPage lang={lang} />;
}
