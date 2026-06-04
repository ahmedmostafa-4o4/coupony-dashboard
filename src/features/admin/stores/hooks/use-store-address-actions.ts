"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createStoreAddress } from "../api/create-store-address";
import { updateStoreAddress } from "../api/update-store-address";
import { deleteStoreAddress } from "../api/delete-store-address";
import type { StoreAddressPayload } from "../schemas/store-address-form.schema";

export function useStoreAddressActions(storeId: string, onSuccess?: () => Promise<void>) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | number | null>(null);

  const handleCreate = async (data: StoreAddressPayload) => {
    try {
      setIsCreating(true);
      await createStoreAddress(storeId, data);
      toast.success("Address created successfully");
      if (onSuccess) await onSuccess();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create address");
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (addressId: string | number, data: StoreAddressPayload) => {
    try {
      setIsUpdating(addressId);
      await updateStoreAddress(storeId, addressId, data);
      toast.success("Address updated successfully");
      if (onSuccess) await onSuccess();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update address");
      return false;
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (addressId: string | number) => {
    try {
      setIsDeleting(addressId);
      await deleteStoreAddress(storeId, addressId);
      toast.success("Address deleted successfully");
      if (onSuccess) await onSuccess();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete address");
      return false;
    } finally {
      setIsDeleting(null);
    }
  };

  return {
    isCreating,
    isUpdating,
    isDeleting,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
