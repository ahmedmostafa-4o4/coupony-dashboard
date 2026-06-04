import type {
  AdminFormErrors,
  AdminFormSchema,
} from "@/features/admin/shared/types/admin-form.types";
import { trimOptional } from "@/features/admin/shared/utils/admin-form-schema";

export interface StoreAddressFormValues {
  label: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
  phoneNumber: string;
  latitude: string;
  longitude: string;
  deliveryInstructions: string;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
}

export type StoreAddressPayload = {
  label: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince?: string;
  postalCode?: string;
  countryCode: string;
  phoneNumber?: string;
  latitude?: string;
  longitude?: string;
  deliveryInstructions?: string;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
};

export const storeAddressSchema: AdminFormSchema<
  StoreAddressFormValues,
  StoreAddressPayload
> = {
  defaultValues: {
    label: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    countryCode: "US",
    phoneNumber: "",
    latitude: "",
    longitude: "",
    deliveryInstructions: "",
    isDefaultBilling: false,
    isDefaultShipping: false,
  },

  transform: (values) => ({
    label: values.label.trim(),
    addressLine1: values.addressLine1.trim(),
    addressLine2: trimOptional(values.addressLine2),
    city: values.city.trim(),
    stateProvince: trimOptional(values.stateProvince),
    postalCode: trimOptional(values.postalCode),
    countryCode: values.countryCode.trim().toUpperCase(),
    phoneNumber: trimOptional(values.phoneNumber),
    latitude: trimOptional(values.latitude),
    longitude: trimOptional(values.longitude),
    deliveryInstructions: trimOptional(values.deliveryInstructions),
    isDefaultBilling: Boolean(values.isDefaultBilling),
    isDefaultShipping: Boolean(values.isDefaultShipping),
  }),

  validate: (values) => {
    const errors: AdminFormErrors<StoreAddressFormValues> = {};

    if (!values.label.trim()) {
      errors.label = "Label is required.";
    }

    if (!values.addressLine1.trim()) {
      errors.addressLine1 = "Address line 1 is required.";
    }

    if (!values.city.trim()) {
      errors.city = "City is required.";
    }

    if (!values.countryCode.trim() || values.countryCode.trim().length !== 2) {
      errors.countryCode = "Must be a 2-letter country code.";
    }

    return errors;
  },
};
