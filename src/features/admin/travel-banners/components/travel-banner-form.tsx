"use client";

import { useEffect, useState } from "react";
import { AdminSchemaForm, type AdminFormField } from "@/features/admin/shared";
import type { TravelBannerCreateValues } from "../schemas/travel-banner.schema";
import type { TravelBannersDictionary } from "../utils/get-dictionary";
import type { SelectableProduct } from "../types/travel-banner.types";
import { SelectableProductsModal } from "./selectable-products-modal";
import { Button } from "@/components/ui/button";

export function TravelBannerForm({
  defaultValues,
  schema,
  onSubmit,
  isPending,
  dict,
  initialProduct,
}: {
  defaultValues: Partial<TravelBannerCreateValues>;
  schema: any;
  onSubmit: (values: any) => Promise<void>;
  isPending: boolean;
  dict: TravelBannersDictionary;
  initialProduct?: SelectableProduct | null;
}) {
  const [product, setProduct] = useState<SelectableProduct | null>(initialProduct || null);
  const [isModalOpen, setIsModalOpen] = useState(!initialProduct);

  const fields: AdminFormField<TravelBannerCreateValues>[] = [
    {
      key: "product_id",
      label: "",
      type: "text", // We hide this and control it via state
    },
    {
      key: "image",
      label: dict.form.image,
      type: "file",
      accept: "image/*",
      description: "Recommended dimensions: 600x400 pixels. Max size 5MB.",
    },
    {
      key: "cta_text",
      label: dict.form.ctaText,
      type: "text",
      placeholder: dict.form.ctaTextPlaceholder,
    },
    {
      key: "save_percent",
      label: dict.form.savePercent,
      type: "text",
      placeholder: dict.form.savePercentPlaceholder,
    },
    {
      key: "priority",
      label: dict.form.priority,
      type: "number",
      placeholder: dict.form.priorityPlaceholder,
    },
    {
      key: "start_date",
      label: dict.form.startDate,
      type: "datetime-local",
    },
    {
      key: "end_date",
      label: dict.form.endDate,
      type: "datetime-local",
    },
    {
      key: "is_active",
      label: dict.form.isActive,
      type: "checkbox",
    },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-900">{dict.form.product}</h3>
          <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
            {product ? dict.form.changeProduct : dict.form.selectProduct}
          </Button>
        </div>
        {product ? (
          <div className="flex items-center gap-4">
            {product.image ? (
               <img src={product.image.startsWith('http') ? product.image : `https://api.coupony.shop/storage/${product.image}`} alt={product.title} className="h-16 w-16 object-cover rounded-lg border" />
            ) : (
              <div className="h-16 w-16 bg-slate-100 rounded-lg border" />
            )}
            <div>
              <p className="font-semibold text-slate-800">{product.title}</p>
              <p className="text-sm text-slate-500">{product.basePrice} EGP</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">No product selected. You must select a product first.</p>
        )}
      </div>

      <SelectableProductsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dict={dict}
        onSelect={(p) => {
          setProduct(p);
          setIsModalOpen(false);
        }}
      />

      <div className={product ? "" : "opacity-50 pointer-events-none"}>
        <AdminSchemaForm
          fields={fields.filter(f => f.key !== "product_id") as any}
          key={product?.id || 'new'}
          initialValues={{ ...defaultValues, product_id: product?.id || "" } as any}
          schema={schema}
          onSubmit={onSubmit}
          isSubmitting={isPending}
          submitLabel={dict.form.submit}
          title=""
          description=""
        />
      </div>
    </div>
  );
}
