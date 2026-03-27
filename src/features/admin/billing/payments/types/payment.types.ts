import type { AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type { AdminPaymentsQueryDto, PaymentDto } from "./payments.dto";

export type Payment = Camelized<PaymentDto>;
export type PaymentsListFilters = Camelized<AdminPaymentsQueryDto> & {
  search?: string;
  status?: string;
};
export type PaymentsListResult = AdminListResult<Payment>;
