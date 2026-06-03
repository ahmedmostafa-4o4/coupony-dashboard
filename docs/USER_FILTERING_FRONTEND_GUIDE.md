# User Management API - Filtering & Searching Guide (Frontend)

This document provides frontend developers with the necessary details to implement search, filtering, and pagination on the Admin User Management tables.

## 1. Overview

The endpoint used to list all users natively supports a robust set of query parameters to filter, search, and paginate the data without needing any extra setup.

- **URL Path:** `/api/v1/admin/users`
- **Method:** `GET`
- **Authentication Required:** Yes (Admin Bearer Token)

## 2. Available Query Parameters

You can pass the following parameters in the URL query string (or via Axios `params`) to filter the results:

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | String | Performs a partial text search (`LIKE %search%`) across the user's `email`, `phone_number`, `first_name`, and `last_name`. | `?search=ahmed` |
| `role` | String | Filters users by their exact role. Valid options: `admin`, `seller`, `customer`, `seller_pending`. | `?role=seller` |
| `status` | String | Filters users by their account status. Valid options: `active`, `suspended`. | `?status=suspended` |
| `from_date` | Date | Filters out users who registered *before* this date (Format: `YYYY-MM-DD`). | `?from_date=2026-05-01` |
| `to_date` | Date | Filters out users who registered *after* this date (Format: `YYYY-MM-DD`). | `?to_date=2026-05-31` |
| `per_page` | Integer | Controls the number of results returned per page (Min: 1, Max: 100, Default: 15). | `?per_page=50` |
| `page` | Integer | The standard Laravel pagination parameter to fetch a specific page of results. | `?page=2` |

---

## 3. Example Axios Integration

When building a data table with search inputs and dropdown filters, you can pass these parameters dynamically using Axios's `params` object:

```javascript
import axios from 'axios';

/**
 * Fetches users based on the active filters in your UI state.
 * 
 * @param {Object} filters - e.g., { role: 'seller', search: 'ahmed', page: 1 }
 */
const fetchFilteredUsers = async (filters) => {
    try {
        const response = await axios.get('/api/v1/admin/users', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
            },
            // Axios will automatically convert this object into the query string:
            // e.g. ?role=seller&status=active&search=ahmed&page=1
            params: {
                role: filters.role || null,
                status: filters.status || null,
                search: filters.search || null,
                from_date: filters.fromDate || null,
                to_date: filters.toDate || null,
                per_page: filters.perPage || 15,
                page: filters.page || 1
            }
        });
        
        // The API returns the 'data' array containing the users
        // and a 'meta' object containing the pagination details
        const { data, meta } = response.data;
        
        console.log("Users:", data);
        console.log("Pagination Info:", meta);
        
        return { users: data, pagination: meta };
        
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
    }
};
```

## 4. UI Implementation Suggestions

1. **Global Search Bar:** Add a text input above the table bound to the `search` parameter. Wait for the user to stop typing (debounce 300-500ms) before firing the API request.
2. **Status & Role Dropdowns:** Add simple `<select>` dropdowns above the table bound to the `role` and `status` parameters.
3. **Date Range Picker:** Add a date range picker to filter new signups (bound to `from_date` and `to_date`).
4. **Pagination Controls:** Use the `meta.current_page` and `meta.last_page` returned in the response to render "Next/Previous Page" buttons, and pass the active page number to the `page` parameter.
