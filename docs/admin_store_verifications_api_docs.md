# Admin Store Verifications API Documentation

This document outlines the API endpoints available to administrators for managing store verification requests. All endpoints require the user to be authenticated and have the `admin` role.

---

## 1. List Store Verifications

Retrieves a paginated list of all store verification documents submitted by merchants.

- **Endpoint:** `GET /api/v1/admin/store-verifications`
- **Authentication:** Required (Bearer Token, Admin Role)

### Query Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `status` | string | Filter verifications by their current status (e.g., `pending`, `approved`, `rejected`). |
| `store_id` | string (UUID) | Filter verifications for a specific store. |
| `search` | string | Search for verifications by the store's name. |
| `per_page` | integer | Number of records per page (default: 20). |

### Successful Response (200 OK)

```json
{
  "message": "Store verifications retrieved successfully.",
  "data": [
    {
      "id": "e30e13bb-40dc-4a41-ac42-d3a95c9a75ff",
      "store_id": "c1f7940d-3e95-3554-95d5-37346434df24",
      "document_type": "id_card_front",
      "document_path": "documents/c1f7940d-3e95-3554-95d5-37346434df24.pdf",
      "status": "pending",
      "rejection_reason": null,
      "store_details": {
        "id": "c1f7940d-3e95-3554-95d5-37346434df24",
        "name": "Acme Corp",
        "email": "acme@example.com"
      },
      "created_at": "2026-06-07T00:00:00.000000Z",
      "updated_at": "2026-06-07T00:00:00.000000Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "total": 100
  }
}
```

---

## 2. Get Single Verification Details

Retrieves the details of a specific store verification document, including the eager-loaded store context.

- **Endpoint:** `GET /api/v1/admin/store-verifications/{id}`
- **Authentication:** Required (Bearer Token, Admin Role)

### Path Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | string (UUID) | The unique identifier of the store verification record. |

### Successful Response (200 OK)

```json
{
  "message": "Store verification retrieved successfully.",
  "data": {
    "id": "e30e13bb-40dc-4a41-ac42-d3a95c9a75ff",
    "store_id": "c1f7940d-3e95-3554-95d5-37346434df24",
    "document_type": "commercial_register",
    "document_path": "documents/commercial_register_123.pdf",
    "status": "pending",
    "rejection_reason": null,
    "store_details": {
      "id": "c1f7940d-3e95-3554-95d5-37346434df24",
      "name": "Acme Corp"
    },
    "created_at": "2026-06-07T00:00:00.000000Z",
    "updated_at": "2026-06-07T00:00:00.000000Z"
  }
}
```

---

## 3. Approve Store Verification

Approves a pending store verification document. This action marks the document as approved and may automatically verify the store itself if all required verification documents are fulfilled.

- **Endpoint:** `POST /api/v1/admin/store-verifications/{id}/approve`
- **Authentication:** Required (Bearer Token, Admin Role)

### Request Body (Optional)

```json
{
  "notes": "Looks legitimate. Approved."
}
```

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `notes` | string | No | Internal notes provided by the admin reviewing the document (max: 1000 chars). |

### Successful Response (200 OK)

```json
{
  "message": "Store verification document approved successfully.",
  "data": {
    "id": "e30e13bb-40dc-4a41-ac42-d3a95c9a75ff",
    "status": "approved",
    "rejection_reason": null,
    ...
  }
}
```

> [!NOTE]
> Upon successful approval, the system triggers the `VerificationDocumentApproved` event internally, which handles verifying the store flag if applicable.

---

## 4. Reject Store Verification

Rejects a pending store verification document. A specific rejection reason must be provided, which is recorded so the merchant can understand what needs to be fixed.

- **Endpoint:** `POST /api/v1/admin/store-verifications/{id}/reject`
- **Authentication:** Required (Bearer Token, Admin Role)

### Request Body (Required)

```json
{
  "reason": "The uploaded commercial register is blurry and illegible. Please upload a clear copy."
}
```

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `reason` | string | **Yes** | The reason for rejecting the document (max: 1000 chars). This is usually visible to the merchant. |

### Successful Response (200 OK)

```json
{
  "message": "Store verification document rejected successfully.",
  "data": {
    "id": "e30e13bb-40dc-4a41-ac42-d3a95c9a75ff",
    "status": "rejected",
    "rejection_reason": "The uploaded commercial register is blurry and illegible. Please upload a clear copy.",
    ...
  }
}
```

> [!WARNING]
> Upon rejection, the `VerificationDocumentRejected` event is triggered. Usually, this prompts the merchant to upload a replacement document.
