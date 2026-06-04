"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  storeAddressSchema,
  type StoreAddressFormValues,
  type StoreAddressPayload,
} from "../schemas/store-address-form.schema";
import type { StoreAddress } from "../types/store.types";
import { hasErrors } from "@/features/admin/shared/utils/admin-form-schema";
import type { StoresDictionary } from "../utils/get-dictionary";

const LocationPicker = dynamic(
  () => import("@/features/admin/shared/components/location-picker"),
  { ssr: false }
);

export function StoreAddressDialog({
  address,
  isPending,
  onSubmit,
  dict,
}: {
  address?: StoreAddress;
  isPending: boolean;
  onSubmit: (payload: StoreAddressPayload) => Promise<boolean>;
  dict: StoresDictionary["details"]["addresses"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isEditing = Boolean(address);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Create an explicit initial values object
  const defaultValues: StoreAddressFormValues = address
    ? {
        label: address.label ?? "",
        addressLine1: address.addressLine1 ?? "",
        addressLine2: address.addressLine2 ?? "",
        city: address.city ?? "",
        stateProvince: address.stateProvince ?? "",
        postalCode: address.postalCode ?? "",
        countryCode: address.countryCode ?? "",
        phoneNumber: address.phoneNumber ?? "",
        latitude: address.latitude ?? "",
        longitude: address.longitude ?? "",
        deliveryInstructions: address.deliveryInstructions ?? "",
        isDefaultBilling: address.isDefaultBilling ?? false,
        isDefaultShipping: address.isDefaultShipping ?? false,
      }
    : storeAddressSchema.defaultValues;

  const [values, setValues] = useState<StoreAddressFormValues>(defaultValues);
  const [errors, setErrors] = useState<Partial<Record<keyof StoreAddressFormValues, string>>>({});

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
      setErrors({});
      setFormError(null);
    }
  }, [isOpen]);

  const updateValue = (key: keyof StoreAddressFormValues, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirm = async () => {
    try {
      const nextErrors = storeAddressSchema.validate(values);
      setErrors(nextErrors);

      if (hasErrors(nextErrors)) {
        return;
      }

      setFormError(null);
      const success = await onSubmit(storeAddressSchema.transform(values));

      if (success) {
        setIsOpen(false);
      }
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to submit this action.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={isEditing ? "secondary" : "primary"}>
          {isEditing ? dict.edit : dict.add}
        </Button>
      </DialogTrigger>
      <DialogContent className="!flex flex-col max-w-4xl max-h-[90vh] overflow-hidden p-0 gap-0 border-slate-200">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 bg-white shrink-0">
          <DialogTitle className="text-xl">
            {dict.form.title}
          </DialogTitle>
          <p className="text-sm text-slate-500 mt-1">
            {dict.form.desc}
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{dict.form.label}</label>
                <Input value={values.label} onChange={(e) => updateValue("label", e.target.value)} />
                {errors.label && <p className="text-sm font-medium text-rose-600">{errors.label}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{dict.form.addressLine1}</label>
                  <Input value={values.addressLine1} onChange={(e) => updateValue("addressLine1", e.target.value)} />
                  {errors.addressLine1 && <p className="text-sm font-medium text-rose-600">{errors.addressLine1}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{dict.form.addressLine2}</label>
                  <Input value={values.addressLine2} onChange={(e) => updateValue("addressLine2", e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{dict.form.city}</label>
                  <Input value={values.city} onChange={(e) => updateValue("city", e.target.value)} />
                  {errors.city && <p className="text-sm font-medium text-rose-600">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{dict.form.state}</label>
                  <Input value={values.stateProvince} onChange={(e) => updateValue("stateProvince", e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{dict.form.postalCode}</label>
                  <Input value={values.postalCode} onChange={(e) => updateValue("postalCode", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{dict.form.country}</label>
                  <Input value={values.countryCode} onChange={(e) => updateValue("countryCode", e.target.value)} />
                  {errors.countryCode && <p className="text-sm font-medium text-rose-600">{errors.countryCode}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{dict.form.phone}</label>
                <Input value={values.phoneNumber} onChange={(e) => updateValue("phoneNumber", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Delivery Instructions</label>
                <Textarea rows={3} value={values.deliveryInstructions} onChange={(e) => updateValue("deliveryInstructions", e.target.value)} />
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-slate-700">
                  <MapPin className="w-4 h-4 mr-1 text-slate-400" /> Map Location
                </label>
                <LocationPicker
                  latitude={values.latitude ? parseFloat(values.latitude) : null}
                  longitude={values.longitude ? parseFloat(values.longitude) : null}
                  onChange={(lat, lng) => {
                    updateValue("latitude", lat.toFixed(6));
                    updateValue("longitude", lng.toFixed(6));
                  }}
                />
                <p className="text-xs text-slate-500">
                  Click on the map or drag the pin to automatically set the coordinates.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Latitude</label>
                  <Input className="bg-white" value={values.latitude} onChange={(e) => updateValue("latitude", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Longitude</label>
                  <Input className="bg-white" value={values.longitude} onChange={(e) => updateValue("longitude", e.target.value)} />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <label className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={values.isDefaultShipping}
                    onChange={(e) => updateValue("isDefaultShipping", e.target.checked)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Set as Default Shipping</p>
                    <p className="text-xs text-slate-500">Use this address for primary deliveries.</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={values.isDefaultBilling}
                    onChange={(e) => updateValue("isDefaultBilling", e.target.checked)}
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Set as Default Billing</p>
                    <p className="text-xs text-slate-500">Use this address for invoices.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          {formError && (
            <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-sm font-medium text-rose-600">
              {formError}
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t border-slate-100 bg-white shrink-0">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button disabled={isPending} onClick={handleConfirm}>
            {isPending ? dict.form.saving : dict.form.save}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
