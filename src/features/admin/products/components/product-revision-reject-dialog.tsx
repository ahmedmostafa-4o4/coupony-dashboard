"use client";

import { useState } from "react";
import { Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { hasErrors } from "@/features/admin/shared/utils/admin-form-schema";

import {
  productRevisionRejectActionSchema,
  type ProductRevisionRejectActionValues,
} from "../schemas/product-revision-action.schema";
import type { ProductRevision, RejectProductRevisionRequest } from "../types/product-revision.types";
import type { ProductsDictionary } from "../utils/get-dictionary";

const SECTION_OPTIONS = [
  { value: "short_description", label: "Short Description" },
  { value: "currency", label: "Currency" },
  { value: "sku", label: "SKU" },
  { value: "category_ids", label: "Categories" },
  { value: "images", label: "Images" },
  { value: "variants", label: "Variants" },
  { value: "variant_attributes", label: "Variant Attributes" },
  { value: "offer", label: "Offer" },
];

const SECTION_FIELDS: Record<string, { value: string; label: string }[]> = {
  short_description: [{ value: "value", label: "Value" }],
  currency: [{ value: "value", label: "Value" }],
  sku: [{ value: "value", label: "Value" }],
  category_ids: [{ value: "value", label: "Value" }],
  images: [{ value: "file", label: "File" }],
  variants: [
    { value: "option_summary", label: "Option Summary" },
    { value: "sku", label: "SKU" },
    { value: "original_price", label: "Original Price" },
    { value: "currency", label: "Currency" },
  ],
  variant_attributes: [
    { value: "attribute_name", label: "Attribute Name" },
    { value: "attribute_value", label: "Attribute Value" },
    { value: "sort_order", label: "Sort Order" },
  ],
  offer: [
    { value: "type", label: "Type" },
    { value: "status", label: "Status" },
    { value: "label", label: "Label" },
    { value: "claim_expiration_minutes", label: "Claim Expiration Minutes" },
    { value: "fixed_amount", label: "Fixed Amount" },
    { value: "percentage_value", label: "Percentage Value" },
    { value: "max_discount", label: "Max Discount" },
    { value: "buy_qty", label: "Buy Qty" },
    { value: "get_qty", label: "Get Qty" },
    { value: "allow_mix_buy_variants", label: "Allow Mix Buy Variants" },
    { value: "allow_mix_reward_variants", label: "Allow Mix Reward Variants" },
    { value: "buy_variant_skus", label: "Buy Variant SKUs" },
    { value: "reward_variant_skus", label: "Reward Variant SKUs" },
  ],
};

export function ProductRevisionRejectDialog({
  isPending,
  onSubmit,
  triggerLabel,
  revision,
  dict,
}: {
  isPending?: boolean;
  onSubmit: (payload: RejectProductRevisionRequest) => Promise<unknown>;
  triggerLabel?: string;
  revision?: ProductRevision | null;
  dict: ProductsDictionary["rejectDialog"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<ProductRevisionRejectActionValues>(
    productRevisionRejectActionSchema.defaultValues
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const variants = Array.isArray(revision?.variants)
    ? revision.variants
    : Array.isArray((revision?.payload as any)?.variants)
    ? (revision?.payload as any).variants
    : [];

  const variantSkuOptions = variants
    .map((v: any) => v?.sku)
    .filter(Boolean)
    .map((sku: string) => ({ value: String(sku), label: String(sku) }));

  const images = Array.isArray(revision?.images)
    ? revision.images
    : Array.isArray((revision?.payload as any)?.images)
    ? (revision?.payload as any).images
    : [];

  const imageUidOptions = images
    .map((img: any) => img?.id || img?.uid || img?.url)
    .filter(Boolean)
    .map((val: string) => ({ value: String(val), label: String(val) }));

  function getAttributeOptions(sku?: string) {
    if (!sku) return [];
    const variant = variants.find((v: any) => v?.sku === sku);
    if (!variant || !variant.attributes || typeof variant.attributes !== "object") return [];
    
    if (!Array.isArray(variant.attributes)) {
      return Object.keys(variant.attributes).map((key) => ({
        value: String(key),
        label: String(key),
      }));
    }
    
    return variant.attributes
      .map((attr: any) => attr?.attribute_name || attr?.name)
      .filter(Boolean)
      .map((name: string) => ({ value: String(name), label: String(name) }));
  }

  function openDialog() {
    setValues(productRevisionRejectActionSchema.defaultValues);
    setErrors({});
    setFormError(null);
    setIsOpen(true);
  }

  function updateValue(
    key: keyof ProductRevisionRejectActionValues,
    value: unknown
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function addRequestedChange() {
    setValues((current) => ({
      ...current,
      requestedChanges: [
        ...current.requestedChanges,
        {
          section: "",
          field: "",
          selectorSku: "",
          selectorImageUid: "",
          variantSelectorSku: "",
          attributeSelectorName: "",
          message: "",
        },
      ],
    }));
  }

  function updateRequestedChange(
    index: number,
    field: keyof ProductRevisionRejectActionValues["requestedChanges"][0],
    val: string
  ) {
    setValues((current) => {
      const updated = [...current.requestedChanges];
      updated[index] = { ...updated[index], [field]: val };
      
      if (field === "section") {
        const allowedFields = SECTION_FIELDS[val] || [];
        if (allowedFields.length > 0) {
          updated[index].field = allowedFields[0].value;
        } else {
          updated[index].field = "value";
        }
      }
      
      return { ...current, requestedChanges: updated };
    });
  }

  function removeRequestedChange(index: number) {
    setValues((current) => {
      const updated = current.requestedChanges.filter((_, i) => i !== index);
      return { ...current, requestedChanges: updated };
    });
  }

  async function handleConfirm() {
    try {
      const nextErrors = productRevisionRejectActionSchema.validate(values);
      setErrors(nextErrors as Record<string, string>);

      if (hasErrors(nextErrors)) {
        return;
      }

      setFormError(null);
      const payload = productRevisionRejectActionSchema.transform(values);
      const result = await onSubmit(payload);

      if (result !== undefined) {
        setIsOpen(false);
      }
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to submit this action."
      );
    }
  }

  const sectionOptions = SECTION_OPTIONS.map((opt) => ({
    value: opt.value,
    label: dict.sections[opt.value as keyof typeof dict.sections] || opt.label,
  }));

  return (
    <>
      <Button variant="danger" onClick={openDialog}>
        {triggerLabel || dict.triggerLabel}
      </Button>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col">
            <CardHeader>
              <div>
                <CardTitle>{dict.title}</CardTitle>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {dict.description}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 overflow-y-auto">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">{dict.reason}</span>
                <Textarea
                  placeholder={dict.reasonPlaceholder}
                  value={values.reason}
                  onChange={(e) => updateValue("reason", e.target.value)}
                  rows={2}
                />
                {errors.reason ? (
                  <p className="text-sm font-medium text-rose-600">
                    {errors.reason}
                  </p>
                ) : null}
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-700">
                  {dict.internalNotes}
                </span>
                <Textarea
                  placeholder={dict.internalNotesPlaceholder}
                  value={values.notes}
                  onChange={(e) => updateValue("notes", e.target.value)}
                  rows={2}
                />
              </label>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {dict.requestedChanges}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addRequestedChange}
                    className="h-8 px-2 text-xs"
                  >
                    <Plus className="me-1 h-3 w-3" /> {dict.addChange}
                  </Button>
                </div>

                {values.requestedChanges.length === 0 ? (
                  <p className="text-sm text-slate-500 italic">
                    {dict.noChanges}
                  </p>
                ) : null}

                {values.requestedChanges.map((change, index) => {
                  const allowedFields = (SECTION_FIELDS[change.section] || []).map((f) => ({
                    value: f.value,
                    label: dict.fields[f.value as keyof typeof dict.fields] || f.label,
                  }));
                  const requiresVariantSku = change.section === "variants";
                  const requiresImageUid = change.section === "images";
                  const requiresVariantAndAttribute = change.section === "variant_attributes";
                  const attributeOptions = getAttributeOptions(change.variantSelectorSku);

                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 relative"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRequestedChange(index)}
                        className="absolute end-2 top-2 h-6 w-6 text-slate-400 hover:text-rose-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pe-6">
                        <label className="block space-y-1">
                          <span className="text-xs font-medium text-slate-700">
                            {dict.section}
                          </span>
                          <Select
                            value={change.section}
                            onValueChange={(val) =>
                              updateRequestedChange(index, "section", val)
                            }
                          >
                            <SelectTrigger className="h-8 text-xs bg-white">
                              <SelectValue placeholder={dict.selectSection} />
                            </SelectTrigger>
                            <SelectContent>
                              {sectionOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors[`requestedChanges.${index}.section`] ? (
                            <p className="text-xs font-medium text-rose-600">
                              {errors[`requestedChanges.${index}.section`]}
                            </p>
                          ) : null}
                        </label>

                        {allowedFields.length > 0 && (
                          <label className="block space-y-1">
                            <span className="text-xs font-medium text-slate-700">
                              {dict.field}
                            </span>
                            <Select
                              value={change.field || allowedFields[0].value}
                              onValueChange={(val) =>
                                updateRequestedChange(index, "field", val)
                              }
                            >
                              <SelectTrigger className="h-8 text-xs bg-white">
                                <SelectValue placeholder={dict.selectField} />
                              </SelectTrigger>
                              <SelectContent>
                                {allowedFields.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </label>
                        )}
                        
                        {requiresVariantSku && (
                          <label className="block space-y-1">
                            <span className="text-xs font-medium text-slate-700">
                              {dict.variantSku}
                            </span>
                            {variantSkuOptions.length > 0 ? (
                              <Select
                                value={change.selectorSku ?? ""}
                                onValueChange={(val) =>
                                  updateRequestedChange(index, "selectorSku", val)
                                }
                              >
                                <SelectTrigger className="h-8 text-xs bg-white">
                                  <SelectValue placeholder={dict.selectSku} />
                                </SelectTrigger>
                                <SelectContent>
                                  {variantSkuOptions.map((opt: { value: string; label: string }) => (
                                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                placeholder={dict.skuPlaceholder}
                                value={change.selectorSku ?? ""}
                                onChange={(e) =>
                                  updateRequestedChange(index, "selectorSku", e.target.value)
                                }
                                className="h-8 text-xs bg-white"
                              />
                            )}
                            {errors[`requestedChanges.${index}.selectorSku`] ? (
                              <p className="text-xs font-medium text-rose-600">
                                {errors[`requestedChanges.${index}.selectorSku`]}
                              </p>
                            ) : null}
                          </label>
                        )}

                        {requiresImageUid && (
                          <label className="block space-y-1">
                            <span className="text-xs font-medium text-slate-700">
                              {dict.imageId}
                            </span>
                            {imageUidOptions.length > 0 ? (
                              <Select
                                value={change.selectorImageUid ?? ""}
                                onValueChange={(val) =>
                                  updateRequestedChange(index, "selectorImageUid", val)
                                }
                              >
                                <SelectTrigger className="h-8 text-xs bg-white">
                                  <SelectValue placeholder={dict.selectImage} />
                                </SelectTrigger>
                                <SelectContent>
                                  {imageUidOptions.map((opt: { value: string; label: string }) => (
                                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                placeholder={dict.imagePlaceholder}
                                value={change.selectorImageUid ?? ""}
                                onChange={(e) =>
                                  updateRequestedChange(index, "selectorImageUid", e.target.value)
                                }
                                className="h-8 text-xs bg-white"
                              />
                            )}
                            {errors[`requestedChanges.${index}.selectorImageUid`] ? (
                              <p className="text-xs font-medium text-rose-600">
                                {errors[`requestedChanges.${index}.selectorImageUid`]}
                              </p>
                            ) : null}
                          </label>
                        )}

                        {requiresVariantAndAttribute && (
                          <>
                            <label className="block space-y-1">
                              <span className="text-xs font-medium text-slate-700">
                                {dict.variantSku}
                              </span>
                              {variantSkuOptions.length > 0 ? (
                                <Select
                                  value={change.variantSelectorSku ?? ""}
                                  onValueChange={(val) =>
                                    updateRequestedChange(index, "variantSelectorSku", val)
                                  }
                                >
                                  <SelectTrigger className="h-8 text-xs bg-white">
                                    <SelectValue placeholder={dict.selectSku} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {variantSkuOptions.map((opt: { value: string; label: string }) => (
                                      <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                        {opt.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  placeholder={dict.skuPlaceholder}
                                  value={change.variantSelectorSku ?? ""}
                                  onChange={(e) =>
                                    updateRequestedChange(index, "variantSelectorSku", e.target.value)
                                  }
                                  className="h-8 text-xs bg-white"
                                />
                              )}
                              {errors[`requestedChanges.${index}.variantSelectorSku`] ? (
                                <p className="text-xs font-medium text-rose-600">
                                  {errors[`requestedChanges.${index}.variantSelectorSku`]}
                                </p>
                              ) : null}
                            </label>
                            <label className="block space-y-1">
                              <span className="text-xs font-medium text-slate-700">
                                {dict.attributeName}
                              </span>
                              {attributeOptions.length > 0 ? (
                                <Select
                                  value={change.attributeSelectorName ?? ""}
                                  onValueChange={(val) =>
                                    updateRequestedChange(index, "attributeSelectorName", val)
                                  }
                                >
                                  <SelectTrigger className="h-8 text-xs bg-white">
                                    <SelectValue placeholder={dict.selectAttribute} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {attributeOptions.map((opt: { value: string; label: string }) => (
                                      <SelectItem key={opt.value} value={opt.value} className="text-xs">
                                        {opt.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input
                                  placeholder={dict.attributePlaceholder}
                                  value={change.attributeSelectorName ?? ""}
                                  onChange={(e) =>
                                    updateRequestedChange(index, "attributeSelectorName", e.target.value)
                                  }
                                  className="h-8 text-xs bg-white"
                                />
                              )}
                              {errors[`requestedChanges.${index}.attributeSelectorName`] ? (
                                <p className="text-xs font-medium text-rose-600">
                                  {errors[`requestedChanges.${index}.attributeSelectorName`]}
                                </p>
                              ) : null}
                            </label>
                          </>
                        )}
                      </div>

                      <label className="block space-y-1 pe-6">
                        <span className="text-xs font-medium text-slate-700">
                          {dict.message}
                        </span>
                        <Input
                          placeholder={dict.messagePlaceholder}
                          value={change.message ?? ""}
                          onChange={(e) =>
                            updateRequestedChange(index, "message", e.target.value)
                          }
                          className="h-8 text-xs bg-white"
                        />
                      </label>
                    </div>
                  );
                })}
              </div>

              {formError ? (
                <p className="text-sm font-medium text-rose-600 pt-2">{formError}</p>
              ) : null}
            </CardContent>
            <CardFooter className="pt-4 border-t mt-auto shrink-0">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                {dict.cancel}
              </Button>
              <Button
                disabled={isPending}
                variant="danger"
                onClick={handleConfirm}
              >
                {isPending ? dict.working : dict.rejectBtn}
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : null}
    </>
  );
}
