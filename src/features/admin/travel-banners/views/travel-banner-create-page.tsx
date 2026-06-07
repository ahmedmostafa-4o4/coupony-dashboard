"use client";

import { useRouter } from "next/navigation";
import { AdminPageHeader, createAdminHref } from "@/features/admin/shared";
import { getTravelBannersDictionary } from "../utils/get-dictionary";
import { TravelBannerForm } from "../components/travel-banner-form";
import { useTravelBannerActions } from "../hooks/use-travel-banner-actions";
import { travelBannerCreateAdminSchema } from "../schemas/travel-banner.schema";

export function TravelBannerCreatePage({ lang }: { lang: string }) {
  const dict = getTravelBannersDictionary(lang);
  const router = useRouter();

  const actions = useTravelBannerActions(() => {
    router.push(createAdminHref(lang, "travelBanners" as any));
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={dict.form.submit}
        description={dict.details.description}
      />

      <TravelBannerForm
        defaultValues={travelBannerCreateAdminSchema.defaultValues}
        schema={travelBannerCreateAdminSchema}
        onSubmit={async (values) => {
          await actions.createAction.submit(values);
        }}
        isPending={actions.createAction.isSubmitting}
        dict={dict as any}
      />
    </div>
  );
}
