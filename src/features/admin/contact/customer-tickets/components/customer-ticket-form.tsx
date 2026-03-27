"use client";

import { AdminSchemaForm } from "@/features/admin/shared";
import type { AdminFormField } from "@/features/admin/shared";

import {
  customerTicketFormSchema,
  toCustomerTicketFormValues,
  type CustomerTicketFormValues,
} from "../schemas/customer-ticket-form.schema";
import type {
  CustomerTicket,
  UpdateCustomerTicketRequest,
} from "../types/customer-ticket.types";

const fields: AdminFormField<CustomerTicketFormValues>[] = [
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Pending", value: "pending" },
      { label: "In progress", value: "in_progress" },
      { label: "Resolved", value: "resolved" },
    ],
    type: "select",
  },
];

export function CustomerTicketForm({
  description,
  initialValues,
  isSubmitting,
  onSubmit,
  submitLabel,
  title,
}: {
  description: string;
  initialValues?: CustomerTicket | null;
  isSubmitting?: boolean;
  onSubmit: (payload: UpdateCustomerTicketRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
}) {
  return (
    <AdminSchemaForm
      description={description}
      fields={fields}
      initialValues={toCustomerTicketFormValues(initialValues)}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      schema={customerTicketFormSchema}
      submitLabel={submitLabel}
      title={title}
    />
  );
}
