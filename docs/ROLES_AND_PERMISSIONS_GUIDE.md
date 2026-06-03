# Roles & Permissions API Guide (Frontend Integration)

This document provides the frontend team with the newly created endpoints to fetch roles and permissions from the backend. This is particularly useful for populating dropdowns and multi-select components when creating or editing a user.

All endpoints require the user to be authenticated.

---

## 1. Get All Roles

Fetches a list of all roles in the system, along with the permissions currently assigned to each role.

- **Method:** `GET`
- **Path:** `/api/v1/admin/roles`

**Response Example:**
```json
{
    "message": "Roles retrieved successfully.",
    "data": [
        {
            "id": 1,
            "name": "admin",
            "guard_name": "sanctum",
            "permissions": [
                { "id": 1, "name": "manage users" },
                { "id": 2, "name": "manage products" }
            ]
        },
        {
            "id": 2,
            "name": "seller",
            "guard_name": "sanctum",
            "permissions": []
        }
    ]
}
```

---

## 2. Get All Permissions

Fetches a flat array of every single individual permission registered in the system.

- **Method:** `GET`
- **Path:** `/api/v1/admin/roles/permissions`

**Response Example:**
```json
{
    "message": "Permissions retrieved successfully.",
    "data": [
        { "id": 1, "name": "manage users", "guard_name": "sanctum" },
        { "id": 2, "name": "manage products", "guard_name": "sanctum" },
        { "id": 3, "name": "view dashboard", "guard_name": "sanctum" }
    ]
}
```

---

## 3. Get Permissions for a Specific Role

Returns only the permissions strictly assigned to a given role name.

- **Method:** `GET`
- **Path:** `/api/v1/admin/roles/{role}/permissions`
- **Example Path:** `/api/v1/admin/roles/admin/permissions`

**Response Example:**
```json
{
    "message": "Role permissions retrieved successfully.",
    "data": {
        "role": {
            "id": 1,
            "name": "admin"
        },
        "permissions": [
            { "id": 1, "name": "manage users", "guard_name": "sanctum" },
            { "id": 2, "name": "manage products", "guard_name": "sanctum" }
        ]
    }
}
```
