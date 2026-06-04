import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import { trimOptional } from "@/features/admin/shared/utils/admin-form-schema";

import type {
  ApproveProductRevisionRequest,
  RejectProductRevisionRequest,
} from "../types/product-revision.types";

export interface ProductRevisionApproveActionValues {
  notes: string;
}

export interface ProductRevisionRejectActionValues {
  reason: string;
  notes: string;
  requestedChanges: {
    section: string;
    field?: string;
    selectorSku?: string;
    selectorImageUid?: string;
    variantSelectorSku?: string;
    attributeSelectorName?: string;
    message?: string;
  }[];
}

export const productRevisionApproveActionSchema: AdminFormSchema<
  ProductRevisionApproveActionValues,
  ApproveProductRevisionRequest
> = {
  defaultValues: {
    notes: "",
  },
  transform(values) {
    return {
      notes: trimOptional(values.notes),
    };
  },
  validate() {
    return {};
  },
};

export const productRevisionRejectActionSchema: AdminFormSchema<
  ProductRevisionRejectActionValues,
  RejectProductRevisionRequest
> = {
  defaultValues: {
    reason: "",
    notes: "",
    requestedChanges: [],
  },
  transform(values) {
    return {
      reason: values.reason.trim(),
      notes: trimOptional(values.notes),
      requested_changes: values.requestedChanges
        .filter((rc) => rc.section.trim() !== "")
        .map((rc) => {
          const change: any = {
            section: rc.section.trim(),
            field: trimOptional(rc.field ?? ""),
            message: trimOptional(rc.message ?? ""),
          };

          if (rc.section === "variants") {
            if (rc.selectorSku?.trim()) {
              change.selector = { sku: rc.selectorSku.trim() };
            }
          } else if (rc.section === "images") {
            if (rc.selectorImageUid?.trim()) {
              const val = rc.selectorImageUid.trim();
              if (val.startsWith("http") || val.startsWith("/")) {
                change.selector = { image_url: val };
              } else if (!isNaN(Number(val))) {
                change.selector = { id: Number(val) };
              } else {
                change.selector = { uid: val };
              }
            }
          } else if (rc.section === "variant_attributes") {
            if (rc.variantSelectorSku?.trim()) {
              change.variant_selector = { sku: rc.variantSelectorSku.trim() };
            }
            if (rc.attributeSelectorName?.trim()) {
              change.attribute_selector = { name: rc.attributeSelectorName.trim() };
            }
          }

          return change;
        }),
    };
  },
  validate(values) {
    const errors: Record<string, string> = {};
    if (!values.reason.trim()) {
      errors.reason = "Rejection reason is required.";
    }
    
    values.requestedChanges.forEach((rc, index) => {
      if (!rc.section.trim()) {
        errors[`requestedChanges.${index}.section`] = "Section is required.";
      }
      
      if (rc.section === "variants" && !rc.selectorSku?.trim()) {
        errors[`requestedChanges.${index}.selectorSku`] = "Variant SKU is required.";
      }
      
      if (rc.section === "images" && !rc.selectorImageUid?.trim()) {
        errors[`requestedChanges.${index}.selectorImageUid`] = "Image UID is required.";
      }
      
      if (rc.section === "variant_attributes") {
        if (!rc.variantSelectorSku?.trim()) {
          errors[`requestedChanges.${index}.variantSelectorSku`] = "Variant SKU is required.";
        }
        if (!rc.attributeSelectorName?.trim()) {
          errors[`requestedChanges.${index}.attributeSelectorName`] = "Attribute Name is required.";
        }
      }
    });

    return Object.keys(errors).length > 0 ? errors : {};
  },
};
