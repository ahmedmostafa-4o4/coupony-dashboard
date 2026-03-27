import type { Camelized } from "@/types";

import type {
  AdminInvoiceDetailsResponseDto,
  InvoiceDto,
} from "../types/invoices.dto";
import type { Invoice } from "../types/invoice.types";

export function mapInvoice(item: Camelized<InvoiceDto>): Invoice {
  return {
    ...item,
    dueAt: item.dueDate,
  };
}

export function mapInvoiceDetails(
  data: Camelized<AdminInvoiceDetailsResponseDto["data"]>
): Invoice {
  return {
    ...mapInvoice(data.invoice),
    store: data.store ?? null,
    subscription: data.subscription ?? null,
  };
}
