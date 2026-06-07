# Admin Notification Broadcasts API Integration

This document outlines the API integration for the Admin Notification Broadcasts system, allowing administrators to send custom notifications (in-app, push, email, SMS) to specific user roles or individual users.

## Endpoints

### 1. Broadcast a New Notification
**POST** `/api/v1/admin/notifications/broadcast`
**Requires Auth:** Yes (Sanctum)
**Role Required:** `admin`

**Request Body:**
```json
{
    "title": "Summer Sale is Here!",
    "message": "Get up to 50% off on all products.",
    "channels": ["in_app", "push", "email"],
    "target_roles": ["customer", "store_owner"],
    "target_user_ids": ["uuid-1", "uuid-2"]
}
```

**Fields:**
- `title` (string, required): The title of the notification.
- `message` (string, required): The main text body of the notification.
- `channels` (array, required): Array of channels to send through. Valid values: `in_app`, `push`, `email`, `sms`.
- `target_roles` (array, optional): Send to users with these roles. Valid values: `all`, `customer`, `store_owner`, `admin`.
- `target_user_ids` (array, optional): Array of specific user UUIDs to notify.
*Note: You must specify at least one target by either providing `target_roles` or `target_user_ids`.*

**Response (201 Created):**
```json
{
    "message": "Broadcast notification queued successfully.",
    "broadcast": {
        "id": "abc-123",
        "admin_id": "admin-uuid",
        "title": "Summer Sale is Here!",
        "message": "Get up to 50% off on all products.",
        "channels": ["in_app", "push", "email"],
        "target_roles": ["customer", "store_owner"],
        "target_user_ids": ["uuid-1", "uuid-2"],
        "status": "pending",
        "created_at": "2026-06-07T16:40:00Z"
    }
}
```

---

### 2. List Broadcast History
**GET** `/api/v1/admin/notifications/broadcasts`
**Requires Auth:** Yes (Sanctum)
**Role Required:** `admin`

Retrieve a paginated history of all past broadcast notifications.

**Query Parameters:**
- `page` (integer, optional): The page number.
- `per_page` (integer, optional): Number of items per page (default: 15).

**Response (200 OK):**
```json
{
    "current_page": 1,
    "data": [
        {
            "id": "abc-123",
            "admin_id": "admin-uuid",
            "title": "Summer Sale is Here!",
            "message": "Get up to 50% off on all products.",
            "channels": ["in_app", "push", "email"],
            "target_roles": ["customer", "store_owner"],
            "target_user_ids": null,
            "status": "completed",
            "total_sent": 1500,
            "total_failed": 2,
            "completed_at": "2026-06-07T16:45:00Z",
            "created_at": "2026-06-07T16:40:00Z",
            "updated_at": "2026-06-07T16:45:00Z",
            "admin": {
                "id": "admin-uuid",
                "first_name": "Admin",
                "last_name": "User",
                "email": "admin@coupony.com"
            }
        }
    ],
    "first_page_url": "...",
    "from": 1,
    "last_page": 1,
    "last_page_url": "...",
    "links": [...],
    "next_page_url": null,
    "path": "...",
    "per_page": 15,
    "prev_page_url": null,
    "to": 1,
    "total": 1
}
```

---

### 3. View Specific Broadcast Details
**GET** `/api/v1/admin/notifications/broadcasts/{id}`
**Requires Auth:** Yes (Sanctum)
**Role Required:** `admin`

**Response (200 OK):**
```json
{
    "data": {
        "id": "abc-123",
        "admin_id": "admin-uuid",
        "title": "Summer Sale is Here!",
        "message": "Get up to 50% off on all products.",
        "channels": ["in_app", "push", "email"],
        "target_roles": ["customer", "store_owner"],
        "target_user_ids": null,
        "status": "completed",
        "total_sent": 1500,
        "total_failed": 2,
        "completed_at": "2026-06-07T16:45:00Z",
        "created_at": "2026-06-07T16:40:00Z",
        "updated_at": "2026-06-07T16:45:00Z",
        "admin": {
            "id": "admin-uuid",
            "first_name": "Admin",
            "last_name": "User",
            "email": "admin@coupony.com"
        }
    }
}
```

## Background Processing

When a broadcast is created via the `POST` endpoint, it goes into a `pending` state and is dispatched to a background queue (`ProcessNotificationBroadcastJob`).
The job chunks through the user base based on the target settings and leverages `NotificationService->sendBulk()`.
As the job progresses, the `total_sent` and `total_failed` fields are incrementally updated. Once completely processed, the `status` transitions to `completed` (or `failed` in the event of an unhandled exception) and `completed_at` is populated.
