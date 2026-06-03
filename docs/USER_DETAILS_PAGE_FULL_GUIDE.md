# User Details Page - Complete Integration Guide

This document is the ultimate reference for the frontend team building the **User Details Page** on the Admin Dashboard. It contains every endpoint needed to fetch the user's information and perform actions on their account.

All endpoints require the user to be authenticated with an **Admin Bearer Token** (`Authorization: Bearer <token>`).

---

## 1. Fetch User Data (The "View" Page)

Retrieves all the data you need to render the User Details page, including their profile, assigned roles, current point balance, active stores (if they are a seller), and all of their currently active login sessions.

- **Method:** `GET`
- **Path:** `/api/v1/admin/users/{user_id}`

### Success Response (200 OK)
```json
{
    "message": "User details retrieved successfully.",
    "data": {
        "id": "8b350bf4-e888-4252-a335-419b800d7006",
        "email": "jane@example.com",
        "phone_number": "+123456789",
        "status": "active",
        "role": "customer",
        "profile": {
            "first_name": "Jane",
            "last_name": "Doe",
            "avatar": "http://coupony-backend.test/users/avatars/default.svg",
            "gender": "female"
        },
        "points_balance": 500,
        "stores": [],
        "sessions": [
            {
                "id": "1",
                "device_type": "desktop",
                "user_agent": "Mozilla/5.0...",
                "ip_address": "127.0.0.1",
                "last_activity": 1718000000
            }
        ],
        "last_login_at": "2026-06-03T12:00:00.000000Z",
        "created_at": "2026-05-01T10:00:00.000000Z"
    }
}
```

---

## 2. Edit User Details & Role

Updates a user's core profile, contact info, language preferences, and/or their assigned role.

- **Method:** `PATCH` (or `PUT`)
- **Path:** `/api/v1/admin/users/{user_id}`

### Request Payload
You can send any combination of these fields. They are all **optional**.
```json
{
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane.smith@example.com",
    "phone_number": "+1987654321",
    "role": "seller",
    "language": "en",
    "timezone": "Africa/Cairo",
    "gender": "female",
    "date_of_birth": "1995-05-15",
    "bio": "Updated bio text."
}
```

### Validations & Errors (422 Unprocessable Entity)
- `email`: Must be a valid email and **unique** in the users table.
- `phone_number`: Must be a string and **unique**.
- `role`: Must exist in the `roles` table.
- `gender`: Must be either `male` or `female`.

---

## 3. Suspend or Activate Account

Use this to temporarily block or unblock a user without deleting their account.

- **Method:** `PATCH`
- **Path:** `/api/v1/admin/users/{user_id}/status`

### Request Payload
```json
{
    "status": "suspended" 
}
```

### Validations & Errors (422 Unprocessable Entity)
- `status` must be either `"active"`, `"suspended"`, or `"deleted"`.

---

## 4. Force Change Password

Allows an Admin to forcefully update/reset a user's password. 
> [!WARNING]
> Security Measure: Calling this endpoint will automatically destroy all of the user's active sessions and tokens, kicking them out of all devices immediately so they are forced to log in with the new password.

- **Method:** `PATCH`
- **Path:** `/api/v1/admin/users/{user_id}/password`

### Request Payload
```json
{
    "password": "NewSecurePassword123!",
    "password_confirmation": "NewSecurePassword123!"
}
```

### Validations & Errors (422 Unprocessable Entity)
- `password`: Required, string, minimum **8 characters**, and must match `password_confirmation`.

---

## 5. Revoke a Specific Login Session

Logs the user out of one specific device/browser. Usually attached to a "Log Out" button next to each item in the "Active Sessions" list.

- **Method:** `DELETE`
- **Path:** `/api/v1/admin/users/{user_id}/sessions/{session_id}`

*No payload required.*

### Success Response (200 OK)
```json
{
    "message": "Session revoked successfully."
}
```

---

## 6. Revoke All Sessions (Emergency Logout)

Immediately logs the user out of **all** devices and browsers. Useful if the account is compromised.

- **Method:** `DELETE`
- **Path:** `/api/v1/admin/users/{user_id}/sessions`

*No payload required.*

### Success Response (200 OK)
```json
{
    "message": "All sessions have been revoked."
}
```

---

## 7. Delete User Account

Soft deletes the user and irreversibly destroys their active sessions and personal access tokens. If the user is a `seller`, it will also cascade and delete their attached stores, products, and verified documents to clean up the platform.

- **Method:** `DELETE`
- **Path:** `/api/v1/admin/users/{user_id}`

*No payload required.*

### Errors (400 Bad Request)
- You cannot delete your own account. If `user_id` matches the authenticated Admin, the system will block the request.

### Success Response (200 OK)
```json
{
    "message": "User deleted successfully."
}
```
