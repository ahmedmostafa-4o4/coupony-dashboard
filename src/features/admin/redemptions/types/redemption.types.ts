import type { AdminItemResult, AdminListResult } from "@/lib/api/admin-contract";
import type { Camelized } from "@/types";

import type {
  AdminFraudBlockRedemptionDto,
  AdminRedemptionsQueryDto,
  PaymentDto,
  QrHistoryEventDto,
  RedemptionDto,
  RedemptionEventDto,
} from "./redemptions.dto";

export type RedemptionTimelineEntry = Camelized<RedemptionEventDto> & {
  message?: string;
  timestamp?: string;
};
export type RedemptionQrEvent = Camelized<QrHistoryEventDto>;
export type RedemptionPayment = Camelized<PaymentDto>;
export type Redemption = Camelized<RedemptionDto> & {
  qrHistory?: RedemptionQrEvent[];
  cashPayment?: RedemptionPayment | null;
  timeline?: RedemptionTimelineEntry[];
  userId?: Camelized<RedemptionDto>["customerId"];
};

export type RedemptionsListFilters = Camelized<AdminRedemptionsQueryDto> & {
  search?: string;
};
export type RedemptionsListResult = AdminListResult<Redemption>;
export type RedemptionDetailsResult = AdminItemResult<Redemption>;
export type RedemptionTimelineResult = AdminListResult<RedemptionTimelineEntry>;
export type FraudBlockRedemptionRequest = AdminFraudBlockRedemptionDto;
