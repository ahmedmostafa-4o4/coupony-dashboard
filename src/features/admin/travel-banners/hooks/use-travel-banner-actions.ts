import { useAdminAction } from "@/features/admin/shared";
import { createTravelBanner, updateTravelBanner, deleteTravelBanner } from "../api/travel-banner-actions";

export function useTravelBannerActions(onSuccess?: () => void | Promise<void>) {
  const createAction = useAdminAction<any, any>({
    action: async (payload: any) => { await createTravelBanner(payload); },
    onSuccess,
  });

  const updateAction = useAdminAction<any, any>({
    action: async (input: { id: string, payload: any }) => {
      await updateTravelBanner(input.id, input.payload);
    },
    onSuccess,
  });

  const deleteAction = useAdminAction<string, any>({
    action: async (id: string) => { await deleteTravelBanner(id); },
    onSuccess,
  });

  return {
    createAction,
    updateAction,
    deleteAction,
  };
}
