# Admin Notification System Integration Guide

This document provides a comprehensive guide for frontend developers (Vue, React, Flutter) on how to integrate the newly built **Admin Notification System**. It covers both the REST API endpoints and the real-time WebSockets integration using Laravel Echo and Reverb.

---

## 1. Real-time WebSockets (Laravel Echo)

The backend is configured to use Laravel Reverb (a direct replacement for Pusher). This means you can use the standard `laravel-echo` package alongside `pusher-js` to listen for notifications.

### Authentication & Channels

- **Channel Type**: `private`
- **Channel Name**: `private-admin.notifications`
- **Who can connect?**: Any user authenticated via Sanctum who has the `admin` role.

### Frontend Setup (JavaScript Example)

Make sure you install the required packages:
```bash
npm install laravel-echo pusher-js
```

Initialize Echo with your Reverb credentials:

```javascript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    // Pass Sanctum Token in headers for private channels
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    },
});
```

### Listening for Events

Because this uses Laravel's native Notifications broadcasting, you can use the built-in `.notification()` method on the channel.

```javascript
window.Echo.private(`admin.notifications`)
    .notification((notification) => {
        console.log('New Admin Notification Received:', notification);
        
        // Example: Update unread count
        // Example: Show toast/snackbar alert
    });
```

### Payload Structure (WebSocket)

When a notification is broadcast, the payload looks like this:

```json
{
    "type": "App\\Notifications\\Admin\\NewStoreRegistrationNotification",
    "notification": {
        "title": "New Store Registration",
        "message": "Store 'MyStore' has just registered and requires approval.",
        "reference_type": "App\\Domain\\Store\\Models\\Store",
        "reference_id": "12345-uuid-6789",
        "data": {
            "store_id": "12345-uuid-6789",
            "store_name": "MyStore",
            "owner_id": "user-uuid-1234"
        }
    }
}
```

---

## 2. REST API Endpoints

These endpoints are used to populate the notification dropdown (or dedicated page) when the user first loads the dashboard, and to mark items as read.

### 2.1 Fetch Notifications

**Endpoint:** `GET /api/v1/admin/notifications`  
**Description:** Retrieves a paginated list of notifications belonging to the authenticated Admin. Ordered newest first.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `per_page` | integer | No | 20 | Number of items per page. |
| `page` | integer | No | 1 | The page number to retrieve. |
| `unread_only` | boolean | No | false | Set to `1` or `true` to fetch only unread notifications. |

#### Request Example

```http
GET /api/v1/admin/notifications?per_page=10&unread_only=true
Authorization: Bearer <sanctum_token>
```

#### Response Example

```json
{
    "success": true,
    "message": "Notifications retrieved successfully.",
    "data": [
        {
            "id": 150,
            "user_id": "admin-uuid-123",
            "type": "NewStoreRegistrationNotification",
            "title": "New Store Registration",
            "message": "Store 'MyStore' has just registered and requires approval.",
            "data": {
                "store_id": "12345-uuid-6789",
                "store_name": "MyStore",
                "owner_id": "user-uuid-1234"
            },
            "image_url": null,
            "badge_status": null,
            "channel": "system",
            "status": "pending",
            "reference_type": "App\\Domain\\Store\\Models\\Store",
            "reference_id": "12345-uuid-6789",
            "sent_at": null,
            "read_at": null,
            "created_at": "2026-06-05T20:17:18.000000Z",
            "updated_at": "2026-06-05T20:17:18.000000Z",
            "is_read": false,
            "is_sent": false,
            "time_ago": "2 minutes ago"
        }
    ],
    "meta": {
        "current_page": 1,
        "last_page": 1,
        "total": 1,
        "unread_count": 1
    }
}
```

> [!TIP]
> The `meta.unread_count` field returns the absolute total of unread notifications for the admin, making it extremely easy to render the red badge on your notification bell icon!

---

### 2.2 Mark Notifications as Read

**Endpoint:** `POST /api/v1/admin/notifications/mark-as-read`  
**Description:** Marks specific notifications (or all notifications) as read.

#### Request Body Payload

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `notification_ids` | array | No | Array of integer IDs to mark as read. If empty or omitted, **all** unread notifications will be marked as read. |

#### Request Example (Mark specific ones)

```json
{
    "notification_ids": [150, 151]
}
```

#### Request Example (Mark all as read)

```json
{
    "notification_ids": []
}
```

#### Response Example

```json
{
    "success": true,
    "message": "Notifications marked as read successfully.",
    "data": {
        "unread_count": 0
    }
}
```

---

## 3. Notification Event Dictionary

Here is a list of the events you can expect to receive. You can differentiate them by checking the `type` field in the database response or the websocket payload.

### `NewStoreRegistrationNotification`
- **Trigger**: When a new merchant successfully signs up and their store is placed in a "Pending" moderation state.
- **Data Attributes**: `store_id`, `store_name`, `owner_id`.
- **Action**: Should likely deep-link the admin to the Store Approval page.

### `NewProductRevisionNotification`
- **Trigger**: When a merchant submits a new product or updates an existing product that requires moderation.
- **Data Attributes**: `revision_id`, `product_id`.
- **Action**: Deep-link the admin to the Product Moderation view.

### `PendingManualPaymentNotification`
- **Trigger**: When a store opts to pay via Bank Transfer / Manual payment and generates an invoice/session that requires admin confirmation.
- **Data Attributes**: `session_id`, `store_id`, `amount`, `currency`.
- **Action**: Deep-link to the specific Payment Session for approval.

### `SubscriptionCancelledNotification`
- **Trigger**: When a store's subscription moves into `ARCHIVED` or `CANCELLED` state.
- **Data Attributes**: `subscription_id`, `store_id`.

### `StoreLimitReachedNotification`
- **Trigger**: When a store is attempting to create resources (products, employees, etc) that exceed their current plan's limits. Rate-limited to max 1 alert per 24 hours per limit.
- **Data Attributes**: `store_id`, `limit_type`, `current_value`, `max_value`.
- **Action**: Deep-link to the Store overview so an admin could potentially reach out and attempt to upsell them to a larger plan.
