# Admin Claims Management API Documentation

This documentation provides the details for the newly added endpoints to manage claims by administrators.

## 1. Offer Claims

Administrators can view, filter, and cancel `OfferClaim` entities across the entire system.

### 1.1 List Offer Claims
`GET /api/v1/admin/offer-claims`

**Query Parameters:**
- `status` (string, optional): Filter by claim status (e.g., `active`, `redeemed`, `cancelled`, `expired`).
- `user_id` (uuid, optional): Filter by user who made the claim.
- `store_id` (uuid, optional): Filter by store.
- `start_date` (date, optional): Filter by creation date start.
- `end_date` (date, optional): Filter by creation date end.

**Response:**
Returns a paginated list of claims with relationships loaded (`user`, `store`, `product`, `offer`, `redeemedBy`).

**Example Response:**
```json
{
    "data": [
        {
            "id": "e45f4dd8-9ece-07e2-dfe9-0914e4049a4e",
            "user_id": "ec064ec0-ae8e-a839-f669-42cd27d1761a",
            "store_id": "f2334a74-b4ea-46d5-94f2-94413da9d4ed",
            "product_id": "00bb488e-8d06-7527-6ba6-9a1d58dc47a7",
            "offer_id": "4b03467b-96de-dc8a-17cb-199895b9a146",
            "status": "active",
            "cancellation_reason": null,
            "claim_token": "X9F1B2",
            "qr_code_token": "a1b2c3d4",
            "expires_at": "2026-06-14T00:00:00.000000Z",
            "redeemed_at": null,
            "user": {
                "id": "ec064ec0-ae8e-a839-f669-42cd27d1761a",
                "name": "John Doe",
                "email": "john@example.com"
            },
            "store": {
                "id": "f2334a74-b4ea-46d5-94f2-94413da9d4ed",
                "name": "Awesome Electronics"
            },
            "product": {
                "id": "00bb488e-8d06-7527-6ba6-9a1d58dc47a7",
                "title": "Smartphone X"
            },
            "offer": {
                "id": "4b03467b-96de-dc8a-17cb-199895b9a146",
                "label": "20% Off"
            }
        }
    ],
    "links": {
        "first": "http://localhost/api/v1/admin/offer-claims?page=1",
        "last": "http://localhost/api/v1/admin/offer-claims?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "per_page": 15,
        "to": 1,
        "total": 1
    }
}
```

---

### 1.2 Get Offer Claim Details
`GET /api/v1/admin/offer-claims/{id}`

**Parameters:**
- `id` (uuid): The ID of the Offer Claim.

**Response:**
Returns the full detail object for the specified claim.

**Example Response:**
```json
{
    "data": {
        "id": "e45f4dd8-9ece-07e2-dfe9-0914e4049a4e",
        "user_id": "ec064ec0-ae8e-a839-f669-42cd27d1761a",
        "store_id": "f2334a74-b4ea-46d5-94f2-94413da9d4ed",
        "product_id": "00bb488e-8d06-7527-6ba6-9a1d58dc47a7",
        "offer_id": "4b03467b-96de-dc8a-17cb-199895b9a146",
        "status": "active",
        "cancellation_reason": null,
        "claim_token": "X9F1B2",
        "qr_code_token": "a1b2c3d4",
        "expires_at": "2026-06-14T00:00:00.000000Z",
        "redeemed_at": null,
        "user": { ... },
        "store": { ... },
        "product": { ... },
        "offer": { ... }
    }
}
```

---

### 1.3 Cancel Offer Claim
`POST /api/v1/admin/offer-claims/{id}/cancel`

Allows an administrator to forcefully cancel an active claim, usually due to fraudulent activity or policy violation.

**Request Body:**
```json
{
    "reason": "Suspicious activity detected. Customer requested chargeback."
}
```
- `reason` (string, required): The justification for cancelling the claim.

**Behavior:**
1. Updates the `status` to `CANCELLED`.
2. Sets the `cancellation_reason` field.
3. Fires an `OfferClaimCancelled` event which triggers the corresponding notification type `OFFER_CLAIM_CANCELLED` to alert the user.

**Example Response:**
```json
{
    "data": {
        "id": "e45f4dd8-9ece-07e2-dfe9-0914e4049a4e",
        "status": "cancelled",
        "cancellation_reason": "Suspicious activity detected. Customer requested chargeback.",
        "updated_at": "2026-06-07T05:00:00.000000Z"
    },
    "message": "Offer claim cancelled successfully."
}
```

---

## 2. Banner Claims

Similar to Offer Claims, Administrators can view, filter, and cancel `BannerClaim` entities.

### 2.1 List Banner Claims
`GET /api/v1/admin/banner-claims`

**Query Parameters:**
- `status` (string, optional): Filter by claim status (e.g., `active`, `redeemed`, `cancelled`, `expired`).
- `user_id` (uuid, optional): Filter by user who made the claim.
- `store_id` (uuid, optional): Filter by store.
- `start_date` (date, optional): Filter by creation date start.
- `end_date` (date, optional): Filter by creation date end.

**Response:**
Returns a paginated list of claims with relationships loaded (`user`, `store`, `banner`, `redeemedBy`).

**Example Response:**
```json
{
    "data": [
        {
            "id": "1d97c045-5ac3-4fce-a48e-f951c2028616",
            "user_id": "151c71e8-07c3-47c7-9b4b-2d9925879096",
            "store_id": "edb38411-bc25-455f-a008-6eaa0918ad7f",
            "banner_id": "0ca68a3b-aed2-483c-ab8e-8ef99a056bbd",
            "status": "active",
            "cancellation_reason": null,
            "claim_token": "A1B2C3",
            "qr_code_token": "qwert123",
            "expires_at": "2026-06-14T00:00:00.000000Z",
            "redeemed_at": null,
            "user": {
                "id": "151c71e8-07c3-47c7-9b4b-2d9925879096",
                "name": "Jane Smith",
                "email": "jane@example.com"
            },
            "store": {
                "id": "edb38411-bc25-455f-a008-6eaa0918ad7f",
                "name": "Travel Agency"
            },
            "banner": {
                "id": "0ca68a3b-aed2-483c-ab8e-8ef99a056bbd",
                "title": "Summer Vacation Deal"
            }
        }
    ],
    "links": { ... },
    "meta": { ... }
}
```

---

### 2.2 Get Banner Claim Details
`GET /api/v1/admin/banner-claims/{id}`

**Parameters:**
- `id` (uuid): The ID of the Banner Claim.

**Response:**
Returns the full detail object for the specified claim.

**Example Response:**
```json
{
    "data": {
        "id": "1d97c045-5ac3-4fce-a48e-f951c2028616",
        "user_id": "151c71e8-07c3-47c7-9b4b-2d9925879096",
        "store_id": "edb38411-bc25-455f-a008-6eaa0918ad7f",
        "banner_id": "0ca68a3b-aed2-483c-ab8e-8ef99a056bbd",
        "status": "active",
        "cancellation_reason": null,
        "claim_token": "A1B2C3",
        "qr_code_token": "qwert123",
        "expires_at": "2026-06-14T00:00:00.000000Z",
        "redeemed_at": null,
        "user": { ... },
        "store": { ... },
        "banner": { ... }
    }
}
```

---

### 2.3 Cancel Banner Claim
`POST /api/v1/admin/banner-claims/{id}/cancel`

Allows an administrator to forcefully cancel an active banner claim.

**Request Body:**
```json
{
    "reason": "Duplicate claim detected via bot network."
}
```
- `reason` (string, required): The justification for cancelling the claim.

**Behavior:**
1. Updates the `status` to `CANCELLED`.
2. Sets the `cancellation_reason` field.
3. Fires a `BannerClaimCancelled` event which triggers the corresponding notification type `BANNER_CLAIM_CANCELLED` to alert the user.

**Example Response:**
```json
{
    "data": {
        "id": "1d97c045-5ac3-4fce-a48e-f951c2028616",
        "status": "cancelled",
        "cancellation_reason": "Duplicate claim detected via bot network.",
        "updated_at": "2026-06-07T05:00:00.000000Z"
    },
    "message": "Banner claim cancelled successfully."
}
```
