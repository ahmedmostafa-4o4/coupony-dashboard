"use client";

import { useRouter } from "next/navigation";

import {
  AdminPageHeader,
  AdminSection,
  createAdminHref,
} from "@/features/admin/shared";

import { ProductForm } from "../components/product-form";
import { useProductActions } from "../hooks/use-product-actions";

export function ProductCreatePage({ lang }: { lang: string }) {
  const router = useRouter();
  const actions = useProductActions();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        description="Create a live product using the admin product CRUD endpoint."
        eyebrow="Admin create"
        title="Create Product"
      />
      {actions.createAction.error ? (
        <AdminSection title="Create error">
          <p className="text-sm text-rose-600">{actions.createAction.error}</p>
        </AdminSection>
      ) : null}
      <ProductForm
        description="Provide the product fields supported by the admin create contract."
        isSubmitting={actions.createAction.isSubmitting}
        mode="create"
        onSubmit={async (payload) => {
          const result = await actions.createAction.submit(payload);

          if (result) {
            router.replace(createAdminHref(lang, "products"));
          }
        }}
        submitLabel="Create product"
        title="Create product"
      />
    </div>
  );
}
