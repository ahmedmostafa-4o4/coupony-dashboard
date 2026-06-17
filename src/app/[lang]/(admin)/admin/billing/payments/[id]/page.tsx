import { PaymentDetailsPage } from "@/features/admin/billing/payments";
import { getGlobalDictionary } from "@/messages/get-dictionary";

export default async function Page(props: { params: Promise<{ id: string; lang: string }> }) {
  const params = await props.params;
  const dict = await getGlobalDictionary(params.lang);

  return <PaymentDetailsPage paymentId={params.id} lang={params.lang} dict={dict} />;
}
