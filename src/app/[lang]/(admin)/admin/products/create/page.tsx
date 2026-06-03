import { ProductCreatePage } from "@/features/admin/products";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <ProductCreatePage lang={lang} />;
}
