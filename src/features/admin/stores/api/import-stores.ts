import { apiClient } from "@/lib/api/client";

export async function importStores(formData: FormData) {
  return await apiClient.post<{ message: string }>("/admin/imports/stores", formData);
}

export async function downloadStoresTemplate() {
  const blob = await apiClient.getBlob("/admin/imports/stores/template");
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "store_import_template.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
