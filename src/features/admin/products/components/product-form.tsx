"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

import { useForm, useFieldArray, Controller, type Control, type UseFormRegister } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, ChevronsUpDown, Check, Image as ImageIcon, UploadCloud, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useCategoriesList } from "../../categories/hooks/use-categories-list";

import {
  prepareProductPayload,
  toProductFormValues,
  type ProductFormValues,
} from "../schemas/product-form.schema";
import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from "../types/product.types";

import type { ProductsDictionary } from "../utils/get-dictionary";

function VariantAttributes({
  control,
  nestIndex,
  register,
  dict,
}: {
  control: Control<ProductFormValues>;
  nestIndex: number;
  register: UseFormRegister<ProductFormValues>;
  dict: ProductsDictionary["form"]["variants"];
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${nestIndex}.attributes` as any,
  });

  return (
    <div className="col-span-full space-y-4 pt-4 border-t border-slate-200 mt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-700">{dict.attributes}</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ attributeName: "", attributeValue: "" } as any)}
        >
          <Plus className="h-4 w-4 me-2" /> {dict.addAttribute}
        </Button>
      </div>
      {fields.length === 0 ? (
        <p className="text-xs text-slate-500 italic">{dict.noAttributes}</p>
      ) : (
        <div className="space-y-3">
          {fields.map((field, k) => (
            <div key={field.id} className="flex items-center gap-3">
              <Input
                placeholder={dict.attributeNamePlaceholder}
                {...register(`variants.${nestIndex}.attributes.${k}.attributeName` as const)}
              />
              <Input
                placeholder={dict.attributeValuePlaceholder}
                {...register(`variants.${nestIndex}.attributes.${k}.attributeValue` as const)}
              />
              <Button type="button" variant="ghost" className="p-2 text-rose-500 hover:text-rose-700" onClick={() => remove(k)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryMultiSelect({
  value,
  onChange,
  dict,
}: {
  value: string;
  onChange: (val: string) => void;
  dict: ProductsDictionary["form"]["base"];
}) {
  const { items, isLoading } = useCategoriesList({ status: "all", perPage: 100 });

  const selectedIds = value.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);

  const toggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((x) => x !== id).join(", "));
    } else {
      onChange([...selectedIds, id].join(", "));
    }
  };

  const selectedNames = items
    .filter((c) => selectedIds.includes(String(c.id)))
    .map((c) => c.name)
    .join(", ");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" role="combobox" className="w-full justify-between font-normal bg-white">
          <span className="truncate">
            {selectedIds.length > 0 ? selectedNames : dict.categoriesPlaceholder}
          </span>
          <ChevronsUpDown className="ms-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder={dict.categoriesSearchPlaceholder} />
          <CommandList>
            <CommandEmpty>{isLoading ? dict.categoriesLoading : dict.categoriesEmpty}</CommandEmpty>
            <CommandGroup>
              {items.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name || String(category.id)}
                  onSelect={() => toggle(String(category.id))}
                >
                  <Check
                    className={cn(
                      "me-2 h-4 w-4",
                      selectedIds.includes(String(category.id)) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function VariantSkuMultiSelect({
  value = "",
  onChange,
  variants,
  dict,
}: {
  value: string;
  onChange: (val: string) => void;
  variants: any[];
  dict: ProductsDictionary["form"]["offer"];
}) {
  const selectedSkus = value.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
  
  const validVariants = variants.filter((v) => v.sku && v.sku.trim().length > 0);

  const toggle = (sku: string) => {
    if (selectedSkus.includes(sku)) {
      onChange(selectedSkus.filter((x) => x !== sku).join(", "));
    } else {
      onChange([...selectedSkus, sku].join(", "));
    }
  };

  const selectedTitles = selectedSkus
    .map((sku) => {
      const v = validVariants.find((v) => v.sku === sku);
      return v ? (v.title || v.sku) : sku;
    })
    .join(", ");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" role="combobox" className="w-full justify-between font-normal bg-white">
          <span className="truncate">
            {selectedSkus.length > 0 ? selectedTitles : dict.buyVariantSkusPlaceholder}
          </span>
          <ChevronsUpDown className="ms-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder={dict.buyVariantSkusSearch} />
          <CommandList>
            <CommandEmpty>{dict.buyVariantSkusEmpty}</CommandEmpty>
            <CommandGroup>
              {validVariants.map((v) => (
                <CommandItem
                  key={v.sku}
                  value={v.sku}
                  onSelect={() => toggle(v.sku)}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "me-2 flex h-4 w-4 items-center justify-center rounded-sm border border-slate-300",
                      selectedSkus.includes(v.sku) ? "bg-blue-600 text-white border-blue-600" : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <Check className={cn("h-3 w-3")} />
                  </div>
                  <span>{v.title || "Unnamed Variant"}</span>
                  <span className="ms-2 text-xs text-slate-400">({v.sku})</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function DatePickerField({ value, onChange, placeholder }: { value?: string, onChange: (val: string) => void, placeholder: string }) {
  const date = value ? new Date(value + "T00:00:00") : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-start font-normal",
            !date && "text-slate-500"
          )}
        >
          <CalendarIcon className="me-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            if (d) {
              onChange(format(d, "yyyy-MM-dd"));
            } else {
              onChange("");
            }
          }}

        />
      </PopoverContent>
    </Popover>
  );
}

function ImageUploader({
  fields,
  append,
  remove,
  update,
  dict,
}: {
  fields: any[];
  append: (val: any) => void;
  remove: (index: number) => void;
  update: (index: number, val: any) => void;
  dict: ProductsDictionary["form"]["images"];
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };


  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not an image.`);
          return;
        }
        append({
          file,
          url: URL.createObjectURL(file),
          isPrimary: fields.length === 0,
        });
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not an image.`);
          return;
        }
        append({
          file,
          url: URL.createObjectURL(file),
          isPrimary: fields.length === 0,
        });
      });
    }
    // Clear the input so the same file can be selected again if needed
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors relative",
          isDragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
        )}
      >
        <UploadCloud className="h-10 w-10 text-slate-400 mb-4" />
        <p className="text-sm font-medium text-slate-700">{dict.uploader.dragDrop}</p>
        <p className="text-xs text-slate-500 mt-1 mb-4">{dict.uploader.clickSelect}</p>
        <Input
          type="file"
          multiple
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
          title=""
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {fields.map((field, index) => {
          const imgUrl = field.url || field.path;
          return (
            <div key={field.id} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-50">
              {imgUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imgUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon className="h-8 w-8" />
                </div>
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <Button type="button" variant="danger" className="text-xs py-1 px-2 h-auto" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4 me-2" /> {dict.uploader.remove}
                </Button>
                {!field.isPrimary && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="text-xs py-1 px-2 h-auto"
                    onClick={() => {
                      fields.forEach((f, i) => update(i, { ...f, isPrimary: false }));
                      update(index, { ...field, isPrimary: true });
                    }}
                  >
                    {dict.uploader.makePrimary}
                  </Button>
                )}
              </div>

              {field.isPrimary && (
                <div className="absolute top-2 start-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                  {dict.uploader.primary}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductForm({
  description,
  initialValues,
  isSubmitting,
  mode,
  onSubmit,
  submitLabel,
  title,
  dict,
}: {
  description: string;
  initialValues?: Product | null;
  isSubmitting?: boolean;
  mode: "create";
  onSubmit: (payload: CreateProductRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
  dict: ProductsDictionary["form"];
} | {
  description: string;
  initialValues?: Product | null;
  isSubmitting?: boolean;
  mode: "update";
  onSubmit: (payload: UpdateProductRequest) => Promise<unknown>;
  submitLabel: string;
  title: string;
  dict: ProductsDictionary["form"];
}) {
  const form = useForm<ProductFormValues>({
    defaultValues: toProductFormValues(initialValues),
  });

  const isFormDirty = Object.keys(form.formState.dirtyFields).length > 0;

  const variantsFieldArray = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const imagesFieldArray = useFieldArray({
    control: form.control,
    name: "images",
  });

  const watchOfferType = form.watch("offer.type");

  const [activeTab, setActiveTab] = useState<"base" | "variants" | "images" | "offer">("base");

  const handleSubmit = form.handleSubmit(async (values) => {
    const payload = prepareProductPayload(values, mode);
    await onSubmit(payload as any);
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex space-x-2 border-b border-slate-200 pb-px mb-6 overflow-x-auto">
        {[
          { id: "base", label: dict.tabs.base },
          { id: "variants", label: dict.tabs.variants },
          { id: "images", label: dict.tabs.images },
          { id: "offer", label: dict.tabs.offer },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Base Information */}
      <div className={cn(activeTab !== "base" && "hidden")}>
      <Card>
        <CardHeader>
          <CardTitle>{title} - {dict.base.title}</CardTitle>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {mode === "create" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">{dict.base.storeId}</label>
              <Input {...form.register("storeId", { required: true })} placeholder={dict.base.storeIdPlaceholder} />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{dict.base.titleLabel}</label>
            <Input {...form.register("title")} placeholder={dict.base.titlePlaceholder} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{dict.base.slug}</label>
            <Input {...form.register("slug")} placeholder={dict.base.slugPlaceholder} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{dict.base.sku}</label>
            <Input {...form.register("sku")} placeholder={dict.base.skuPlaceholder} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{dict.base.currency}</label>
            <Input {...form.register("currency")} placeholder={dict.base.currencyPlaceholder} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">{dict.base.shortDesc}</label>
            <Textarea {...form.register("shortDescription")} placeholder={dict.base.shortDescPlaceholder} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">{dict.base.desc}</label>
            <Textarea {...form.register("description")} placeholder={dict.base.descPlaceholder} rows={4} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">{dict.base.categories}</label>
            <Controller
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <CategoryMultiSelect value={field.value} onChange={field.onChange} dict={dict.base} />
              )}
            />
          </div>
          <div className="space-y-2 md:col-span-2 flex items-center gap-2">
            <Controller
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <Checkbox
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <label className="text-sm font-medium text-slate-700">{dict.base.featured}</label>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Variants Section */}
      <div className={cn(activeTab !== "variants" && "hidden")}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{dict.variants.title}</CardTitle>
            <p className="mt-2 text-sm text-slate-500">{dict.variants.desc}</p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              variantsFieldArray.append({
                title: "",
                sku: "",
                originalPrice: 0,
                currency: form.getValues("currency") || "USD",
                inventoryMode: "unlimited",
                isDefault: false,
                isActive: true,
              } as any)
            }
          >
            <Plus className="me-2 h-4 w-4" /> {dict.variants.addBtn}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {variantsFieldArray.fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border border-slate-200 p-4 relative bg-slate-50/50">
               <Button
                type="button"
                variant="ghost"
                className="absolute top-2 end-2 p-2 text-rose-500 hover:text-rose-700"
                onClick={() => variantsFieldArray.remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="grid gap-4 md:grid-cols-3 pe-8">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-700">{dict.variants.variantTitle}</label>
                  <Input {...form.register(`variants.${index}.title` as const)} placeholder={dict.variants.variantTitlePlaceholder} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-700">{dict.variants.sku}</label>
                  <Input {...form.register(`variants.${index}.sku` as const)} placeholder={dict.variants.skuPlaceholder} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-700">{dict.variants.originalPrice}</label>
                  <Input type="number" step="0.01" {...form.register(`variants.${index}.originalPrice` as const, { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-700">{dict.variants.currency}</label>
                  <Input {...form.register(`variants.${index}.currency` as const)} placeholder={dict.variants.currencyPlaceholder} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-700">{dict.variants.inventoryMode}</label>
                  <Controller
                    control={form.control}
                    name={`variants.${index}.inventoryMode` as const}
                    render={({ field: selectField }) => (
                      <Select value={selectField.value as string | undefined} onValueChange={selectField.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder={dict.variants.inventoryModePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unlimited">{dict.variants.inventoryModes.unlimited}</SelectItem>
                          <SelectItem value="tracked">{dict.variants.inventoryModes.tracked}</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-700">{dict.variants.stockQty}</label>
                  <Input type="number" {...form.register(`variants.${index}.stockQty` as const, { valueAsNumber: true })} />
                </div>
                <div className="flex items-center gap-4 col-span-full">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <Controller
                      control={form.control}
                      name={`variants.${index}.isDefault` as const}
                      render={({ field: cbField }) => (
                        <Checkbox checked={cbField.value as boolean} onCheckedChange={cbField.onChange} />
                      )}
                    />
                    {dict.variants.isDefault}
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <Controller
                      control={form.control}
                      name={`variants.${index}.isActive` as const}
                      render={({ field: cbField }) => (
                        <Checkbox checked={cbField.value as boolean} onCheckedChange={cbField.onChange} />
                      )}
                    />
                    {dict.variants.isActive}
                  </label>
                </div>
                
                <VariantAttributes control={form.control} nestIndex={index} register={form.register} dict={dict.variants} />
              </div>
            </div>
          ))}
          {variantsFieldArray.fields.length === 0 && (
            <p className="text-sm text-slate-500 italic text-center py-4">{dict.variants.noVariants}</p>
          )}
        </CardContent>
      </Card>
      </div>

      {/* Images Section */}
      <div className={cn(activeTab !== "images" && "hidden")}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{dict.images.title}</CardTitle>
            <p className="mt-2 text-sm text-slate-500">{dict.images.desc}</p>
          </div>
        </CardHeader>
        <CardContent>
          <ImageUploader 
            fields={imagesFieldArray.fields}
            append={imagesFieldArray.append}
            remove={imagesFieldArray.remove}
            update={imagesFieldArray.update}
            dict={dict.images}
          />
        </CardContent>
      </Card>
      </div>

      {/* Offer Section */}
      <div className={cn(activeTab !== "offer" && "hidden")}>
      <Card>
        <CardHeader>
          <CardTitle>{dict.offer.title}</CardTitle>
          <p className="mt-2 text-sm text-slate-500">{dict.offer.desc}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 md:w-1/2">
            <label className="text-sm font-medium text-slate-700">{dict.offer.type}</label>
            <Controller
              control={form.control}
              name="offer.type"
              render={({ field }) => (
                <Select value={field.value as string | undefined} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={dict.offer.typePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{dict.offer.types.none}</SelectItem>
                    <SelectItem value="fixed">{dict.offer.types.fixed}</SelectItem>
                    <SelectItem value="percentage">{dict.offer.types.percentage}</SelectItem>
                    <SelectItem value="buy_x_get_y">{dict.offer.types.buy_x_get_y}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {watchOfferType !== "none" && (
            <div className="grid gap-4 md:grid-cols-2 p-4 bg-slate-50 rounded-xl border border-slate-100 mt-4">
              {watchOfferType === "fixed" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{dict.offer.fixedAmount}</label>
                  <Input type="number" step="0.01" {...form.register("offer.fixed_amount")} placeholder={dict.offer.fixedAmountPlaceholder} />
                </div>
              )}
              {watchOfferType === "percentage" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">{dict.offer.percentageValue}</label>
                  <Input type="number" step="0.01" {...form.register("offer.percentage_value")} placeholder={dict.offer.percentageValuePlaceholder} />
                </div>
              )}
              {watchOfferType === "buy_x_get_y" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">{dict.offer.buyQty}</label>
                    <Input type="number" {...form.register("offer.buy_qty")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">{dict.offer.getQty}</label>
                    <Input type="number" {...form.register("offer.get_qty")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">{dict.offer.buyVariantSkus}</label>
                    <Controller
                      control={form.control}
                      name="offer.buy_variant_skus"
                      render={({ field }) => (
                        <VariantSkuMultiSelect 
                          value={(field.value as string) || ""} 
                          onChange={field.onChange} 
                          variants={form.watch("variants")} 
                          dict={dict.offer}
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">{dict.offer.rewardVariantSkus}</label>
                    <Controller
                      control={form.control}
                      name="offer.reward_variant_skus"
                      render={({ field }) => (
                        <VariantSkuMultiSelect 
                          value={(field.value as string) || ""} 
                          onChange={field.onChange} 
                          variants={form.watch("variants")} 
                          dict={dict.offer}
                        />
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-4 col-span-full">
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <Controller
                        control={form.control}
                        name="offer.allow_mix_buy_variants"
                        render={({ field }) => (
                          <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} />
                        )}
                      />
                      {dict.offer.mixBuy}
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <Controller
                        control={form.control}
                        name="offer.allow_mix_reward_variants"
                        render={({ field }) => (
                          <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} />
                        )}
                      />
                      {dict.offer.mixReward}
                    </label>
                  </div>
                </>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{dict.offer.startsAt}</label>
                <Controller
                  control={form.control}
                  name="offer.starts_at"
                  render={({ field }) => (
                    <DatePickerField
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={dict.offer.startsAtPlaceholder}
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">{dict.offer.endsAt}</label>
                <Controller
                  control={form.control}
                  name="offer.ends_at"
                  render={({ field }) => (
                    <DatePickerField
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={dict.offer.endsAtPlaceholder}
                    />
                  )}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting || (mode === "update" && !isFormDirty)} 
          className="min-w-32"
        >
          {isSubmitting ? dict.working : submitLabel}
        </Button>
      </div>
    </form>
  );
}
