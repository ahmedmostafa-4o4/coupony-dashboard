import { UsersListPage } from "@/features/admin/users";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <UsersListPage lang={lang} />;
}
