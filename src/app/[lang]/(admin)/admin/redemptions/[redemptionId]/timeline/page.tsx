import { RedemptionTimelinePage } from "@/features/admin/redemptions";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; redemptionId: string }>;
}) {
  const { lang, redemptionId } = await params;

  return <RedemptionTimelinePage lang={lang} redemptionId={redemptionId} />;
}
