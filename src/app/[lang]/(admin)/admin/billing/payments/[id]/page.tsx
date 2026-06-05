import { PaymentDetailsPage } from "@/features/admin/billing/payments";

export default async function Page(props: { params: Promise<{ id: string; lang: string }> }) {
  const params = await props.params;

  return <PaymentDetailsPage paymentId={params.id} lang={params.lang} />;
}
