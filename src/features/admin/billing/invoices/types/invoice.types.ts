import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminInvoicesQueryDto,
  AdminIssueInvoiceDto,
  AdminMarkInvoicePaidDto,
  AdminVoidInvoiceDto,
  InvoiceDto,
  StoreDto,
  SubscriptionDto,
} from "./invoices.dto";

export type InvoiceStore = Camelized<StoreDto>;
export type InvoiceSubscription = Camelized<SubscriptionDto>;
export type Invoice = Camelized<InvoiceDto> & {
  dueAt?: Camelized<InvoiceDto>["dueDate"];
  store?: InvoiceStore | null;
  subscription?: InvoiceSubscription | null;
};

export type InvoicesListFilters = Camelized<AdminInvoicesQueryDto> & {
  search?: string;
};
export type InvoicesListResult = AdminListResult<Invoice>;
export type InvoiceDetailsResult = AdminItemResult<Invoice>;
export type IssueInvoiceRequest = AdminIssueInvoiceDto;
export type MarkInvoicePaidRequest = AdminMarkInvoicePaidDto;
export type VoidInvoiceRequest = AdminVoidInvoiceDto;
