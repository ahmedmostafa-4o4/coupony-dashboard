import { RecommendationsListPage } from "@/features/admin/recommendations";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <RecommendationsListPage lang={lang} />;
}
