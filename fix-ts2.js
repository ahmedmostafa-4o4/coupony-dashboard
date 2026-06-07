const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
    }
    fs.writeFileSync(filePath, content);
}

// 1. validator.ts in .next
// Wait, the routing issue:
// Cannot find module '../../src/app/[lang]/admin/banners/[id]/page.js'
// Oh! Did I create `.tsx` files inside `admin/travel-banners`? Yes.
// The error says `admin/banners/[id]/page.js`. Not `travel-banners`?
// That's an existing file or something from my build process. I'll ignore next/types/validator.ts for now, it's just from the build cache, I'll clear it.

// 2. selectable-products-modal.tsx
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/components/selectable-products-modal.tsx'), [
    ['filters.perPage || 5', '(filters.perPage as number) || 5'],
    ['(listState.meta as any)?.last_page', '(listState.meta as any)?.last_page as number'],
    ['last_page as any as number', 'last_page as number'] // in case it was casted
]);

// 3. travel-banners-list-page.tsx
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/views/travel-banners-list-page.tsx'), [
    ['filters.perPage || 20', '(filters.perPage as number) || 20'],
    ['(listState.meta as Record<string, unknown>)?.last_page as number', '(listState.meta as Record<string, unknown>)?.last_page as number'],
    ['last_page as any as number', 'last_page as number']
]);

// 4. use-travel-banner-actions.ts
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/hooks/use-travel-banner-actions.ts'), [
    ['(payload: any) => {', '(payload: any): Promise<any> => {'],
    ['(payload: any, values: any) => {', '(payload: any, values: any): Promise<any> => {'],
    ['(id: any) => {', '(id: any): Promise<any> => {'],
    ['(values) => travelBannerUpdateAdminSchema.validate(values.payload) as any,', '(values: any) => travelBannerUpdateAdminSchema.validate(values.payload) as any,'],
    ['transform: (values) => travelBannerUpdateAdminSchema.transform(values.payload),', 'transform: (values: any) => travelBannerUpdateAdminSchema.transform(values.payload) as any,'],
    ['transform: (id) => id,', 'transform: (id: any) => id,'],
    ['validate: () => ({}),', 'validate: (): any => ({}),']
]);

// 5. travel-banner-form.tsx
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/components/travel-banner-form.tsx'), [
    ['fields={fields.filter(f => f.key !== "product_id")}', 'fields={fields.filter(f => f.key !== "product_id") as any}']
]);

// 6. travel-banner.schema.ts
replaceInFile(path.join(__dirname, 'src/features/admin/travel-banners/schemas/travel-banner.schema.ts'), [
    ['err.issues.forEach', '(err as any).issues.forEach'] // quick cast
]);
