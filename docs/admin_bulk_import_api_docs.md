# Admin Bulk Import API Documentation

> [!NOTE]
> All endpoints require **Admin** authentication via `Bearer` token and `role:admin` middleware.

---

## Overview

The Bulk Import system allows administrators to import complex hierarchies of **Stores** and **Products** using a ZIP file containing an Excel spreadsheet (`data.xlsx`) and an optional `images/` folder with referenced media files.

### Key Features
- **Separate endpoints** for Store and Product imports
- **Downloadable templates** with pre-filled headers and example data
- **Asynchronous processing** via background queue jobs (`database` driver)
- **All-or-nothing validation** — if any row fails validation, the entire import is rejected
- **In-app notifications** on success or failure
- **Complex Hierarchies**: Supports multi-sheet Excel files.
  - **Stores**: Import Stores, Branches, Employees, and Hours simultaneously.
  - **Products**: Import Products, Variants, Attributes, and Offers simultaneously.
- **Image support** via ZIP-bundled images referenced by filename in the spreadsheet

---

## ZIP File Structure

```
my_import.zip
├── data.xlsx          # Required — the Excel file with data rows (can have multiple sheets)
└── images/            # Optional — folder containing referenced image files
    ├── logo.png
    ├── banner.jpg
    └── product_img.jpg
```

---

## Endpoints

### 1. Download Store Import Template

| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/v1/admin/imports/stores/template` |

The Store Template contains **4 separate sheets** linked together using arbitrary `reference_id` strings (e.g., `store_1`, `branch_1`).

#### Sheet 1: Stores
| Column | Required | Description |
|--------|----------|-------------|
| `reference_id` | ✅ Yes | Unique ID used to link branches, employees, and hours to this store (e.g. `store_1`) |
| `name` | ✅ Yes | Store name |
| `description` | No | Brief description |
| `email` | No | Contact email |
| `phone` | No | Contact phone |
| `tax_id` | No | Tax ID number |
| `commission_rate` | No | Commission rate (e.g., `0.1500`) |
| `status` | No | Default: `pending` |
| `owner_email` | No | Email of the Store Owner (must exist in the system) |
| `categories` | No | Comma-separated list of category slugs (e.g. `electronics,clothing`) |
| `logo_image` | No | Filename of the logo image in the `images/` folder |
| `banner_image` | No | Filename of the banner image in the `images/` folder |

#### Sheet 2: Branches
| Column | Required | Description |
|--------|----------|-------------|
| `reference_id` | No | Unique ID to link specific employees to this branch (e.g. `branch_1`) |
| `store_reference_id` | ✅ Yes | Must match a `reference_id` from the Stores sheet |
| `first_name` | No | Branch Contact First Name |
| `last_name` | No | Branch Contact Last Name |
| `phone_number` | No | Branch Phone |
| `address_line1` | No | Address |
| `address_line2` | No | Apartment, suite, etc. |
| `city` | No | City |
| `state_province` | No | State or Province |
| `postal_code` | No | Postal code |
| `country_code` | No | Country Code (e.g., EG) |
| `latitude` | No | Geo coordinates |
| `longitude` | No | Geo coordinates |

#### Sheet 3: Employees
| Column | Required | Description |
|--------|----------|-------------|
| `store_reference_id` | ✅ Yes | Must match a `reference_id` from the Stores sheet |
| `branch_reference_id` | No | Must match a `reference_id` from the Branches sheet |
| `user_email` | ✅ Yes | User account email (User must already exist in the system) |
| `role` | No | e.g. `store_manager`, `branch_manager`, `cashier` |
| `permissions` | No | Comma-separated extra permissions (e.g. `claims:manage,orders:view`) |

#### Sheet 4: Hours
| Column | Required | Description |
|--------|----------|-------------|
| `store_reference_id` | ✅ Yes | Must match a `reference_id` from the Stores sheet |
| `day_of_week` | ✅ Yes | `0` (Sunday) to `6` (Saturday) |
| `open_time` | No | Format: `HH:MM` |
| `close_time` | No | Format: `HH:MM` |
| `is_closed` | ✅ Yes | `1` or `0` |

---

### 2. Download Product Import Template

| | |
|---|---|
| **Method** | `GET` |
| **URL** | `/api/v1/admin/imports/products/template` |

The Product Template contains **4 separate sheets** linked together using arbitrary `reference_id` strings (e.g., `prod_1`, `var_2`).

#### Sheet 1: Products
| Column | Required | Description |
|--------|----------|-------------|
| `reference_id` | ✅ Yes | Unique ID used to link variants and offers to this product (e.g. `prod_1`) |
| `title` | ✅ Yes | Product title |
| `short_description` | No | Brief description (max 500 chars) |
| `description` | No | Full product description |
| `base_price` | ✅ Yes | Product base price (must be positive number) |
| `compare_at_price` | No | Original price before discount |
| `currency` | No | Currency code (default: `EGP`) |
| `sku` | No | Stock Keeping Unit |
| `categories` | No | Comma-separated list of category slugs (e.g. `electronics,accessories`) |
| `image` | No | Filename of the product image in the `images/` folder |

#### Sheet 2: Variants
If you leave this sheet empty, a single default variant will be generated for the product.
| Column | Required | Description |
|--------|----------|-------------|
| `reference_id` | ✅ Yes | Unique ID used to link attributes to this variant (e.g. `var_1`) |
| `product_reference_id` | ✅ Yes | Must match a `reference_id` from the Products sheet |
| `title` | ✅ Yes | Variant title (e.g. "Red / Large") |
| `option_summary` | No | Summary of options (e.g. "Color: Red, Size: L") |
| `sku` | No | Variant SKU |
| `barcode` | No | Variant Barcode |
| `price` | ✅ Yes | Variant specific price |
| `compare_at_price` | No | Original variant price |
| `stock_qty` | No | Available stock (leave blank for unlimited) |
| `is_default` | No | `1` or `0` |

#### Sheet 3: Attributes
| Column | Required | Description |
|--------|----------|-------------|
| `variant_reference_id` | ✅ Yes | Must match a `reference_id` from the Variants sheet |
| `attribute_name` | ✅ Yes | E.g., `Color`, `Size` |
| `attribute_value` | ✅ Yes | E.g., `Red`, `Large` |

#### Sheet 4: Offers
| Column | Required | Description |
|--------|----------|-------------|
| `product_reference_id` | ✅ Yes | Must match a `reference_id` from the Products sheet |
| `type` | ✅ Yes | `fixed`, `percentage`, or `buy_x_get_y` |
| `label` | No | Offer label (e.g. "Summer Sale 20%") |
| `percentage_value` | No | Discount percentage |
| `fixed_amount` | No | Fixed discount amount |
| `buy_qty` | No | Required buy quantity for BOGO offers |
| `get_qty` | No | Reward quantity for BOGO offers |
| `starts_at` | No | Start date (YYYY-MM-DD HH:MM:SS) |
| `ends_at` | No | End date (YYYY-MM-DD HH:MM:SS) |
| `target_buy_variants` | No | Comma-separated list of variant `reference_id`s that trigger the offer (e.g. `var_1,var_2`) |
| `target_reward_variants` | No | Comma-separated list of variant `reference_id`s given as rewards (e.g. `var_3`) |

---

### 3. Import Stores

| | |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/v1/admin/imports/stores` |
| **Content-Type** | `multipart/form-data` |

#### Request Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | file | ✅ Yes | ZIP archive (max 50MB) containing `data.xlsx` |

---

### 4. Import Products

| | |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/v1/admin/imports/products` |
| **Content-Type** | `multipart/form-data` |

#### Request Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | file | ✅ Yes | ZIP archive (max 50MB) containing `data.xlsx` |
| `store_id` | string (UUID) | ✅ Yes | The ID of the store to link products to |

---

## Notifications

Both endpoints trigger a background job. The Admin will receive an **in-app notification** when the job finishes.

#### On Success
```
Title: "Store Import Completed"
Message: "Successfully imported 5 store(s) from the uploaded Excel file."
```

#### On Failure (All-or-Nothing)
```
Title: "Store Import Failed"
Message: "Store import failed with the following errors:
  Stores Row 2: Category slug 'invalid-category' does not exist in the database.
  Employees Row 2: User with email 'notfound@example.com' does not exist in the system."
```
