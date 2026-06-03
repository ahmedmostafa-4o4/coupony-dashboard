import { ProductDetailsPage } from "@/features/admin/products";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; productId: string }>;
}) {
  const { lang, productId } = await params;

  return <ProductDetailsPage productId={productId} lang={lang} />;
}
