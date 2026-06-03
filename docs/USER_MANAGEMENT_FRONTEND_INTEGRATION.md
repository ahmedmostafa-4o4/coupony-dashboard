# Admin User Management API - Frontend Integration Guide

This document provides frontend developers with the details needed to integrate the enhanced **User Management Security & Auditing** features into the admin panel. 

## 1. Viewing User Auditing Details

When you fetch a specific user's details, the API now returns enhanced security data, including their last known login time, last IP address, and an array of their currently active sessions/devices.

- **URL Path:** `/api/v1/admin/users/{userId}`
- **Method:** `GET`
- **Authentication Required:** Yes (Admin Bearer Token)

### Example Response Snippet

The `data` object returned by the user details endpoint will now contain:

```json
{
  "message": "User details retrieved successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "customer@example.com",
    "status": "active",
    "last_login_at": "2026-06-03T10:00:00.000000Z",
    "last_ip": "192.168.1.100",
    "sessions": [
      {
        "id": "abc-123",
        "ip_address": "192.168.1.100",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
        "device_type": "desktop",
        "expires_at": "2026-06-10T10:00:00.000000Z",
        "last_activity": 1685790000
      },
      {
        "id": "xyz-987",
        "ip_address": "10.0.0.5",
        "user_agent": "CouponyApp/1.0 (iPhone; iOS 16.0; Scale/3.00)",
        "device_type": "mobile",
        "expires_at": "2026-06-15T12:00:00.000000Z",
        "last_activity": 1685785000
      }
    ]
  }
}
```

### UI Implementation Suggestion
Create a **"Device History & Active Sessions"** table on the User Profile view in the admin panel. Map the `sessions` array to show the device type (desktop/mobile), browser/app (parsed from user_agent), and the IP address.

---

## 2. Revoking Active Sessions (Force Logout)

Admins can enforce security by manually revoking a user's active session tokens if suspicious activity is detected. You can either revoke **all** of a user's sessions or target a **specific** device/session.

### Revoke All Sessions

- **URL Path:** `/api/v1/admin/users/{userId}/sessions`
- **Method:** `DELETE`
- **Authentication Required:** Yes (Admin Bearer Token)

**Response (200 OK):**
```json
{
  "message": "All user sessions have been revoked successfully"
}
```

### Revoke a Specific Session

- **URL Path:** `/api/v1/admin/users/{userId}/sessions/{sessionId}`
- **Method:** `DELETE`
- **Authentication Required:** Yes (Admin Bearer Token)
- **Path Parameter:** `sessionId` corresponds to the `id` property from the `sessions` array in the user details response.

**Response (200 OK):**
```json
{
  "message": "User session revoked successfully"
}
```

---

## Example Axios Integration (React/Vue)

Here is a practical example of how to implement the session revocation button on the frontend:

```javascript
import axios from 'axios';

// Call this when the admin clicks "Revoke All Sessions"
const revokeAllUserSessions = async (userId) => {
    try {
        const response = await axios.delete(`/api/v1/admin/users/${userId}/sessions`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
            }
        });
        
        alert("Success: " + response.data.message);
        // TODO: Refresh the user details state to show an empty sessions array
        
    } catch (error) {
        console.error("Failed to revoke all sessions:", error);
        alert("Error revoking sessions.");
    }
};

// Call this when the admin clicks "Revoke" next to a specific session row
const revokeSpecificSession = async (userId, sessionId) => {
    try {
        const response = await axios.delete(`/api/v1/admin/users/${userId}/sessions/${sessionId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
            }
        });
        
        alert("Success: " + response.data.message);
        // TODO: Filter out the revoked session from your local React/Vue state
        
    } catch (error) {
        console.error("Failed to revoke session:", error);
        alert("Error revoking session.");
    }
};
```
