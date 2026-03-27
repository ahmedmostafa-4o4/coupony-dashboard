import { RoleDetailsPage } from "@/features/admin/roles";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; roleId: string }>;
}) {
  const { lang, roleId } = await params;

  return <RoleDetailsPage roleId={roleId} lang={lang} />;
}
