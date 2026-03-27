import { SellerTicketsListPage } from "@/features/admin/contact/seller-tickets";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <SellerTicketsListPage lang={lang} />;
}
