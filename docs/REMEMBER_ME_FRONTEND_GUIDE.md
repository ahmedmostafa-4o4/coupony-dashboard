# "Remember Me" Implementation Guide (Frontend)

This document explains how the frontend team should implement the "Remember Me" checkbox functionality when users log into the application (Customer App, Seller Portal, or Admin Dashboard).

## Authentication Architecture Overview

The Coupony backend uses a modern **Access + Refresh Token** architecture via Laravel Sanctum:

1. **Access Token (`access_token`)**: 
   - Short-lived (Expires in 60 minutes).
   - Used in the `Authorization: Bearer <token>` header for all authenticated requests.
2. **Refresh Token (`refresh_token`)**: 
   - Long-lived (Expires in 30 days).
   - Used to silently request a new Access Token when the current one expires, without requiring the user to type their password again.

---

## How to Implement "Remember Me"

Unlike older session-based architectures, the backend **does not** require a `remember_me: true` boolean in the login JSON payload. The backend *always* returns the 30-day refresh token. 

Instead, "Remember Me" is entirely controlled by **where the frontend chooses to store the tokens**.

### Scenario A: User CHECKS "Remember Me" ✅

If the user checks the "Remember Me" box, you want them to stay logged in even if they close their browser and come back a week later.

**Implementation:**
Store the `access_token` and `refresh_token` in persistent **LocalStorage** (or persistent cookies).

```javascript
// User checked "Remember Me"
localStorage.setItem('access_token', response.data.data.access_token);
localStorage.setItem('refresh_token', response.data.data.refresh_token);
```
*Behavior:* The tokens survive browser restarts. If the access token expires, the app will use the refresh token from `localStorage` to silently get a new one.

### Scenario B: User DOES NOT CHECK "Remember Me" ❌

If the user leaves the box unchecked, you want them to be logged out automatically as soon as they close the browser window.

**Implementation:**
Store the `access_token` and `refresh_token` in **SessionStorage** (or session cookies).

```javascript
// User did NOT check "Remember Me"
sessionStorage.setItem('access_token', response.data.data.access_token);
sessionStorage.setItem('refresh_token', response.data.data.refresh_token);
```
*Behavior:* `sessionStorage` is automatically wiped by the browser the moment the user closes the tab or window. When they reopen the site, the tokens are gone, and they will be forced to log in again.

---

## The Refresh Flow (Silently keeping the user logged in)

Regardless of whether tokens are in `localStorage` or `sessionStorage`, your Axios interceptor (or API client) should catch `401 Unauthorized` errors and automatically attempt to use the Refresh Token.

**Example Axios Interceptor:**
```javascript
import axios from 'axios';

// Function to get token regardless of where it was stored
const getRefreshToken = () => {
    return localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If token expired (401) and we haven't already retried
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getRefreshToken();
        
        if (refreshToken) {
            try {
                // Call the backend to exchange the refresh token for a new access token
                const res = await axios.post('/api/v1/auth/refresh', {
                    refresh_token: refreshToken
                });
                
                const newAccessToken = res.data.data.access_token;
                const newRefreshToken = res.data.data.refresh_token;
                
                // Save the new tokens back to wherever the old ones were stored
                if (localStorage.getItem('refresh_token')) {
                    localStorage.setItem('access_token', newAccessToken);
                    localStorage.setItem('refresh_token', newRefreshToken);
                } else {
                    sessionStorage.setItem('access_token', newAccessToken);
                    sessionStorage.setItem('refresh_token', newRefreshToken);
                }
                
                // Retry the original request with the new token
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
                
            } catch (refreshError) {
                // Refresh token is invalid/expired. Force logout and redirect to login.
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/login';
            }
        }
    }
    
    return Promise.reject(error);
  }
);
```
