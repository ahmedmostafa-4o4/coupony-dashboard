import { z } from "zod";
import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";

export const bannerRejectActionSchema = z.object({
  reason: z.string().min(3).max(500),
});

export type BannerRejectActionValues = z.infer<typeof bannerRejectActionSchema>;

export const bannerUpdateActionSchema = z.object({
  priority: z.number().min(0).max(1000).optional(),
  isActive: z.boolean().optional(),
});

export type BannerUpdateActionValues = z.infer<typeof bannerUpdateActionSchema>;

export const bannerRejectAdminSchema: AdminFormSchema<{ rejectionReason: string }, { reason: string }> = {
  defaultValues: { rejectionReason: "" },
  transform: (values) => ({ reason: values.rejectionReason }),
  validate: (values) => {
    const errors: Record<string, string> = {};
    if (!values.rejectionReason || values.rejectionReason.length < 3) {
      errors.rejectionReason = "Reason must be at least 3 characters";
    }
    return errors;
  },
};
