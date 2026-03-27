"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  sellerTicketFormSchema,
  toSellerTicketFormValues,
  type SellerTicketFormValues,
} from "../schemas/seller-ticket-form.schema";
import type {
  SellerTicket,
  UpdateSellerTicketRequest,
} from "../types/seller-ticket.types";

const fields: AdminFormField<SellerTicketFormValues>[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Contacted", value: "contacted" },
      { label: "Converted", value: "converted" },
    ],
    type: "select",
  },
];

export function SellerTicketForm({
  description,
  initialValues,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: SellerTicket | null;
  isSubmitting?: boolean;
  onSubmit: (payload: UpdateSellerTicketRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      initialValues={toSellerTicketFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={sellerTicketFormSchema}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
