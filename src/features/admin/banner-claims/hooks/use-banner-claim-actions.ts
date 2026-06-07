import { useAdminAction } from "@/features/admin/shared";
import { cancelBannerClaim } from "../api/cancel-banner-claim";

export function useBannerClaimActions(onSuccess?: () => void | Promise<void>) {
  const cancelAction = useAdminAction<{ id: string; reason: string }, any>({
    action: async (input) => { await cancelBannerClaim(input.id, input.reason); },
    onSuccess,
  });

  return {
    cancelAction,
  };
}
