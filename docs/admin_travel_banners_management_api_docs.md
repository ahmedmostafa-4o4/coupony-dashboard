# Admin Banner Management API Documentation

This document details the endpoints available to administrative users for managing store banners.

All endpoints require the user to be authenticated and possess the `admin` role.

---

## 1. List Banners
Retrieve a paginated list of all banners in the system, with optional filtering.

**Endpoint:** `GET /api/v1/admin/banners`

**Authentication:** Required (Admin only)

**Query Parameters (Optional):**
- `status` (string): Filter by banner status (`pending`, `approved`, `rejected`).
- `store_id` (string): Filter by the UUID of the store.
- `is_active` (boolean): Filter by active status (`true` or `false`).
- `search` (string): Search by `discount_label` or `cta_label`.
- `per_page` (integer): Number of items per page. Default is `20`.
- `page` (integer): The page number.

**Response Example (200 OK):**
```json
{
  "message": "Banners retrieved successfully.",
  "data": [
    {
      "id": "c1f7940d-3e95-3554-95d5-37346434df24",
      "store_id": "93ade262-ff23-46f5-9c2d-a180452ad938",
      "image_url": "https://example.com/storage/banners/c1f7940d.jpg",
      "image_path": "banners/c1f7940d.jpg",
      "discount_label": "Super Sale",
      "date_range": "Valid till 30th Jan",
      "cta_label": "Shop Now",
      "terms_of_use": "Applicable on all items",
      "end_time": "2026-06-30T23:59:59+00:00",
      "priority": 100,
      "is_active": false,
      "status": "pending",
      "likes_count": 0,
      "is_liked": false,
      "is_favorited": false,
      "approved_at": null,
      "approved_by": null,
      "requested_by": "b3f8149d-...",
      "rejection_reason": null,
      "created_at": "2026-06-07T03:00:00+00:00",
      "updated_at": "2026-06-07T03:00:00+00:00",
      "store": {
        "id": "93ade262-ff23-46f5-9c2d-a180452ad938",
        "name": "Super Store",
        "logo_url": "https://example.com/logo.png"
      }
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 1,
    "total": 1
  }
}
```

---

## 2. Show Banner Details
Retrieve full details for a specific banner, including relationships like offers and branches.

**Endpoint:** `GET /api/v1/admin/banners/{id}`

**Authentication:** Required (Admin only)

**Response Example (200 OK):**
```json
{
  "message": "Banner retrieved successfully.",
  "data": {
    "id": "c1f7940d-3e95-3554-95d5-37346434df24",
    "store_id": "93ade262-ff23-46f5-9c2d-a180452ad938",
    "image_url": "https://example.com/storage/banners/c1f7940d.jpg",
    "image_path": "banners/c1f7940d.jpg",
    "discount_label": "Super Sale",
    "priority": 100,
    "is_active": false,
    "status": "pending",
    "store": { ... },
    "offers": [ ... ],
    "branches": [ ... ],
    "requested_by_user": { ... }
  }
}
```

---

## 3. Approve Banner
Approves a pending banner, makes it active, and sends a notification to the merchant.

**Endpoint:** `POST /api/v1/admin/banners/{id}/approve`

**Authentication:** Required (Admin only)

**Request Body (Optional):**
```json
{
  "notes": "Looks perfect, approved!"
}
```

**Response Example (200 OK):**
```json
{
  "message": "Banner approved successfully.",
  "data": {
    "id": "c1f7940d-3e95-3554-95d5-37346434df24",
    "status": "approved",
    "is_active": true,
    "approved_by": "a1b2c3d4-...",
    ...
  }
}
```

---

## 4. Reject Banner
Rejects a banner with a mandatory reason, keeping it inactive, and sends a notification to the merchant.

**Endpoint:** `POST /api/v1/admin/banners/{id}/reject`

**Authentication:** Required (Admin only)

**Request Body (Required):**
```json
{
  "reason": "Image quality is too low."
}
```

**Response Example (200 OK):**
```json
{
  "message": "Banner rejected successfully.",
  "data": {
    "id": "c1f7940d-3e95-3554-95d5-37346434df24",
    "status": "rejected",
    "is_active": false,
    "rejection_reason": "Image quality is too low.",
    ...
  }
}
```

---

## 5. Update Banner Priority & Status
Update a banner's active status and/or priority without needing to go through the approval process.

**Endpoint:** `PUT /api/v1/admin/banners/{id}`

**Authentication:** Required (Admin only)

**Request Body (Optional / Partial):**
```json
{
  "priority": 50,
  "is_active": true
}
```

**Response Example (200 OK):**
```json
{
  "message": "Banner updated successfully.",
  "data": {
    "id": "c1f7940d-3e95-3554-95d5-37346434df24",
    "priority": 50,
    "is_active": true,
    ...
  }
}
```

---

## 6. Delete Banner
Hard delete a banner and its associated local storage file.

**Endpoint:** `DELETE /api/v1/admin/banners/{id}`

**Authentication:** Required (Admin only)

**Response Example (200 OK):**
```json
{
  "message": "Banner deleted successfully."
}
```
