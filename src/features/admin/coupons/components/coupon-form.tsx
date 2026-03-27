"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  couponFormSchema,
  toCouponFormValues,
  type CouponFormValues,
} from "../schemas/coupon-form.schema";
import type { Coupon, UpdateCouponRequest } from "../types/coupon.types";

const fields: AdminFormField<CouponFormValues>[] = [
  {
    key: "title",
    label: "Title",
    placeholder: "Seasonal discount",
  },
  {
    key: "status",
    label: "Status",
    placeholder: "active",
  },
  {
    key: "startAt",
    label: "Starts at",
    type: "datetime-local",
  },
  {
    key: "endAt",
    label: "Ends at",
    type: "datetime-local",
  },
  {
    key: "description",
    label: "Description",
    placeholder: "Internal notes for the coupon update.",
    type: "textarea",
  },
];

export function CouponForm({
  description,
  initialValues,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: Coupon | null;
  isSubmitting?: boolean;
  onSubmit: (payload: UpdateCouponRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      initialValues={toCouponFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={couponFormSchema}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
