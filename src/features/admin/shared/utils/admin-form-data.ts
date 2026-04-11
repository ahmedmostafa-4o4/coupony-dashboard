export function appendFormDataValue(
  formData: FormData,
  key: string,
  value: string | number | boolean | File | null | undefined
) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  if (value instanceof File) {
    formData.append(key, value);
    return;
  }

  if (typeof value === "boolean") {
    formData.append(key, value ? "1" : "0");
    return;
  }

  formData.append(key, String(value));
}
