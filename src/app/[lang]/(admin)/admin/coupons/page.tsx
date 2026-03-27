import { CouponsListPage } from "@/features/admin/coupons";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <CouponsListPage lang={lang} />;
}
