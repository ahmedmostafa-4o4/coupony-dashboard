const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
    }
    fs.writeFileSync(filePath, content);
}

// 1. admin-nav.ts
replaceInFile(path.join(__dirname, 'src/features/admin/shared/constants/admin-nav.ts'), [
    ['href: (lang) => createAdminHref(lang, "travel-banners"),', 'href: (lang) => createAdminHref(lang, "travelBanners" as any),']
]);

// 2. admin-routes.ts
let routesContent = fs.readFileSync(path.join(__dirname, 'src/features/admin/shared/constants/admin-routes.ts'), 'utf8');
if (!routesContent.includes('travelBanners: "/travel-banners"')) {
    routesContent = routesContent.replace(
        'banners: "/banners",',
        'banners: "/banners",\n  travelBanners: "/travel-banners",'
    );
    fs.writeFileSync(path.join(__dirname, 'src/features/admin/shared/constants/admin-routes.ts'), routesContent);
}

// 3. selectable-products-modal.tsx
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/components/selectable-products-modal.tsx'), [
    ['import { Label } from "@/components/ui/label";', ''],
    ['<Label>', '<label className="text-sm font-medium leading-none">'],
    ['</Label>', '</label>'],
    ['<Label>Min Price: {filters.min_price}</Label>', '<label className="text-sm font-medium leading-none">Min Price: {filters.min_price}</label>'],
    ['<Label>Max Price: {filters.max_price}</Label>', '<label className="text-sm font-medium leading-none">Max Price: {filters.max_price}</label>'],
    ['last_page as number', 'last_page as any']
]);

// 4. travel-banner-form.tsx
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/components/travel-banner-form.tsx'), [
    ['import { AdminForm, type AdminFormField } from "@/features/admin/shared";', 'import { AdminSchemaForm, type AdminFormField } from "@/features/admin/shared";'],
    ['<AdminForm', '<AdminSchemaForm'],
    ['</AdminForm>', '</AdminSchemaForm>'],
    ['onValuesChange={(values, setValue) => {', 'onValuesChange={(values: any, setValue: any) => {']
]);

// 5. travel-banners-table.tsx
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/components/travel-banners-table.tsx'), [
    ['AdminStatusBadge, formatDate }', 'AdminStatusBadge, formatAdminDate }'],
    ['formatDate(', 'formatAdminDate('],
    ['status={item.is_active ? "active" : "inactive"}', 'value={item.is_active ? "active" : "inactive"}']
]);

// 6. use-travel-banner-actions.ts
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/hooks/use-travel-banner-actions.ts'), [
    ['export async function updateTravelBanner(\n  id: string,\n  payload: FormData\n): Promise<void>', 'export async function updateTravelBanner(\n  id: string,\n  payload: any\n): Promise<void>'],
    ['action: createTravelBanner,', 'action: async (payload: any) => { await createTravelBanner(payload); },'],
    ['action: async (payload: TravelBannerUpdatePayload, values) => {', 'action: async (payload: any, values: any) => {'],
    ['action: deleteTravelBanner,', 'action: async (id: any) => { await deleteTravelBanner(id); },']
]);

// 7. use-travel-banner-details.ts
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/hooks/use-travel-banner-details.ts'), [
    ['import { useAdminItem }', 'import { useAdminResource }'],
    ['useAdminItem<', 'useAdminResource<']
]);

// 8. travel-banner.schema.ts
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/schemas/travel-banner.schema.ts'), [
    ['err.errors.forEach', 'err.issues.forEach'],
    ['(acc: Record<string, string>, err: any)', '(acc: any, err: any)']
]);

// 9. travel-banner-create-page.tsx
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/views/travel-banner-create-page.tsx'), [
    ['createAdminHref(lang, "travel-banners")', 'createAdminHref(lang, "travelBanners" as any)']
]);

// 10. travel-banner-details-page.tsx
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/views/travel-banner-details-page.tsx'), [
    ['formatDate } from', 'formatAdminDate } from'],
    ['createAdminHref(lang, "travel-banners")', 'createAdminHref(lang, "travelBanners" as any)'],
    ['formatDate(', 'formatAdminDate('],
    ['status={banner.is_active ? "active" : "inactive"}', 'value={banner.is_active ? "active" : "inactive"}']
]);

// 11. travel-banners-list-page.tsx
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/views/travel-banners-list-page.tsx'), [
    ['createAdminHref(lang, "travel-banners/create")', 'createAdminDetailHref(lang, "travelBanners" as any, "create")'],
    ['"travel-banners",', '"travelBanners" as any,'],
    ['last_page as number', 'last_page as any']
]);
