import { TravelBannersListPage } from "@/features/admin/travel-banners/views/travel-banners-list-page";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  return <TravelBannersListPage lang={resolvedParams.lang} />;
}
