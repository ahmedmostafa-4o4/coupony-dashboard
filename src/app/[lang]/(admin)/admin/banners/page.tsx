import { BannersListPage } from "@/features/admin/banners/views/banners-list-page";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  return <BannersListPage lang={resolvedParams.lang} />;
}
