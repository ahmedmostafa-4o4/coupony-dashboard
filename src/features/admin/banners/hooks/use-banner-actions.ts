import { useAdminAction } from "@/features/admin/shared";
import {
  approveBanner,
  rejectBanner,
  updateBanner,
  deleteBanner,
} from "../api/banner-actions";
import type { RejectBannerRequest, UpdateBannerRequest } from "../types/banner.types";

export function useBannerActions(onSuccess?: () => void) {
  const approveAction = useAdminAction<string, void>({
    action: async (id: string) => {
      await approveBanner(id);
    },
    onSuccess,
  });

  const rejectAction = useAdminAction<{ id: string; payload: RejectBannerRequest }, void>({
    action: async ({ id, payload }) => {
      await rejectBanner(id, payload);
    },
    onSuccess,
  });

  const updateAction = useAdminAction<{ id: string; payload: UpdateBannerRequest }, void>({
    action: async ({ id, payload }) => {
      await updateBanner(id, payload);
    },
    onSuccess,
  });

  const deleteAction = useAdminAction<string, void>({
    action: async (id: string) => {
      await deleteBanner(id);
    },
    onSuccess,
  });

  return {
    approveAction,
    rejectAction,
    updateAction,
    deleteAction,
  };
}
