export function objectToFormData(
  obj: any,
  formData = new FormData(),
  namespace = ""
): FormData {
  if (obj instanceof File || obj instanceof Blob) {
    formData.append(namespace, obj);
  } else if (Array.isArray(obj)) {
    // Treat empty arrays properly if needed, but usually we just skip them
    obj.forEach((item, index) => {
      const arrayKey = `${namespace}[${index}]`;
      objectToFormData(item, formData, arrayKey);
    });
  } else if (typeof obj === "object" && obj !== null) {
    Object.keys(obj).forEach((key) => {
      const formKey = namespace ? `${namespace}[${key}]` : key;
      const value = obj[key];
      // Skip undefined values
      if (value !== undefined) {
        objectToFormData(value, formData, formKey);
      }
    });
  } else {
    // Boolean values in FormData should usually be '1' or '0' for Laravel, or 'true'/'false'.
    // Laravel casts 'true' and 'false' string properly for boolean rules.
    let parsedValue = obj;
    if (typeof obj === 'boolean') {
      parsedValue = obj ? 1 : 0;
    }
    formData.append(namespace, parsedValue == null ? "" : String(parsedValue));
  }

  return formData;
}

export function hasFiles(obj: any): boolean {
  if (obj instanceof File || obj instanceof Blob) {
    return true;
  }
  if (Array.isArray(obj)) {
    return obj.some(hasFiles);
  }
  if (typeof obj === "object" && obj !== null) {
    return Object.values(obj).some(hasFiles);
  }
  return false;
}
