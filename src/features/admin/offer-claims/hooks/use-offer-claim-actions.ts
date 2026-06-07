import { useAdminAction } from "@/features/admin/shared";
import { cancelOfferClaim } from "../api/cancel-offer-claim";

export function useOfferClaimActions(onSuccess?: () => void | Promise<void>) {
  const cancelAction = useAdminAction<{ id: string; reason: string }, any>({
    action: async (input) => { await cancelOfferClaim(input.id, input.reason); },
    onSuccess,
  });

  return {
    cancelAction,
  };
}
