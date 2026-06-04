"use client";

import { useState } from "react";
import { toast } from "sonner";
import { uploadStoreVerification } from "../api/upload-store-verification";
import { approveStoreVerification } from "../api/approve-store-verification";
import { rejectStoreVerification } from "../api/reject-store-verification";

export function useStoreVerificationsActions(storeId: string, onSuccess?: () => Promise<void>) {
  const [isUploading, setIsUploading] = useState(false);
  const [isApproving, setIsApproving] = useState<string | number | null>(null);
  const [isRejecting, setIsRejecting] = useState<string | number | null>(null);

  const handleUpload = async (documentType: string, file: File) => {
    try {
      setIsUploading(true);
      await uploadStoreVerification(storeId, documentType, file);
      toast.success("Document uploaded successfully");
      if (onSuccess) await onSuccess();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload document");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  const handleApprove = async (verificationId: string | number) => {
    try {
      setIsApproving(verificationId);
      await approveStoreVerification(storeId, verificationId);
      toast.success("Document approved successfully");
      if (onSuccess) await onSuccess();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to approve document");
      return false;
    } finally {
      setIsApproving(null);
    }
  };

  const handleReject = async (verificationId: string | number, reason?: string) => {
    try {
      setIsRejecting(verificationId);
      await rejectStoreVerification(storeId, verificationId, reason);
      toast.success("Document rejected successfully");
      if (onSuccess) await onSuccess();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to reject document");
      return false;
    } finally {
      setIsRejecting(null);
    }
  };

  return {
    isUploading,
    isApproving,
    isRejecting,
    handleUpload,
    handleApprove,
    handleReject,
  };
}
