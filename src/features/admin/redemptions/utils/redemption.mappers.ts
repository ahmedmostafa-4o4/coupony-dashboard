import type { Camelized } from "@/types";

import type {
  AdminRedemptionDetailsResponseDto,
  RedemptionDto,
} from "../types/redemptions.dto";
import type {
  Redemption,
  RedemptionTimelineEntry,
} from "../types/redemption.types";

export function mapRedemption(item: Camelized<RedemptionDto>): Redemption {
  return {
    ...item,
    userId: item.customerId,
  };
}

export function mapRedemptionDetails(
  data: Camelized<AdminRedemptionDetailsResponseDto["data"]>
): Redemption {
  return {
    ...mapRedemption(data.redemption),
    cashPayment: data.cashPayment ?? null,
    qrHistory: data.qrHistory ?? [],
    timeline: data.timeline ?? [],
  };
}

export function mapRedemptionTimelineEntry(
  item: RedemptionTimelineEntry
): RedemptionTimelineEntry {
  return {
    ...item,
    message: item.note ?? item.type ?? item.status,
    timestamp: item.createdAt,
  };
}
