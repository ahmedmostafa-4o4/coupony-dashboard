import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";

import type {
  SellerTicket,
  UpdateSellerTicketRequest,
} from "../types/seller-ticket.types";

export interface SellerTicketFormValues {
  status: string;
}

export const sellerTicketFormSchema: AdminFormSchema<
  SellerTicketFormValues,
  UpdateSellerTicketRequest
> = {
  defaultValues: {
    status: "pending",
  },
  transform(values) {
    return {
      status: values.status as UpdateSellerTicketRequest["status"],
    };
  },
  validate(values) {
    return {
      status: values.status.trim() ? undefined : "Status is required.",
    };
  },
};

export function toSellerTicketFormValues(
  ticket?: SellerTicket | null
): SellerTicketFormValues {
  return {
    status: String(ticket?.status ?? "pending"),
  };
}
