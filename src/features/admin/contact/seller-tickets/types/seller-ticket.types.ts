import type { AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminSellerLeadsQueryDto,
  AdminUpdateSellerLeadDto,
  SellerLeadDto,
} from "./seller-tickets.dto";

export type SellerTicket = Camelized<SellerLeadDto>;
export type SellerTicketsListFilters = Camelized<AdminSellerLeadsQueryDto> & {
  search?: string;
  status?: string;
};
export type SellerTicketsListResult = AdminListResult<SellerTicket>;
export type UpdateSellerTicketRequest = AdminUpdateSellerLeadDto;
