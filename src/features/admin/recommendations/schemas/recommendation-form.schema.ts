import type { AdminFormSchema } from "@/features/admin/shared/types/admin-form.types";
import {
  parseJsonObject,
  trimOptional,
  toOptionalNumber,
} from "@/features/admin/shared/utils/admin-form-schema";

import type { CreateRecommendationRequest } from "../types/recommendation.types";

export interface RecommendationFormValues {
  contextJson: string;
  expiresAt: string;
  generatedBy: string;
  reasonCode: string;
  score: string;
  targetId: string;
  targetType: string;
  userId: string;
}

export const recommendationFormSchema: AdminFormSchema<
  RecommendationFormValues,
  CreateRecommendationRequest
> = {
  defaultValues: {
    contextJson: "",
    expiresAt: "",
    generatedBy: "manual",
    reasonCode: "",
    score: "",
    targetId: "",
    targetType: "offer",
    userId: "",
  },
  transform(values) {
    return {
      context: parseJsonObject(values.contextJson),
      expires_at: trimOptional(values.expiresAt),
      generated_by: values.generatedBy,
      reason_code: trimOptional(values.reasonCode),
      score: toOptionalNumber(values.score),
      target_id: values.targetId.trim(),
      target_type: values.targetType,
      user_id: values.userId.trim(),
    };
  },
  validate(values) {
    return {
      score:
        values.score.trim() && toOptionalNumber(values.score) === undefined
          ? "Score must be numeric."
          : undefined,
      targetId: values.targetId.trim() ? undefined : "Target ID is required.",
      userId: values.userId.trim() ? undefined : "User ID is required.",
    };
  },
};
