import { CustomerTicketsListPage } from "@/features/admin/contact/customer-tickets";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <CustomerTicketsListPage lang={lang} />;
}
