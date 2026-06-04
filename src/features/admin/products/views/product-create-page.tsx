"use client";

import { useRouter } from "next/navigation";

import {
  AdminPageHeader,
  AdminSection,
  createAdminHref,
} from "@/features/admin/shared";

import { ProductForm } from "../components/product-form";
import { useProductActions } from "../hooks/use-product-actions";

import { getProductsDictionary } from "../utils/get-dictionary";

export function ProductCreatePage({ lang }: { lang: string }) {
  const router = useRouter();
  const actions = useProductActions();
  const dict = getProductsDictionary(lang);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description={dict.form.createDesc}
        eyebrow={dict.details.eyebrow}
        title={dict.form.createTitle}
      />
      {actions.createAction.error ? (
        <AdminSection title={dict.list.errors.createErr}>
          <p className="text-sm text-rose-600">{actions.createAction.error}</p>
        </AdminSection>
      ) : null}
      <ProductForm
        description={dict.form.createDesc}
        isSubmitting={actions.createAction.isSubmitting}
        mode="create"
        onSubmit={async (payload) => {
          const result = await actions.createAction.submit(payload);

          if (result) {
            router.replace(createAdminHref(lang, "products"));
          }
        }}
        submitLabel={dict.form.createTitle}
        title={dict.form.createTitle}
        dict={dict.form}
      />
    </div>
  );
}

