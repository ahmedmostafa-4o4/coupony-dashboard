export type AdminFormValue = string | boolean;

export type AdminFormValues = object;

export type AdminFormErrors<TValues extends AdminFormValues> = Partial<
  Record<Extract<keyof TValues, string>, string>
>;

export interface AdminFormOption {
  label: string;
  value: string;
}

export interface AdminFormField<TValues extends AdminFormValues> {
  key: Extract<keyof TValues, string>;
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "datetime-local"
    | "textarea"
    | "select"
    | "checkbox";
  placeholder?: string;
  description?: string;
  options?: AdminFormOption[];
  rows?: number;
}

export interface AdminFormSchema<
  TValues extends AdminFormValues,
  TPayload,
> {
  defaultValues: TValues;
  transform: (values: TValues) => TPayload;
  validate: (values: TValues) => AdminFormErrors<TValues>;
}
