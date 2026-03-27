import { StoresListPage } from "@/features/admin/stores";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <StoresListPage lang={lang} />;
}
