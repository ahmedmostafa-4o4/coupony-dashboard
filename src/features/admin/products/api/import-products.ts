import { apiClient } from "@/lib/api/client";

export async function importProducts(formData: FormData) {
  return await apiClient.post<{ message: string }>("/admin/imports/products", formData);
}

export async function downloadProductsTemplate() {
  const blob = await apiClient.getBlob("/admin/imports/products/template");
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "product_import_template.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
