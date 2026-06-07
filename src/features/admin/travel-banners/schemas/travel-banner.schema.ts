import { z } from "zod";
import type { AdminFormSchema } from "@/features/admin/shared";

// Create Schema
export const travelBannerCreateSchema = z.object({
  product_id: z.string().min(1, "Product is required"),
  image: z.any().refine((val) => val instanceof File, "Image file is required"),
  cta_text: z.string().min(1, "CTA Text is required"),
  save_percent: z.string().min(1, "Save Percent is required"),
  priority: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type TravelBannerCreateValues = z.input<typeof travelBannerCreateSchema>;
export type TravelBannerCreatePayload = FormData;

export const travelBannerCreateAdminSchema: AdminFormSchema<TravelBannerCreateValues, TravelBannerCreatePayload> = {
  defaultValues: {
    product_id: "",
    image: null,
    cta_text: "",
    save_percent: "",
    priority: "0",
    start_date: "",
    end_date: "",
    is_active: true,
  },
  validate: (values) => {
    const result = travelBannerCreateSchema.safeParse(values);
    if (result.success) return {};
    return result.error.issues.reduce((acc, err) => {
      const key = err.path[0] as keyof TravelBannerCreateValues;
      acc[key] = err.message;
      return acc;
    }, {} as Record<keyof TravelBannerCreateValues, string>);
  },
  transform: (values) => {
    const formData = new FormData();
    formData.append("product_id", values.product_id);
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }
    formData.append("cta_text", values.cta_text);
    formData.append("save_percent", values.save_percent);
    if (values.priority) formData.append("priority", values.priority);
    if (values.start_date) formData.append("start_date", values.start_date);
    if (values.end_date) formData.append("end_date", values.end_date);
    formData.append("is_active", values.is_active ? "1" : "0");
    return formData;
  },
};

// Update Schema
export const travelBannerUpdateSchema = z.object({
  image: z.any().optional().refine((val) => !val || val instanceof File, "Must be a valid file"),
  cta_text: z.string().min(1, "CTA Text is required"),
  save_percent: z.string().min(1, "Save Percent is required"),
  priority: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type TravelBannerUpdateValues = z.input<typeof travelBannerUpdateSchema>;
export type TravelBannerUpdatePayload = FormData;

export const travelBannerUpdateAdminSchema: AdminFormSchema<TravelBannerUpdateValues, TravelBannerUpdatePayload> = {
  defaultValues: {
    image: null,
    cta_text: "",
    save_percent: "",
    priority: "0",
    start_date: "",
    end_date: "",
    is_active: true,
  },
  validate: (values) => {
    const result = travelBannerUpdateSchema.safeParse(values);
    if (result.success) return {};
    return result.error.issues.reduce((acc, err) => {
      const key = err.path[0] as keyof TravelBannerUpdateValues;
      acc[key] = err.message;
      return acc;
    }, {} as Record<keyof TravelBannerUpdateValues, string>);
  },
  transform: (values) => {
    const formData = new FormData();
    formData.append("_method", "PATCH");
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }
    formData.append("cta_text", values.cta_text);
    formData.append("save_percent", values.save_percent);
    if (values.priority) formData.append("priority", values.priority);
    if (values.start_date) formData.append("start_date", values.start_date);
    if (values.end_date) formData.append("end_date", values.end_date);
    formData.append("is_active", values.is_active ? "1" : "0");
    return formData;
  },
};
