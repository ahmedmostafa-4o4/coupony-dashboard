# Roles and Permissions API Integration Guide

This document provides the front-end integration details for the Role and Permission Management module. It includes all necessary endpoints, expected request payloads, responses, validations, and errors.

 [!IMPORTANT]
 All requests must include the `Authorization Bearer {token}` header. 
 To receive localized messages in Arabic or English, include the `Accept-Language` header (e.g., `ar` or `en`).

---

### 1. List All Roles
Retrieves all roles along with their assigned permissions.

- Method `GET`
- Endpoint `apiv1adminroles`
- Response (200 OK)
```json
{
  message Roles retrieved successfully.,
  data [
    {
      id 1,
      name admin,
      permissions [
        {id 1, name view dashboard},
        {id 2, name manage users}
      ]
    },
    {
      id 2,
      name seller,
      permissions [
        {id 3, name manage products}
      ]
    }
  ]
}
```

### 2. List All Available Permissions
Retrieves a list of all permissions that can be assigned to roles. Useful for populating the permission selection checkboxes when creating or editing a role.

- Method `GET`
- Endpoint `apiv1adminrolespermissions`
- Response (200 OK)
```json
{
  message Permissions retrieved successfully.,
  data [
    {id 1, name view dashboard},
    {id 2, name manage users},
    {id 3, name manage products},
    {id 4, name manage settings}
  ]
}
```

### 3. Get Permissions for a Specific Role
Retrieves the permissions assigned to a specific role.

- Method `GET`
- Endpoint `apiv1adminroles{role_name}permissions`
- Response (200 OK)
```json
{
  message Role permissions retrieved successfully.,
  data {
    role {
      id 1,
      name admin
    },
    permissions [
      {id 1, name view dashboard},
      {id 2, name manage users}
    ]
  }
}
```

### 4. Create Role
Creates a new custom role and assigns it permissions.

- Method `POST`
- Endpoint `apiv1adminroles`
- Payload
```json
{
  name moderator,
  permissions [view dashboard, manage users]
}
```
- Validations (422 Unprocessable Entity)
  - `name` Required, string, unique, max 255.
  - `permissions` Required, must be an array of valid existing permission names.
- Response (201 Created)
```json
{
  message Role created successfully.,
  data { 
    id 5, 
    name moderator, 
    permissions [
      {id 1, name view dashboard},
      {id 2, name manage users}
    ] 
  }
}
```

### 5. Update Role
Updates a role's name and synchronizes its permissions.

- Method `PUT`
- Endpoint `apiv1adminroles{role_id}`
- Payload
```json
{
  name super moderator,
  permissions [view dashboard]
}
```
- Validations (422 Unprocessable Entity)
  - `name` Required, string, unique (ignoring this role's ID).
  - `permissions` Required, array of valid permission names.
- Errors (422 Unprocessable Entity)
  - You cannot rename core system roles (`admin`, `seller`, `customer`, `seller_pending`). You can only change their permissions.
- Response (200 OK)
```json
{
  message Role updated successfully.,
  data { 
    id 5, 
    name super moderator, 
    permissions [
      {id 1, name view dashboard}
    ] 
  }
}
```

### 6. Delete Role
Deletes a custom role.

- Method `DELETE`
- Endpoint `apiv1adminroles{role_id}`
- Errors (422 Unprocessable Entity)
  - You cannot delete core system roles (`admin`, `seller`, `customer`, `seller_pending`).
  - Cannot delete role if there are users currently assigned to this role.
- Response (200 OK)
```json
{
  message Role deleted successfully.
}
```
