import type { AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminInventoryTransactionsQueryDto,
  InventoryTransactionDto,
} from "./inventory.dto";

export type InventoryTransaction = Camelized<InventoryTransactionDto>;
export type InventoryTransactionsListFilters = Camelized<AdminInventoryTransactionsQueryDto> & {
  search?: string;
};
export type InventoryTransactionsListResult = AdminListResult<InventoryTransaction>;
