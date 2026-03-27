import type { AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type { AdminNotifyMeQueryDto, NotifyMeDto } from "./notify-me.dto";

export type NotifyMeRequest = Camelized<NotifyMeDto>;
export type NotifyMeRequestsListFilters = Camelized<AdminNotifyMeQueryDto> & {
  search?: string;
  status?: string;
};
export type NotifyMeRequestsListResult = AdminListResult<NotifyMeRequest>;
