import { ProductRevisionsListPage } from "@/features/admin/products";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <ProductRevisionsListPage lang={lang} />;
}
