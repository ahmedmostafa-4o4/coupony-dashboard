import type { AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminCustomerTicketsQueryDto,
  AdminUpdateCustomerTicketDto,
  CustomerTicketDto,
} from "./customer-tickets.dto";

export type CustomerTicket = Camelized<CustomerTicketDto>;
export type CustomerTicketsListFilters = Camelized<AdminCustomerTicketsQueryDto> & {
  search?: string;
  status?: string;
};
export type CustomerTicketsListResult = AdminListResult<CustomerTicket>;
export type UpdateCustomerTicketRequest = AdminUpdateCustomerTicketDto;
