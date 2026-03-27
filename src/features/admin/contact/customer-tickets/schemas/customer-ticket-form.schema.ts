import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";

import type {
  CustomerTicket,
  UpdateCustomerTicketRequest,
} from "../types/customer-ticket.types";

export interface CustomerTicketFormValues {
  status: string;
}

export const customerTicketFormSchema: AdminFormSchema<
  CustomerTicketFormValues,
  UpdateCustomerTicketRequest
> = {
  defaultValues: {
    status: "pending",
  },
  transform(values) {
    return {
      status: values.status as UpdateCustomerTicketRequest["status"],
    };
  },
  validate(values) {
    return {
      status: values.status.trim() ? undefined : "Status is required.",
    };
  },
};

export function toCustomerTicketFormValues(
  ticket?: CustomerTicket | null
): CustomerTicketFormValues {
  return {
    status: String(ticket?.status ?? "pending"),
  };
}
