import { UserDetailsPage } from "@/features/admin/users";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; userId: string }>;
}) {
  const { lang, userId } = await params;

  return <UserDetailsPage userId={userId} lang={lang} />;
}
