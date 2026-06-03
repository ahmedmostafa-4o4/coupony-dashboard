# Admin Dashboard API - Frontend Integration Guide

This document provides frontend developers with everything they need to integrate the newly added **Admin Overview & Analytics Dashboard** endpoint into the administrative panel.

## Endpoint Details

- **URL Path:** `/api/v1/admin/dashboard/overview`
- **Method:** `GET`
- **Authentication Required:** Yes (Bearer Token via Laravel Sanctum)
- **Role Required:** `admin`
- **Content-Type Expected:** `application/json`
- **Accept Header:** `application/json`

---

## Authentication

To access this endpoint, the user must be authenticated as an `admin`. Ensure you are passing the Bearer token in your HTTP headers:

```http
GET /api/v1/admin/dashboard/overview HTTP/1.1
Host: your-backend-url.com
Accept: application/json
Authorization: Bearer {your_admin_access_token}
```

---

## Response Structure

The endpoint aggregates data into five logical groupings to make UI component mapping easier:
1. `growth`: User and store acquisition metrics.
2. `financial`: Revenue and platform quality metrics.
3. `points_economy`: The loyalty system liability and usage.
4. `operational`: Actionable pending tasks for admins.
5. `charts`: A complete set of time-series arrays and categorical data ready for charting libraries.

### Successful Response (200 OK)

```json
{
  "message": "Overview analytics retrieved successfully",
  "data": {
    "growth": {
      "total_users": 1542,
      "total_stores": 89,
      "new_users_this_month": 120,
      "new_stores_this_month": 5
    },
    "financial": {
      "total_sales_volume": 145000.50,
      "premium_stores": 25,
      "average_store_rating": 4.6
    },
    "points_economy": {
      "total_points_in_circulation": 125000,
      "lifetime_points_earned": 200000,
      "lifetime_points_spent": 75000,
      "points_redemption_rate": 37.5
    },
    "operational": {
      "pending_store_approvals": 3,
      "pending_verifications": 10,
      "unresolved_customer_tickets": 2,
      "unresolved_seller_tickets": 1
    },
    "charts": {
      "user_growth": [
        { "date": "2026-05-15", "count": 12 },
        { "date": "2026-05-16", "count": 25 }
      ],
      "store_growth": [
        { "date": "2026-05-15", "count": 1 },
        { "date": "2026-05-16", "count": 3 }
      ],
      "claims_volume": [
        { "date": "2026-05-15", "count": 150 },
        { "date": "2026-05-16", "count": 210 }
      ],
      "subscription_distribution": [
        { "tier": "free", "count": 80 },
        { "tier": "premium", "count": 25 }
      ],
      "top_stores": [
        { "id": "uuid", "name": "Mega Mart", "total_sales": 55000, "rating_avg": "4.8" },
        { "id": "uuid", "name": "Tech Hub", "total_sales": 32000, "rating_avg": "4.5" }
      ],
      "points_flow": {
        "earned": [
          { "date": "2026-05-15", "count": "5000" }
        ],
        "spent": [
          { "date": "2026-05-15", "count": "1200" }
        ]
      }
    }
  }
}
```

### Error Responses

**401 Unauthorized:**
Triggered if the Bearer token is missing or invalid.
```json
{
    "message": "Unauthenticated."
}
```

**403 Forbidden:**
Triggered if the authenticated user does not have the `admin` role.
```json
{
    "message": "This action is unauthorized."
}
```

**500 Internal Server Error:**
Triggered if the server fails to calculate the statistics (e.g., database connection issues).
```json
{
    "message": "Failed to retrieve dashboard overview analytics."
}
```

---

## UI/UX Implementation Suggestions

To provide the best experience for the Admin user, consider the following layout suggestions:

### 1. The "Action Required" Banner (High Priority)
Use the `operational` object to render notification badges or a priority alert box at the top of the dashboard.
* Example: If `pending_store_approvals > 0` or `pending_verifications > 0`, highlight a **Review Pending Stores** button in red or orange.

### 2. High-Level KPI Cards
Create a row of 4 distinct summary cards at the top using the `growth` and `financial` data:
* **Total Sales Volume** (Format as currency)
* **Total Active Stores** (Show `premium_stores` as a subtitle underneath)
* **Total Users**
* **Average Store Rating** (Format with a star icon ⭐)

### 3. The Loyalty/Points Economy Widget
Create a visual gauge or progress bar using the `points_economy` data:
* Show `points_redemption_rate` as a percentage (e.g. 37.5%).
* Display the `total_points_in_circulation` as the platform's current outstanding point liability.

### 4. Rendering Charts (Time-Series & Categorical)
The `charts` object provides precisely formatted data for UI charting libraries (e.g. Chart.js, Recharts, ApexCharts):
* **Line Charts / Area Charts:** Map the `user_growth`, `store_growth`, and `claims_volume` arrays. The `date` property serves as the X-axis, and `count` is the Y-axis value.
* **Bar Charts:** The `points_flow` object provides `earned` and `spent` arrays. You can overlay them to create a grouped bar chart of the daily point economy.
* **Donut/Pie Charts:** Use `subscription_distribution` (mapping `tier` vs `count`) to visualize your MRR distribution.
* **Tables/Leaderboards:** Map `top_stores` into a small leaderboard showing your VIP sellers and their `total_sales`.

### 5. Fetching Strategy & Performance
This endpoint performs several aggregate queries across large tables. 
* **Do not** poll this endpoint every second. 
* **Do** fetch on initial load, and provide a manual "Refresh" button for the admin, or poll every 3-5 minutes silently in the background.

---

## Example Axios Integration (React/Vue)

```javascript
import axios from 'axios';

const fetchDashboardOverview = async () => {
    try {
        const response = await axios.get('/api/v1/admin/dashboard/overview', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
            }
        });
        
        const dashboardData = response.data.data;
        console.log("Growth Metrics:", dashboardData.growth);
        console.log("Action Items:", dashboardData.operational);
        console.log("Charts Data:", dashboardData.charts);
        
        return dashboardData;
        
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error("Access denied. Admin role required.");
        } else {
            console.error("Error fetching dashboard data:", error);
        }
        throw error;
    }
};
```
